window.addEventListener('load', function() {
  var kalkulator = {
    options: {
      usePeakQE: false
    },
    graph: {
      xOffset: 25,
      yOffset: 20,
      upLimitX: 0,
      upLimitY: 0,
      broj_podeokaX: 0,
      broj_podeokaY: 0,
      dataPointsNo: 200,
      podeokX: 45,
      podeokY: 45,
      drawn: false
    },
    eqParams: {
      sig: 0,
      sky: 0,
      dc: 0,
      ro: 0,
      qe: 0,
      wavelength: 0,
      bandwidth: 0,
      fluxPh: 0,
      extinctCoeff: 0,
      airmass: 0,
      totalTransparency: 0,
      pxSize: 0,
      reducer: 1,
      binning: 1,
      focalLength: 0,
      area: 0,
      mag: 0,
      skyMag: 0,
      snr: 0,
      n: 0,
      res: 0,
      exposure: 0
    },
    telescope: {
      cassegrain: {
        diameter: 0.6,
        focalLength: 6,
        effectiveAreaCoef: 1
      },
      nasmyth: {
        diameter: 1.4,
        focalLength: 11.2,
        effectiveAreaCoef: 1
      },
      custom: {
        diameter: 0,
        focalLength: 0,
        effectiveAreaCoef: 1
      }
    },
    camera: {
      apogeeU42: {
        dc: 1,
        ro: 10,
        pxSize: 13.5e-6,
        qe: {
          '0': 0.93, // peak QE
          '300': 0.08,
          '320': 0.12,
          '340': 0.15,
          '360': 0.26,
          '380': 0.38,
          '400': 0.53,
          '420': 0.65,
          '440': 0.74,
          '460': 0.82,
          '480': 0.88,
          '500': 0.9,
          '520': 0.91,
          '540': 0.92,
          '560': 0.93,
          '580': 0.93,
          '600': 0.92,
          '620': 0.92,
          '640': 0.91,
          '660': 0.9,
          '680': 0.89,
          '700': 0.87,
          '720': 0.85,
          '740': 0.82,
          '760': 0.78,
          '780': 0.75,
          '800': 0.7,
          '820': 0.67,
          '840': 0.6,
          '860': 0.54,
          '880': 0.48,
          '900': 0.41,
          '920': 0.37,
          '940': 0.31,
          '960': 0.26,
          '980': 0.2,
          '1000': 0.16
        }
      },
      apogeeE47: {
        dc: 0.1,
        ro: 10,
        pxSize: 13e-6,
        qe: {
          '0': 0.96, // peak QE
          '300': 0.1,
          '320': 0.14,
          '340': 0.18,
          '360': 0.24,
          '380': 0.4,
          '400': 0.57,
          '420': 0.67,
          '440': 0.74,
          '460': 0.82,
          '480': 0.88,
          '500': 0.93,
          '520': 0.95,
          '540': 0.96,
          '560': 0.96,
          '580': 0.96,
          '600': 0.96,
          '620': 0.95,
          '640': 0.94,
          '660': 0.93,
          '680': 0.92,
          '700': 0.9,
          '720': 0.88,
          '740': 0.85,
          '760': 0.82,
          '780': 0.77,
          '800': 0.73,
          '820': 0.67,
          '840': 0.6,
          '860': 0.54,
          '880': 0.47,
          '900': 0.38,
          '920': 0.32,
          '940': 0.25,
          '960': 0.2,
          '980': 0.14,
          '1000': 0.1
        }
      },
      iKonL: {
        dc: null,
        ro: null,
        pxSize: 13.5e-6,
        qe: {
          '0': 0.95, // peak QE
          '200': 0.05,
          '220': 0.05,
          '240': 0.05,
          '260': 0.07,
          '280': 0.12,
          '300': 0.17,
          '320': 0.27,
          '340': 0.4,
          '360': 0.55,
          '380': 0.73,
          '400': 0.88,
          '420': 0.93,
          '440': 0.92,
          '460': 0.91,
          '480': 0.89,
          '500': 0.88,
          '520': 0.88,
          '540': 0.88,
          '560': 0.89,
          '580': 0.89,
          '600': 0.9,
          '620': 0.91,
          '640': 0.93,
          '660': 0.93,
          '680': 0.93,
          '700': 0.94,
          '720': 0.94,
          '740': 0.94,
          '760': 0.94,
          '780': 0.94,
          '800': 0.93,
          '820': 0.93,
          '840': 0.91,
          '860': 0.87,
          '880': 0.83,
          '900': 0.79,
          '920': 0.74,
          '940': 0.67,
          '960': 0.55,
          '980': 0.45,
          '1000': 0.33,
          '1020': 0.25,
          '1040': 0.17,
          '1060': 0.08,
          '1080': 0.03,
          '1100': 0
        }
      },
      iXon897: {
        dc: null,
        ro: null,
        pxSize: 16e-6,
        qe: {
          '0': 0.925, // peak QE
          '300': 0.12,
          '320': 0.14,
          '340': 0.2,
          '360': 0.25,
          '380': 0.46,
          '400': 0.57,
          '420': 0.67,
          '440': 0.77,
          '460': 0.84,
          '480': 0.9,
          '500': 0.94,
          '520': 0.96,
          '540': 0.97,
          '560': 0.97,
          '580': 0.97,
          '600': 0.97,
          '620': 0.96,
          '640': 0.95,
          '660': 0.94,
          '680': 0.93,
          '700': 0.92,
          '720': 0.89,
          '740': 0.86,
          '760': 0.84,
          '780': 0.82,
          '800': 0.77,
          '820': 0.73,
          '840': 0.68,
          '860': 0.6,
          '880': 0.55,
          '900': 0.48,
          '920': 0.4,
          '940': 0.33,
          '960': 0.27,
          '980': 0.19,
          '1000': 0.14
        }
      },
      sbigst10xme: {
        dc: 0.5,
        ro: 8.8,
        pxSize: 6.8e-6,
        qe: {
          '0': 0.85, // peak QE
          '300': 0.05,
          '320': 0.2,
          '340': 0.33,
          '360': 0.4,
          '380': 0.55,
          '400': 0.6,
          '420': 0.59,
          '440': 0.6,
          '460': 0.64,
          '480': 0.67,
          '500': 0.67,
          '520': 0.73,
          '540': 0.81,
          '560': 0.85,
          '580': 0.87,
          '600': 0.85,
          '620': 0.86,
          '640': 0.86,
          '660': 0.85,
          '680': 0.81,
          '700': 0.78,
          '720': 0.75,
          '740': 0.68,
          '760': 0.63,
          '780': 0.57,
          '800': 0.54,
          '820': 0.52,
          '840': 0.46,
          '860': 0.38,
          '880': 0.33,
          '900': 0.3,
          '920': 0.25,
          '940': 0.19,
          '960': 0.15,
          '980': 0.08,
          '1000': 0.07
        }
      },
      custom: {
        dc: 0,
        ro: 0,
        pxSize: 0,
        qe: {
          '0': 0 // peak QE
        }
      }
    },
    band: {
      'B': {
        wavelength: 4450,
        bandwidth: 940,
        fluxJY: 4260,
        fluxPh: 1444.762247191,
        extinctCoeff: 0.4   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'V': {
        wavelength: 5510,
        bandwidth: 880,
        fluxJY: 3640,
        fluxPh: 997.0032667877,
        extinctCoeff: 0.2   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'R': {
        wavelength: 6580,
        bandwidth: 1380,
        fluxJY: 3080,
        fluxPh: 706.4340425532,
        extinctCoeff: 0.1   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'I': {
        wavelength: 8060,
        bandwidth: 1490,
        fluxJY: 2550,
        fluxPh: 477.476426799,
        extinctCoeff: 0.08   // mag/airmass - TREBA PROVERITI VREDNOST
      },
      'L': {
        wavelength: 35000,
        bandwidth: 4720,
        fluxJY: 280,
        fluxPh: 12.07364926,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      'Ha': {
        wavelength: 6563,
        bandwidth: 50,
        fluxJY: 3631,
        fluxPh: 834.9729635,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      'Red-continuum': {
        wavelength: 6452,
        bandwidth: 50,
        fluxJY: 3631,
        fluxPh: 849.3378115,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      '[SII]': {
        wavelength: 6718,
        bandwidth: 35,
        fluxJY: 3631,
        fluxPh: 815.708181,
        extinctCoeff: 0   // NEMAM PODATAK
      },
      'custom': {
        wavelength: 0,
        bandwidth: 0,
        fluxJY: 0,
        fluxPh: 0,
        extinctCoeff: 0
      }
    },


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

      return ratio;
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

      return ratio;
    },


    cacheDom: function() {
      this.object = document.querySelector('.object');
      this.teleskop = document.querySelector('.teleskop');
      this.reducer = document.querySelector('.reducer');
      this.ccd = document.querySelector('.ccd');
      this.binning = document.querySelector('.binning');
      this.filter = document.querySelector('.filter');
      this.transparentnost_elemenata = document.querySelector('.transparentnost');
      this.airmass = document.querySelector('.airmass');
      this.sjaj_neba = document.querySelector('.sjaj-neba');
      this.seeing = document.querySelector('.seeing');
      this.aperture = document.querySelector('.aperture');
      this.magnituda = document.querySelector('.magnituda');
      this.signal_to_noise = document.querySelector('.signal-to-noise');
      this.showGraphCB = document.querySelector('.showGraph input');

      this.r_object = document.querySelector('.r-object');
      this.r_teleskop = document.querySelector('.r-teleskop');
      this.r_reducer = document.querySelector('.r-reducer');
      this.r_ccd = document.querySelector('.r-ccd');
      this.r_binning = document.querySelector('.r-binning');
      this.r_filter = document.querySelector('.r-filter');
      this.r_transparentnost_elemenata = document.querySelector('.r-transparentnost');
      this.r_airmass = document.querySelector('.r-airmass');
      this.r_sjaj_neba = document.querySelector('.r-sjaj-neba');
      this.r_seeing = document.querySelector('.r-seeing');
      this.r_aperture = document.querySelector('.r-aperture');
      this.r_magnituda = document.querySelector('.r-magnituda');
      this.r_signal_to_noise = document.querySelector('.r-signal-to-noise');

      this.ekspozicija = document.querySelector('.ekspozicija span');
      this.canvas = document.querySelector('#canvas');

      // Podaci iz modala (custom polja)
      this.telescopeDiameter = document.querySelector('.telescopeDiameter');
      this.telescopeFocalLength = document.querySelector('.telescopeFocalLength');
      this.telescopeEffectiveAreaCoef = document.querySelector('.telescopeEffectiveAreaCoef');
      this.reducerValue = document.querySelector('.reducerValue');
      this.ccdRO = document.querySelector('.ccdRO');
      this.ccdDC = document.querySelector('.ccdDC');
      this.ccdPixelSize = document.querySelector('.ccdPixelSize');
      this.ccdQE = document.querySelector('.ccdQE');
      this.binningValue = document.querySelector('.binningValue');
      this.bandWavelength = document.querySelector('.bandWavelength');
      this.bandBandwidth = document.querySelector('.bandBandwidth');
      this.bandFlux = document.querySelector('.bandFlux');
      this.extinctionCoeff = document.querySelector('.extinctionCoeff');

      this.screenShade = document.querySelector('.screenShade');
      this.submit = document.querySelector('.submit');
      this.modal = document.querySelector('.modal');
      this.telescopeParams = document.querySelector('.telescopeParams');
      this.reducerParams = document.querySelector('.reducerParams');
      this.ccdParams = document.querySelector('.ccdParams');
      this.binningParams = document.querySelector('.binningParams');
      this.filterParams = document.querySelector('.filterParams');
      this.modalSubmit = document.querySelector('.modalSubmit');
      this.customTelescope = document.querySelector('.customTelescope');
      this.customReducer = document.querySelector('.customReducer');
      this.customCCD = document.querySelector('.customCCD');
      this.customBinning = document.querySelector('.customBinning');
      this.customBand = document.querySelector('.customBand');
      this.form = document.querySelector('.form');
      this.result = document.querySelector('.result');
      this.helpButton = document.querySelector('.helpButton');
      this.help = document.querySelector('.help');

      this.s_sig = document.querySelector('.s_sig');
      this.s_sky = document.querySelector('.s_sky');
      this.s_dc = document.querySelector('.s_dc');
      this.s_ro = document.querySelector('.s_ro');
      this.s_pix = document.querySelector('.n_pix');
    },

    fillData: function() {
      if (this.teleskop.options[this.teleskop.selectedIndex].text === 'Custom telescope') {
        this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text + ' (D = ' +
                                    this.telescope.custom.diameter + 'm, f = ' + this.telescope.custom.focalLength + 'm)';
      } else {
        this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text;
      }

      if (this.reducer.options[this.reducer.selectedIndex].text === 'Custom reducer') {
        this.r_reducer.innerHTML = this.reducer.options[this.reducer.selectedIndex].text + ' (' + this.eqParams.reducer + 'x)';
      } else {
        this.r_reducer.innerHTML = this.reducer.options[this.reducer.selectedIndex].text;
      }

      if (this.ccd.options[this.ccd.selectedIndex].text === 'Custom CCD') {
        this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text + ' (dark current = ' + this.camera.custom.dc +
                                'e<sup>-</sup>/s/pix, read-out = ' + this.camera.custom.ro + 'e<sup>-</sup>/pix, QE = ' +
                                this.camera.custom.qe[0] + ', pixel size = ' + this.camera.custom.pxSize * 1000000 + '&#181;m)';
      } else {
        this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text;
      }

      if (this.binning.options[this.binning.selectedIndex].text === 'Custom binning') {
        this.r_binning.innerHTML = this.binning.options[this.binning.selectedIndex].text + ' (' + this.eqParams.binning + 'x' +
                                    this.eqParams.binning + ')';
      } else {
        this.r_binning.innerHTML = this.binning.options[this.binning.selectedIndex].text;
      }

      if (this.filter.options[this.filter.selectedIndex].text === 'Custom band') {
        this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text + ' (&#955; = ' + this.band.custom.wavelength +
                                  '&#8491;, &#916;&#955; = ' + this.band.custom.bandwidth + '&#8491;, F = ' + this.band.custom.fluxPh +
                                  'photon/s/cm<sup>2</sup>/&#8491;)';
      } else {
        this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text;
      }

      this.r_object.innerHTML = this.object.options[this.object.selectedIndex].text;
      this.r_transparentnost_elemenata.innerHTML = this.transparentnost_elemenata.value;
      this.r_airmass.innerHTML = this.airmass.value;
      this.r_sjaj_neba.innerHTML = this.sjaj_neba.value;
      this.r_seeing.innerHTML = this.seeing.value;
      this.r_aperture.innerHTML = this.aperture.value;
      this.r_magnituda.innerHTML = this.magnituda.value;
      this.r_signal_to_noise.innerHTML = this.signal_to_noise.value;

      this.s_sig.innerHTML = (this.eqParams.sig).toFixed(2);
      this.s_sky.innerHTML = (this.eqParams.sky).toFixed(2);
      this.s_dc.innerHTML = this.eqParams.dc;
      this.s_ro.innerHTML = this.eqParams.ro;
      this.s_pix.innerHTML = this.eqParams.n;
    },


    execute: function() {
      this.getFnValues();
      
      if (this.eqParams.sig > 0.01) { // da bi sprečili kočenje skripte za premale vrednosti Ssig 
        this.calculateExposure();
        this.resetGraph();
        this.drawGraphLines();
        this.addGraphValues();
        this.drawGraph();
        this.drawHelpLines();
        this.fillData();
        this.logger();
        this.showGraphCB.checked ? this.canvas.classList.remove("collapsed") : this.canvas.classList.add("collapsed");
      }
    },


    getFnValues: function() {
      // dark current
      this.eqParams.dc = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].dc);

      // read-out noise
      this.eqParams.ro = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].ro);

      // pixel size
      this.eqParams.pxSize = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].pxSize);

      // filter wavelength
      this.eqParams.wavelength = Number(this.band[this.filter.options[this.filter.selectedIndex].value].wavelength);

      // quantum efficiency
      this.eqParams.qe = this.options.usePeakQE ?
                          Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].qe[0]) :
                          this.getQE(this.eqParams.wavelength, this.camera[this.ccd.options[this.ccd.selectedIndex].value].qe);

      // filter bandwidth
      this.eqParams.bandwidth = Number(this.band[this.filter.options[this.filter.selectedIndex].value].bandwidth);

      // filter flux (photon/A/m^2/s)
      this.eqParams.fluxPh = Number(this.band[this.filter.options[this.filter.selectedIndex].value].fluxPh * 10000);

      // filter extinction coefficient (mag/airmass)
      this.eqParams.extinctCoeff = Number(this.band[this.filter.options[this.filter.selectedIndex].value].extinctCoeff);

      // signal-to-noise
      this.eqParams.snr = Number(this.signal_to_noise.value);

      // telescope focalLength
      this.eqParams.focalLength = Number(this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].focalLength *
                                  (this.reducer.value === 'custom' ? this.eqParams.reducer : this.reducer.value));

      // unobstructed area of main mirror in m^2
      this.eqParams.area = Number(Math.pow(this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].diameter, 2) * Math.PI / 4) *
                            this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].effectiveAreaCoef;

      // camera resolution
      this.eqParams.res = Number(((this.binning.value === 'custom' ? this.eqParams.binning : this.binning.value) *
                          this.eqParams.pxSize * 206265 / this.eqParams.focalLength).toFixed(2));

      // number of pixels
      if (this.object.value == 'point') {
        // this.eqParams.n = Number((Math.pow(0.67 * this.aperture.value / this.eqParams.res, 2) * Math.PI).toFixed(2)); // ova formula bi trebalo da daje tačniju vrednost ali svi drugi kalkulatori koriste donju formulu pa ćemo i mi
        this.eqParams.n = Number((Math.pow(this.aperture.value / this.eqParams.res, 2) * Math.PI).toFixed(2));
      } else {
        this.eqParams.n = 1;
      }

      // sky transparency
      this.eqParams.airmass = Number(this.airmass.value);

      // total transparency on all optical elements
      this.eqParams.totalTransparency = Number(this.transparentnost_elemenata.value);

      // object magnitude
      this.eqParams.mag = Number(this.magnituda.value);

      // sky magnitude
      this.eqParams.skyMag = Number(this.sjaj_neba.value);

      // signal
      if (this.object.value == 'point') {
        this.eqParams.sig = Number(Math.pow(10, -1 * (this.eqParams.mag + this.eqParams.airmass * this.eqParams.extinctCoeff) / 2.5) *
                            this.eqParams.fluxPh * this.eqParams.area * this.eqParams.totalTransparency * this.eqParams.qe *
                            this.eqParams.bandwidth * this.fraction_inside_slow(this.seeing.value, this.aperture.value, this.eqParams.res));
      } else {
        this.eqParams.sig = Number(Math.pow(10, -1 * (this.eqParams.mag + this.eqParams.airmass * this.eqParams.extinctCoeff) / 2.5) *
                            this.eqParams.fluxPh * this.eqParams.area * this.eqParams.totalTransparency * this.eqParams.qe *
                            this.eqParams.bandwidth * Math.pow(this.eqParams.res, 2) * this.fraction_inside_slow(this.seeing.value, this.aperture.value, this.eqParams.res));
      }

      // sky (========== MAGNITUDA NEBA SE NE KORIGUJE ZA EKSTINKCIJU =============)
      this.eqParams.sky = Number(Math.pow(10, -1 * this.eqParams.skyMag / 2.5) * this.eqParams.fluxPh * this.eqParams.area *
                          this.eqParams.totalTransparency * this.eqParams.qe * this.eqParams.bandwidth * Math.pow(this.eqParams.res, 2));
    },

    calculateExposure: function() {
      // signal
      var sig = this.eqParams.sig;

      // sky
      var sky = this.eqParams.sky;

      // dark current
      var dc = this.eqParams.dc;

      // read-out noise
      var ro = this.eqParams.ro;

      // number of pixels
      var n = this.eqParams.n;

      // signal-to-noise ratio
      var snr = this.eqParams.snr;

      this.eqParams.exposure = Number(((Math.pow(snr, 2) * (sig + (sky + dc) * n) + Math.sqrt(Math.pow(snr, 4) *
                                Math.pow((sig + (sky + dc) * n), 2) + 4 * Math.pow(sig * snr * ro, 2) * n)) /
                                (2 * Math.pow(sig, 2))).toFixed(2));

      // ako je ekspozicija duža od 20 sekundi zaokruži vrednost
      if (this.eqParams.exposure > 20) {
        this.ekspozicija.innerHTML = Math.round(this.eqParams.exposure);
      } else {
        this.ekspozicija.innerHTML = this.eqParams.exposure;
      }
    },


    setXOffset: function(sn) {
      var ctx = this.canvas.getContext("2d");
      var txt = sn.toString();
      var txtWidth= ctx.measureText(txt).width;

      this.graph.xOffset = txtWidth + 5 < 20 ? 25 : txtWidth + 5;
    },

    resetGraph: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.strokeStyle = "#000";

      ctx.clearRect(0, 0, width, height);
    },

    drawGraphLines: function() {
      var ctx = this.canvas.getContext("2d");
      var width = this.canvas.width;
      var height = this.canvas.height;

      this.setXOffset(Math.ceil(this.eqParams.snr * 1.3));

      ctx.setTransform(1, 0, 0, -1, 0, height);

      this.graph.broj_podeokaX = 0;
      this.graph.broj_podeokaY = 0;

      // jako bitno da bi kasnije mogli da obrišemo linije nacrtane lineTo() metodom
      ctx.beginPath();

      // koordinatne linije
      // x-osa
      ctx.moveTo(this.graph.xOffset, this.graph.yOffset + 10);
      ctx.lineTo(width - 30, this.graph.yOffset + 10);

      // y-osa
      ctx.moveTo(this.graph.xOffset + 10, this.graph.yOffset);
      ctx.lineTo(this.graph.xOffset + 10, height - 20);

      // podeoci na x osi
      for (var i = this.graph.xOffset + 10 + this.graph.podeokX; i <= width - 30; i += this.graph.podeokX) {
        ctx.moveTo(i, this.graph.yOffset + 10);
        ctx.lineTo(i, this.graph.yOffset);
        this.graph.broj_podeokaX++;
      }

      // podeoci na y osi
      for (var j = this.graph.yOffset + 10 + this.graph.podeokY; j <= height - 20; j += this.graph.podeokY) {
        ctx.moveTo(this.graph.xOffset + 10, j);
        ctx.lineTo(this.graph.xOffset, j);
        this.graph.broj_podeokaY++;
      }

      ctx.stroke();

      ctx.closePath();
    },

    addGraphValues: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      var n = 1;
      var m = 1;
      var t = this.eqParams.exposure;
      var snr = this.eqParams.snr;

      this.graph.upLimitX = Math.ceil(t * 1.3);
      this.graph.upLimitY = Math.ceil(snr * 1.3);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // oznake koordinatnih osa
      ctx.font = "16px sans-serif";
      ctx.fillText("S/N", this.graph.xOffset, 15);
      ctx.fillText("t(s)", width - 25, height - this.graph.yOffset - 5);

      // koordinatni početak
      ctx.font = "10px sans-serif";
      ctx.fillText("0", 3, height - this.graph.yOffset - 5); // y-osa
      ctx.fillText("0", this.graph.xOffset + 7, height - this.graph.yOffset + 15); // x-osa

      // vrednosti na x osi
      if (this.graph.upLimitX > this.graph.broj_podeokaX) {
        while (this.graph.upLimitX % this.graph.broj_podeokaX !== 0) {
          this.graph.upLimitX++;
        }
        for (var j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 30; j += this.graph.podeokX) {
          ctx.moveTo(j, height - 3);
          ctx.fillText(n * this.graph.upLimitX / this.graph.broj_podeokaX, j - 5, height - this.graph.yOffset + 15);
          n++;
        }
      } else {
        for (var j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 20; j += this.graph.podeokX) {
          ctx.moveTo(j, height - 3);
          ctx.fillText((n * this.graph.upLimitX / this.graph.broj_podeokaX).toFixed(2), j - 5, height - this.graph.yOffset + 15);
          n++;
        }
      }

      // vrednosti na y osi
      if (this.graph.upLimitY > this.graph.broj_podeokaY) {
        while (this.graph.upLimitY % this.graph.broj_podeokaY !== 0) {
          this.graph.upLimitY++;
        }
        for (var j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
          ctx.moveTo(0, j);
          ctx.fillText(m * this.graph.upLimitY / this.graph.broj_podeokaY, 3, j + 10);
          m++;
        }
      } else {
        for (var j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
          ctx.moveTo(0, j);
          ctx.fillText((m * this.graph.upLimitY / this.graph.broj_podeokaY).toFixed(2), 3, j + 10);
          m++;
        }
      }
    },

    drawGraph: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      var scaleX = this.graph.podeokX * this.graph.broj_podeokaX / this.graph.upLimitX;
      var scaleY = this.graph.podeokY * this.graph.broj_podeokaY / this.graph.upLimitY;

      var sig = this.eqParams.sig;
      var sky = this.eqParams.sky;
      var dc = this.eqParams.dc;
      var ro = this.eqParams.ro;
      var n = this.eqParams.n;

      var snr = 0;

      ctx.setTransform(1, 0, 0, -1, this.graph.xOffset + 11, height - this.graph.yOffset - 11);
      ctx.beginPath();

      ctx.moveTo(0, 0);

      if (this.graph.upLimitX !== 0) {
        for (var t = 0; t <= this.graph.upLimitX; t += this.graph.upLimitX / this.graph.dataPointsNo) {
          snr = sig * t / Math.sqrt(sig * t + sky * n * t + dc * t * n + ro * ro * n);
          ctx.lineTo(t * scaleX, snr * scaleY);
        }
      }

      ctx.stroke();
      ctx.closePath();

      this.graph.drawn = true;
    },

    drawHelpLines: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      var scaleX = this.graph.podeokX * this.graph.broj_podeokaX / this.graph.upLimitX;
      var scaleY = this.graph.podeokY * this.graph.broj_podeokaY / this.graph.upLimitY;

      var t = this.eqParams.exposure;
      var snr = this.eqParams.snr;

      ctx.setTransform(1, 0, 0, -1, this.graph.xOffset + 11, height - this.graph.yOffset - 11);
      ctx.beginPath();

      ctx.strokeStyle = "#bbb";

      ctx.moveTo(0, snr * scaleY - 1);
      ctx.lineTo(this.canvas.width, snr * scaleY - 1);
      ctx.moveTo(t * scaleX - 1, 0);
      ctx.lineTo(t * scaleX - 1, this.canvas.width);

      ctx.stroke();
      ctx.closePath();
    },


    logger: function() {
      console.log("Teleskop: " + this.teleskop.options[this.teleskop.selectedIndex].value);
      console.log("Reducer: " + this.reducer.options[this.reducer.selectedIndex].text);
      console.log("CCD: " + this.ccd.options[this.ccd.selectedIndex].value);
      console.log("Filter: " + this.filter.options[this.filter.selectedIndex].text);
      // console.log("Opseg filtera: " + this.opseg_filtera.value);
      console.log("Transparentnost elemenata: " + this.transparentnost_elemenata.value);
      console.log("airmass: " + this.airmass.value);
      console.log("Sjaj neba: " + this.sjaj_neba.value);
      console.log("Seeing: " + this.seeing.value);
      console.log("Magnituda: " + this.magnituda.value);
      console.log("S/N: " + this.eqParams.snr);
      console.log("eqParams: " + JSON.stringify(this.eqParams, null, '\t'));
    },


  }

  // inicijalizacija
  kalkulator.init();
});
