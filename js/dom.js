    cacheDom: function() {
      this.teleskop = document.querySelector('.teleskop');
      this.reducer = document.querySelector('.reducer');
      this.ccd = document.querySelector('.ccd');
      this.filter = document.querySelector('.filter');
      // this.opseg_filtera = document.querySelector('.opseg');
      this.transparentnost_elemenata = document.querySelector('.transparentnost');
      this.transparentnost_neba = document.querySelector('.transparentnost-neba');
      this.sjaj_neba = document.querySelector('.sjaj-neba');
      this.seeing = document.querySelector('.seeing');
      this.magnituda = document.querySelector('.magnituda');
      this.signal_to_noise = document.querySelector('.signal-to-noise');

      this.r_teleskop = document.querySelector('.r-teleskop');
      this.r_reducer = document.querySelector('.r-reducer');
      this.r_ccd = document.querySelector('.r-ccd');
      this.r_filter = document.querySelector('.r-filter');
      // this.r_opseg_filtera = document.querySelector('.r-opseg');
      this.r_transparentnost_elemenata = document.querySelector('.r-transparentnost');
      this.r_transparentnost_neba = document.querySelector('.r-transparentnost-neba');
      this.r_sjaj_neba = document.querySelector('.r-sjaj-neba');
      this.r_seeing = document.querySelector('.r-seeing');
      this.r_magnituda = document.querySelector('.r-magnituda');
      this.r_signal_to_noise = document.querySelector('.r-signal-to-noise');

      this.ekspozicija = document.querySelector('.ekspozicija span');
      this.canvas = document.querySelector('#canvas');

      this.submit = document.querySelector('.submit');
      this.form = document.querySelector('.form');
      this.result = document.querySelector('.result');

      this.s_sig = document.querySelector('.s_sig');
      this.s_sky = document.querySelector('.s_sky');
      this.s_dc = document.querySelector('.s_dc');
      this.s_ro = document.querySelector('.s_ro');
      this.s_pix = document.querySelector('.n_pix');
    },

    fillData: function() {
      this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text;            
      this.r_reducer.innerHTML = this.reducer.options[this.reducer.selectedIndex].text;
      this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text;
      this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text;
      // this.r_opseg_filtera.innerHTML = this.opseg_filtera.value;
      this.r_transparentnost_elemenata.innerHTML = this.transparentnost_elemenata.value;
      this.r_transparentnost_neba.innerHTML = this.transparentnost_neba.value;
      this.r_sjaj_neba.innerHTML = this.sjaj_neba.value;
      this.r_seeing.innerHTML = this.seeing.value;
      this.r_magnituda.innerHTML = this.magnituda.value;
      this.r_signal_to_noise.innerHTML = this.signal_to_noise.value;

      this.s_sig.innerHTML = (this.eqParams.sig).toFixed(2);
      this.s_sky.innerHTML = (this.eqParams.sky).toFixed(2);
      this.s_dc.innerHTML = this.eqParams.dc;
      this.s_ro.innerHTML = this.eqParams.rn;
      this.s_pix.innerHTML = this.eqParams.n;
    },
