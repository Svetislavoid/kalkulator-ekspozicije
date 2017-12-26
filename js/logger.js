    logger: function() {
      console.log("Teleskop: " + this.teleskop.options[this.teleskop.selectedIndex].value);
      console.log("Reducer: " + this.reducer.options[this.reducer.selectedIndex].text);
      console.log("CCD: " + this.ccd.options[this.ccd.selectedIndex].value);
      console.log("Filter: " + this.filter.options[this.filter.selectedIndex].text);
      // console.log("Opseg filtera: " + this.opseg_filtera.value);
      console.log("Transparentnost elemenata: " + this.transparentnost_elemenata.value);
      console.log("Transparentnost neba: " + this.transparentnost_neba.value);
      console.log("Sjaj neba: " + this.sjaj_neba.value);
      console.log("Seeing: " + this.seeing.value);
      console.log("Magnituda: " + this.magnituda.value);
      console.log("S/N: " + this.eqParams.snr);
      console.log("eqParams: " + JSON.stringify(this.eqParams, null, '\t'));
    },
