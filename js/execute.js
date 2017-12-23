    execute: function() {
      this.fillData();
      this.getFnValues();
      this.calculateExposure();
      this.resetGraph();
      this.drawGraphLines();
      this.addGraphValues();
      this.drawGraph();
      this.drawHelpLines();
      this.logger();
      this.result.classList.remove("collapsed");
    },
