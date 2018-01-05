    init: function() {
      this.cacheDom();
      this.bindEvent('click', this.submit, this.execute.bind(this));
      this.bindEvent('click', this.customTelescope, this.addCustomTelescope.bind(this));
      this.bindEvent('click', this.customCCD, this.addCustomCCD.bind(this));
      this.bindEvent('click', this.customBand, this.addCustomBand.bind(this));
      this.bindEvent('click', this.modalSubmit, this.submitCustomParams.bind(this));
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

    addCustomCCD: function() {
      this.shadeScreen();
      this.ccdParams.classList.add("on");
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
      this.ccdParams.classList.remove("on");
      this.filterParams.classList.remove("on");
      this.telescope.custom.diameter = this.telescopeDiameter.value;
      this.telescope.custom.focalLength = this.telescopeFocalLength.value;
      this.camera.custom.ro = this.ccdRO.value;
      this.camera.custom.dc = this.ccdDC.value;
      this.camera.custom.pxSize = this.ccdPixelSize.value/1000000;
      this.camera.custom.qe = this.ccdQE.value/100;
      this.band.custom.wavelength = this.bandWavelength.value;
      this.band.custom.bandwidth = this.bandBandwidth.value;
      this.band.custom.fluxPh = this.bandFlux.value;
    },
