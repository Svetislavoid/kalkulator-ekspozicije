    cacheDom: function() {
      this.object = document.querySelector('.object');
      this.teleskop = document.querySelector('.teleskop');
      this.reducer = document.querySelector('.reducer');
      this.ccd = document.querySelector('.ccd');
      this.binning = document.querySelector('.binning');
      this.filter = document.querySelector('.filter');
      this.transparentnost_elemenata = document.querySelector('.transparentnost');
      this.airmass = document.querySelector('.airmass');
      this.sjaj_neba = document.querySelector('.sjaj-neba');
      this.seeing = document.querySelector('.seeing');
      this.aperture = document.querySelector('.aperture');
      this.magnituda = document.querySelector('.magnituda');
      this.signal_to_noise = document.querySelector('.signal-to-noise');
      this.showGraphCB = document.querySelector('.showGraph input');

      this.r_object = document.querySelector('.r-object');
      this.r_teleskop = document.querySelector('.r-teleskop');
      this.r_reducer = document.querySelector('.r-reducer');
      this.r_ccd = document.querySelector('.r-ccd');
      this.r_binning = document.querySelector('.r-binning');
      this.r_filter = document.querySelector('.r-filter');
      this.r_transparentnost_elemenata = document.querySelector('.r-transparentnost');
      this.r_airmass = document.querySelector('.r-airmass');
      this.r_sjaj_neba = document.querySelector('.r-sjaj-neba');
      this.r_seeing = document.querySelector('.r-seeing');
      this.r_aperture = document.querySelector('.r-aperture');
      this.r_magnituda = document.querySelector('.r-magnituda');
      this.r_signal_to_noise = document.querySelector('.r-signal-to-noise');

      this.ekspozicija = document.querySelector('.ekspozicija span');
      this.canvas = document.querySelector('#canvas');

      // Podaci iz modala (custom polja)
      this.telescopeDiameter = document.querySelector('.telescopeDiameter');
      this.telescopeFocalLength = document.querySelector('.telescopeFocalLength');
      this.telescopeEffectiveAreaCoef = document.querySelector('.telescopeEffectiveAreaCoef');
      this.reducerValue = document.querySelector('.reducerValue');
      this.ccdRO = document.querySelector('.ccdRO');
      this.ccdDC = document.querySelector('.ccdDC');
      this.ccdPixelSize = document.querySelector('.ccdPixelSize');
      this.ccdQE = document.querySelector('.ccdQE');
      this.binningValue = document.querySelector('.binningValue');
      this.bandWavelength = document.querySelector('.bandWavelength');
      this.bandBandwidth = document.querySelector('.bandBandwidth');
      this.bandFlux = document.querySelector('.bandFlux');
      this.extinctionCoeff = document.querySelector('.extinctionCoeff');

      this.screenShade = document.querySelector('.screenShade');
      this.submit = document.querySelector('.submit');
      this.modal = document.querySelector('.modal');
      this.telescopeParams = document.querySelector('.telescopeParams');
      this.reducerParams = document.querySelector('.reducerParams');
      this.ccdParams = document.querySelector('.ccdParams');
      this.binningParams = document.querySelector('.binningParams');
      this.filterParams = document.querySelector('.filterParams');
      this.modalSubmit = document.querySelector('.modalSubmit');
      this.customTelescope = document.querySelector('.customTelescope');
      this.customReducer = document.querySelector('.customReducer');
      this.customCCD = document.querySelector('.customCCD');
      this.customBinning = document.querySelector('.customBinning');
      this.customBand = document.querySelector('.customBand');
      this.form = document.querySelector('.form');
      this.result = document.querySelector('.result');
      this.back = document.querySelector('.back');
      this.helpButton = document.querySelector('.helpButton');
      this.help = document.querySelector('.help');

      this.s_sig = document.querySelector('.s_sig');
      this.s_sky = document.querySelector('.s_sky');
      this.s_dc = document.querySelector('.s_dc');
      this.s_ro = document.querySelector('.s_ro');
      this.s_pix = document.querySelector('.n_pix');
    },

    fillData: function() {
      if (this.teleskop.options[this.teleskop.selectedIndex].text === 'Custom telescope') {
        this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text + ' (D = ' +
                                    this.telescope.custom.diameter + 'm, f = ' + this.telescope.custom.focalLength + 'm)';
      } else {
        this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text;
      }

      if (this.reducer.options[this.reducer.selectedIndex].text === 'Custom reducer') {
        this.r_reducer.innerHTML = this.reducer.options[this.reducer.selectedIndex].text + ' (' + this.eqParams.reducer + 'x)';
      } else {
        this.r_reducer.innerHTML = this.reducer.options[this.reducer.selectedIndex].text;
      }

      if (this.ccd.options[this.ccd.selectedIndex].text === 'Custom CCD') {
        this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text + ' (dark current = ' + this.camera.custom.dc +
                                'e<sup>-</sup>/s/pix, read-out = ' + this.camera.custom.ro + 'e<sup>-</sup>/pix, QE = ' +
                                this.camera.custom.qe[0] + ', pixel size = ' + this.camera.custom.pxSize * 1000000 + '&#181;m)';
      } else {
        this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text;
      }

      if (this.binning.options[this.binning.selectedIndex].text === 'Custom binning') {
        this.r_binning.innerHTML = this.binning.options[this.binning.selectedIndex].text + ' (' + this.eqParams.binning + 'x' +
                                    this.eqParams.binning + ')';
      } else {
        this.r_binning.innerHTML = this.binning.options[this.binning.selectedIndex].text;
      }

      if (this.filter.options[this.filter.selectedIndex].text === 'Custom band') {
        this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text + ' (&#955; = ' + this.band.custom.wavelength +
                                  '&#8491;, &#916;&#955; = ' + this.band.custom.bandwidth + '&#8491;, F = ' + this.band.custom.fluxPh +
                                  'photon/s/cm<sup>2</sup>/&#8491;)';
      } else {
        this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text;
      }

      this.r_object.innerHTML = this.object.options[this.object.selectedIndex].text;
      this.r_transparentnost_elemenata.innerHTML = this.transparentnost_elemenata.value;
      this.r_airmass.innerHTML = this.airmass.value;
      this.r_sjaj_neba.innerHTML = this.sjaj_neba.value;
      this.r_seeing.innerHTML = this.seeing.value;
      this.r_aperture.innerHTML = this.aperture.value;
      this.r_magnituda.innerHTML = this.magnituda.value;
      this.r_signal_to_noise.innerHTML = this.signal_to_noise.value;

      this.s_sig.innerHTML = (this.eqParams.sig).toFixed(2);
      this.s_sky.innerHTML = (this.eqParams.sky).toFixed(2);
      this.s_dc.innerHTML = this.eqParams.dc;
      this.s_ro.innerHTML = this.eqParams.ro;
      this.s_pix.innerHTML = this.eqParams.n;
    },
