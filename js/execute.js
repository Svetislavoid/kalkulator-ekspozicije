    execute: function() {
      this.getFnValues();
      this.calculateExposure();
      this.resetGraph();
      this.drawGraphLines();
      this.addGraphValues();
      this.drawGraph();
      this.drawHelpLines();
      this.fillData();
      this.logger();
      this.result.classList.remove("collapsed");
    },
