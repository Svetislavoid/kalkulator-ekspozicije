    getFnValues: function() {
      // dark current
      this.eqParams.dc = this.camera[this.ccd.options[this.ccd.selectedIndex].value].dc;
      // read-out noise
      this.eqParams.rn = this.camera[this.ccd.options[this.ccd.selectedIndex].value].rn;
      // quantum efficiency
      this.eqParams.qe = this.camera[this.ccd.options[this.ccd.selectedIndex].value].qe;
      // pixel size
      this.eqParams.pxSize = this.camera[this.ccd.options[this.ccd.selectedIndex].value].pxSize;
      // filter wavelength
      this.eqParams.wavelength = this.band[this.filter.options[this.filter.selectedIndex].value].wavelength;
      // filter bandwidth
      this.eqParams.bandwidth = this.band[this.filter.options[this.filter.selectedIndex].value].bandwidth;
      // filter flux (photon/A/m^2/s)
      this.eqParams.fluxPh = this.band[this.filter.options[this.filter.selectedIndex].value].fluxPh*10000;
      // signal-to-noise
      this.eqParams.snr = Number(this.signal_to_noise.value);
      // telescope focalLength
      this.eqParams.focalLength = this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].focalLength*this.reducer.value;
      // unobstructed area of main mirror in m^2
      this.eqParams.area = Math.pow(this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].diameter,2)*Math.PI/4;
      // camera resolution
      this.eqParams.res = Number((this.eqParams.pxSize*206265/this.eqParams.focalLength).toFixed(2));
      // number of pixels
      this.eqParams.n = Number((Math.pow(0.67*this.seeing.value,2)*Math.PI/this.eqParams.res).toFixed(2));
      // sky transparency
      this.eqParams.skyTransparency = Number(this.transparentnost_neba.value);
      // total transparency on all optical elements
      this.eqParams.totalTransparency = Number(this.transparentnost_elemenata.value);
      // object magnitude
      this.eqParams.mag = Number(this.magnituda.value);
      // sky magnitude
      this.eqParams.skyMag = Number(this.sjaj_neba.value);
      // signal
      this.eqParams.sig = Math.pow(10, -1*this.eqParams.mag/2.5)*this.eqParams.fluxPh*this.eqParams.area*this.eqParams.skyTransparency*this.eqParams.totalTransparency*this.eqParams.qe*this.eqParams.bandwidth;
      // sky
      this.eqParams.sky = Math.pow(10, -1*this.eqParams.skyMag/2.5)*this.eqParams.fluxPh*this.eqParams.area*this.eqParams.skyTransparency*this.eqParams.totalTransparency*this.eqParams.qe*this.eqParams.bandwidth*Math.pow(this.eqParams.res,2);
    },

    calculateExposure: function() {
      // signal
      var sig = this.eqParams.sig;
      // sky
      var sky = this.eqParams.sky;
      // dark current
      var dc = this.eqParams.dc;
      // read-out noise
      var rn = this.eqParams.rn;
      // number of pixels
      var n = this.eqParams.n;
      // signal-to-moise ratio
      var snr = this.eqParams.snr;

      this.eqParams.exposure = ((Math.pow(snr,2)*(sig+(sky+dc)*n)+Math.sqrt(Math.pow(snr,4)*Math.pow((sig+(sky+dc)*n),2)+4*Math.pow(sig*snr,2)*rn*n))/(2*Math.pow(sig,2))).toFixed(2);

      // ako je ekspozicija duža od 20 sekundi zaokruži vrednost
      if (this.eqParams.exposure > 20) {
        this.eqParams.exposure = Math.round(this.eqParams.exposure);
      }

      this.ekspozicija.innerHTML = this.eqParams.exposure;

    },
