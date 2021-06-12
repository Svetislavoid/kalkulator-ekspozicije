    init: function() {
      this.cacheDom();
      this.bindEvent('click', this.submit, this.execute.bind(this));
      this.bindEvent('click', this.customTelescope, this.addCustomTelescope.bind(this));
      this.bindEvent('click', this.customReducer, this.addCustomReducer.bind(this));
      this.bindEvent('click', this.customCCD, this.addCustomCCD.bind(this));
      this.bindEvent('click', this.customBinning, this.addCustomBinning.bind(this));
      this.bindEvent('click', this.customBand, this.addCustomBand.bind(this));
      this.bindEvent('click', this.modalSubmit, this.submitCustomParams.bind(this));
      this.bindEvent('click', this.showGraphCB, this.showGraph.bind(this));
      this.bindEvent('click', this.helpButton, this.showHelp.bind(this));
    },

    bindEvent: function(event, target, callback) {
      target.addEventListener(event, callback);
    },

    shadeScreen: function() {
      this.screenShade.classList.toggle("on");
    },

    addCustomTelescope: function() {
      this.shadeScreen();
      this.telescopeParams.classList.add("on");
      this.modal.classList.add("on");
    },

    addCustomReducer: function() {
      this.shadeScreen();
      this.reducerParams.classList.add("on");
      this.modal.classList.add("on");
    },

    addCustomCCD: function() {
      this.shadeScreen();
      this.ccdParams.classList.add("on");
      this.modal.classList.add("on");
    },

    addCustomBinning: function() {
      this.shadeScreen();
      this.binningParams.classList.add("on");
      this.modal.classList.add("on");
    },

    addCustomBand: function() {
      this.shadeScreen();
      this.filterParams.classList.add("on");
      this.modal.classList.add("on");
    },

    submitCustomParams: function() {
      this.shadeScreen();
      this.modal.classList.remove("on");
      this.telescopeParams.classList.remove("on");
      this.reducerParams.classList.remove("on");
      this.ccdParams.classList.remove("on");
      this.binningParams.classList.remove("on");
      this.filterParams.classList.remove("on");
      this.telescope.custom.diameter = this.telescopeDiameter.value;
      this.telescope.custom.focalLength = this.telescopeFocalLength.value;
      this.telescope.custom.effectiveAreaCoef = this.telescopeEffectiveAreaCoef.value ?
                                                this.telescopeEffectiveAreaCoef.value / 100 :
                                                1;
      this.eqParams.reducer = this.reducerValue.value ?
                              Number(this.reducerValue.value) :
                              1;
      this.camera.custom.ro = this.ccdRO.value;
      this.camera.custom.dc = this.ccdDC.value;
      this.camera.custom.pxSize = this.ccdPixelSize.value / 1000000;
      this.camera.custom.qe[0] = this.ccdQE.value / 100;
      this.eqParams.binning = this.binningValue.value ?
                              Number(this.binningValue.value) :
                              1;
      this.band.custom.wavelength = this.bandWavelength.value;
      this.band.custom.bandwidth = this.bandBandwidth.value;
      this.band.custom.fluxPh = this.bandFlux.value;
      this.band.custom.extinctCoeff = this.extinctionCoeff.value;
    },

    showGraph: function() {
      this.showGraphCB.checked && this.graph.drawn ?
      this.canvas.classList.remove("collapsed") :
      this.canvas.classList.add("collapsed");
    },

    showHelp: function() {
      this.help.classList.toggle("collapsed");
    },

    getQE: function(lambda, cameraQE) {
      var diff = 999999999999;
      var pos = 0;

      Object.keys(cameraQE).map(function(key, index) {
        if (Math.abs(lambda / 10 - key) < diff) {
          diff = Math.abs(lambda / 10 - key);
          pos = key;
        }
      });

      return cameraQE[pos];
    },

    // Error function
    erf: function(x) {
      // erf(x) = 2/sqrt(pi) * integrate(from=0, to=x, e^-(t^2) ) dt
      // with using Taylor expansion,
      //        = 2/sqrt(pi) * sigma(n=0 to +inf, ((-1)^n * x^(2n+1))/(n! * (2n+1)))
      // calculating n=0 to 50
      var m = 1.00;
      var s = 1.00;
      var sum = x * 1.0;

      for(var i = 1; i < 50; i++){
        m *= i;
        s *= -1;
        sum += (s * Math.pow(x, 2.0 * i + 1.0)) / (m * (2.0 * i + 1.0));
      }
      return 2 * sum / Math.sqrt(Math.PI);
    },

    // Figure out what fraction of a star's light falls within the aperture.
    // We assume that the starlight has a circular gaussian distribution with
    // FWHM given by the first argument (with units of arcsec). We calculate
    // the fraction of that light which falls within an aperture of radius
    // given by second argument (with units of arcsec).
    fraction_inside: function(fwhm, radius) {
      var sigma;
      var z;
      var x1, x2;
      var large;
      var ratio;

      large = 1000.0;

      // calculate how far out the "radius" is in units of "sigmas"
      sigma = fwhm / 2.35;
      z = radius / (sigma * 1.414);

      // now, we assume that a radius of "large" is effectively infinite
      x1 = this.erf(z);
      ratio = (x1 * x1);

      return(ratio);
    },

    // Figure out what fraction of a star's light falls within the aperture.
    // We assume that the starlight has a circular gaussian distribution with
    // FWHM given by the first argument (with units of arcsec). This function
    // goes to the trouble of calculating how much of the light falls within
    // fractional pixels defined by the given radius of a synthetic aperture.
    // It is slow but more accurate than the "fraction_inside" function.
    fraction_inside_slow: function(fwhm, radius, pixsize) {
      var i, j, k, l;
      var max_pix_rad;
      var sigma2;
      var x, y;
      var fx, fy;
      var psf_center_x, psf_center_y;
      var ratio;
      var bit;
      var this_bit;
      var pix_sum;
      var all_sum;
      var rad_sum;
      var rad2, radius2;
      var inten;
      var piece;

      // how many pieces do we sub-divide pixels into?
      piece = 20;

      // rescale FWHM and aperture radius into pixels (instead of arcsec)
      fwhm /= pixsize;
      radius /= pixsize;

      max_pix_rad = 30;

      // check to make sure user isn't exceeding our built-in limits
      if (radius >= max_pix_rad) {
        console.log('Warning: radius exceeds limit of ' + max_pix_rad);
      }

      // these values control the placement of the star on the pixel grid:
      //    (0,0) to make the star centered on a junction of four pixels
      //    (0.5, 0.5) to make star centered on one pixel
      psf_center_x = 0.5;
      psf_center_y = 0.5;

      sigma2 = fwhm / 2.35;
      sigma2 = sigma2 * sigma2;
      radius2 = radius * radius;
      bit = 1.0 / piece;

      rad_sum = 0;
      all_sum = 0;

      for (i = 0 - max_pix_rad; i < max_pix_rad; i++) {
        for (j = 0 - max_pix_rad; j < max_pix_rad; j++) {

          // now, how much light falls into pixel (i, j)?
          pix_sum = 0;
          for (k = 0; k < piece; k++) {

            x = (i - psf_center_x) + (k + 0.5) * bit;
            fx = Math.exp(-(x * x) / (2.0 * sigma2));

            for (l = 0; l < piece; l++) {

              y = (j - psf_center_y) + (l + 0.5) * bit;
              fy = Math.exp(-(y * y) / (2.0 * sigma2));

              inten = fx * fy;
              this_bit = inten * bit * bit;
              pix_sum += this_bit;

              rad2 = x * x + y * y;
              if (rad2 <= radius2) {
                rad_sum += this_bit;
              }
            }
          }
          all_sum += pix_sum;
        }
      }

      ratio = rad_sum / all_sum;

      return(ratio);
    },
