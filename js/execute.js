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
        this.result.classList.remove("collapsed");
      }
    },