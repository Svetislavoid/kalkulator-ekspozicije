    init: function() {
      this.cacheDom();
      this.bindEvent('click', this.submit, this.execute.bind(this));
      this.bindEvent('click', this.customTelescope, this.addCustomTelescope.bind(this));
      this.bindEvent('click', this.customCCD, this.addCustomCCD.bind(this));
    },

    bindEvent: function(event, target, callback) {
      target.addEventListener(event, callback);
    },

    addCustomTelescope: function() {
      alert('Custom telescope');
    },

    addCustomCCD: function() {
      alert('Custom CCD');
    },
