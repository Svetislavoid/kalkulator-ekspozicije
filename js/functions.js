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
      this.telescope.custom.effectiveAreaCoef = this.telescopeEffectiveAreaCoef.value ? this.telescopeEffectiveAreaCoef.value/100 : 1;
      this.eqParams.reducer = Number(this.reducerValue.value);
      this.camera.custom.ro = this.ccdRO.value;
      this.camera.custom.dc = this.ccdDC.value;
      this.camera.custom.pxSize = this.ccdPixelSize.value/1000000;
      this.camera.custom.qe[0] = this.ccdQE.value/100;
      this.eqParams.binning = Number(this.binningValue.value);
      this.band.custom.wavelength = this.bandWavelength.value;
      this.band.custom.bandwidth = this.bandBandwidth.value;
      this.band.custom.fluxPh = this.bandFlux.value;
    },

    showGraph: function() {
      this.showGraphCB.checked && this.graph.drawn ? this.canvas.classList.remove("collapsed"): this.canvas.classList.add("collapsed");
    },

    showHelp: function() {
      this.help.classList.toggle("collapsed");
    },

    getQE: function(lambda, cameraQE) {
      var diff = 999999999999;
      var pos = 0;
      Object.keys(cameraQE).map(function(key, index) {
        if (Math.abs(lambda/10 - key) < diff) {
          diff = Math.abs(lambda/10 - key);
          pos = key;
        }
      });

      return cameraQE[pos];
    },
