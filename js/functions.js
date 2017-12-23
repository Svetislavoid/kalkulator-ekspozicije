    init: function() {
      this.cacheDom();
      this.bindEvent('click', this.submit, this.execute.bind(this));
    },

    bindEvent: function(event, target, callback) {
      target.addEventListener(event, callback);
    },
