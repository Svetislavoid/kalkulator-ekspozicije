    getFnValues: function() {
      // dark current
      this.eqParams.dc = this.camera[this.ccd.options[this.ccd.selectedIndex].value].dc;
      // read-out noise
      this.eqParams.rn = this.camera[this.ccd.options[this.ccd.selectedIndex].value].rn;
      // quantum efficiency
      this.eqParams.qe = this.camera[this.ccd.options[this.ccd.selectedIndex].value].qe;
      // pixel size
      this.eqParams.pxSize = this.camera[this.ccd.options[this.ccd.selectedIndex].value].pxSize;
      // signal-to-noise
      this.eqParams.snr = Number(this.signal_to_noise.value);
      // telescope focalLength
      this.eqParams.focalLength = this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].focalLength*this.reducer.value;
      // camera resolution
      this.eqParams.res = Number((this.eqParams.pxSize*206265/this.eqParams.focalLength).toFixed(2));
      // number of pixels
      this.eqParams.n = Number((Math.pow(this.seeing.value,2)*Math.PI/(4*this.eqParams.res)).toFixed(2));
      // signal
      this.eqParams.sig = 2*this.eqParams.qe;
      // sky
      this.eqParams.sky = Number(this.sjaj_neba.value)*this.eqParams.qe;
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
