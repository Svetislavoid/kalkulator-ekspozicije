window.addEventListener('load', function() {

  var kalkulator = {
    graph: {
      xOffset: 25,
      yOffset: 20,
      upLimitX: 0,
      upLimitY: 0,
      broj_podeokaX: 0,
      broj_podeokaY: 0,
      dataPointsNo: 200,
      podeokX: 45,
      podeokY: 45,
      drawn: false
    },
    eqParams: {
      sig: 0,
      sky: 0,
      dc: 0,
      ro: 0,
      qe: 0,
      wavelength: 0,
      bandwidth: 0,
      fluxPh: 0,
      skyTransparency: 0,
      totalTransparency: 0,
      pxSize: 0,
      binning: 1,
      focalLength: 0,
      area: 0,
      mag: 0,
      skyMag: 0,
      snr: 0,
      n: 0,
      res: 0,
      exposure: 0
    },
    telescope: {
      cassegrain: {
        diameter: 0.6,
        focalLength: 6,
        effectiveAreaCoef: 1
      },
      nasmyth: {
        diameter: 1.4,
        focalLength: 11.2,
        effectiveAreaCoef: 1
      },
      custom: {
        diameter: 0,
        focalLength: 0,
        effectiveAreaCoef: 1
      }
    },
    camera: {
      apogeeU42: {
        dc: 1,
        ro: 10,
        qe: 0.9,
        pxSize: 13.5e-6
      },
      apogeeE47: {
        dc: 0.1,
        ro: 10,
        qe: 0.96,
        pxSize: 13e-6
      },
      iKonL: {
        dc: null,
        ro: null,
        qe: 0.95,
        pxSize: 13.5e-6
      },
      iXon897: {
        dc: null,
        ro: null,
        qe: 0.925,
        pxSize: 16e-6
      },
      sbigst10xme: {
        dc: 0.5,
        ro: 8.8,
        qe: 0.85,
        pxSize: 6.8e-6
      },
      custom: {
        dc: 0,
        ro: 0,
        qe: 0,
        pxSize: 0
      }
    },
    band: {
      'B': {
        wavelength: 4450,
        bandwidth: 940,
        fluxJY: 4260,
        fluxPh: 1444.762247191
      },
      'V': {
        wavelength: 5510,
        bandwidth: 880,
        fluxJY: 3640,
        fluxPh: 997.0032667877
      },
      'R': {
        wavelength: 6580,
        bandwidth: 1380,
        fluxJY: 3080,
        fluxPh: 706.4340425532
      },
      'I': {
        wavelength: 8060,
        bandwidth: 1490,
        fluxJY: 2550,
        fluxPh: 477.476426799
      },
      'L': {
        wavelength: 35000,
        bandwidth: 4720,
        fluxJY: 280,
        fluxPh: 12.07364926
      },
      'Ha': {
        wavelength: 6563,
        bandwidth: 50,
        fluxJY: 3631,
        fluxPh: 834.9729635
      },
      'Red-continuum': {
        wavelength: 6452,
        bandwidth: 50,
        fluxJY: 3631,
        fluxPh: 849.3378115
      },
      '[SII]': {
        wavelength: 6718,
        bandwidth: 35,
        fluxJY: 3631,
        fluxPh: 815.708181
      },
      'custom': {
        wavelength: 0,
        bandwidth: 0,
        fluxJY: 0,
        fluxPh: 0
      }
    },


    init: function() {
      this.cacheDom();
      this.bindEvent('click', this.submit, this.execute.bind(this));
      this.bindEvent('click', this.customTelescope, this.addCustomTelescope.bind(this));
      this.bindEvent('click', this.customCCD, this.addCustomCCD.bind(this));
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
      this.telescope.custom.effectiveAreaCoef = this.telescopeEffectiveAreaCoef.value ? this.telescopeEffectiveAreaCoef.value/100 : 1;
      this.camera.custom.ro = this.ccdRO.value;
      this.camera.custom.dc = this.ccdDC.value;
      this.camera.custom.pxSize = this.ccdPixelSize.value/1000000;
      this.camera.custom.qe = this.ccdQE.value/100;
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


    cacheDom: function() {
      this.teleskop = document.querySelector('.teleskop');
      this.reducer = document.querySelector('.reducer');
      this.ccd = document.querySelector('.ccd');
      this.binning = document.querySelector('.binning');
      this.filter = document.querySelector('.filter');
      this.transparentnost_elemenata = document.querySelector('.transparentnost');
      this.transparentnost_neba = document.querySelector('.transparentnost-neba');
      this.sjaj_neba = document.querySelector('.sjaj-neba');
      this.seeing = document.querySelector('.seeing');
      this.magnituda = document.querySelector('.magnituda');
      this.signal_to_noise = document.querySelector('.signal-to-noise');
      this.showGraphCB = document.querySelector('.showGraph input');

      this.r_teleskop = document.querySelector('.r-teleskop');
      this.r_reducer = document.querySelector('.r-reducer');
      this.r_ccd = document.querySelector('.r-ccd');
      this.r_binning = document.querySelector('.r-binning');
      this.r_filter = document.querySelector('.r-filter');
      this.r_transparentnost_elemenata = document.querySelector('.r-transparentnost');
      this.r_transparentnost_neba = document.querySelector('.r-transparentnost-neba');
      this.r_sjaj_neba = document.querySelector('.r-sjaj-neba');
      this.r_seeing = document.querySelector('.r-seeing');
      this.r_magnituda = document.querySelector('.r-magnituda');
      this.r_signal_to_noise = document.querySelector('.r-signal-to-noise');

      this.ekspozicija = document.querySelector('.ekspozicija span');
      this.canvas = document.querySelector('#canvas');

      this.telescopeDiameter = document.querySelector('.telescopeDiameter');
      this.telescopeFocalLength = document.querySelector('.telescopeFocalLength');
      this.telescopeEffectiveAreaCoef = document.querySelector('.telescopeEffectiveAreaCoef');
      this.ccdRO = document.querySelector('.ccdRO');
      this.ccdDC = document.querySelector('.ccdDC');
      this.ccdPixelSize = document.querySelector('.ccdPixelSize');
      this.ccdQE = document.querySelector('.ccdQE');
      this.bandWavelength = document.querySelector('.bandWavelength');
      this.bandBandwidth = document.querySelector('.bandBandwidth');
      this.bandFlux = document.querySelector('.bandFlux');

      this.screenShade = document.querySelector('.screenShade');
      this.submit = document.querySelector('.submit');
      this.modal = document.querySelector('.modal');
      this.telescopeParams = document.querySelector('.telescopeParams');
      this.ccdParams = document.querySelector('.ccdParams');
      this.filterParams = document.querySelector('.filterParams');
      this.modalSubmit = document.querySelector('.modalSubmit');
      this.customTelescope = document.querySelector('.customTelescope');
      this.customCCD = document.querySelector('.customCCD');
      this.customBand = document.querySelector('.customBand');
      this.form = document.querySelector('.form');
      this.result = document.querySelector('.result');
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
        this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text + ' (D = ' + this.telescope.custom.diameter + 'm, f = ' + this.telescope.custom.focalLength + 'm)';
      } else {
        this.r_teleskop.innerHTML = this.teleskop.options[this.teleskop.selectedIndex].text;
      }
      if (this.ccd.options[this.ccd.selectedIndex].text === 'Custom CCD') {
        this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text + ' (dark current = ' + this.camera.custom.dc + 'e<sup>-</sup>/s/pix, read-out = ' + this.camera.custom.ro + 'e<sup>-</sup>/pix, QE = ' + this.camera.custom.qe + ', pixel size = ' + this.camera.custom.pxSize*1000000 + '&#181;m)';
      } else {
        this.r_ccd.innerHTML = this.ccd.options[this.ccd.selectedIndex].text;
      }
      if (this.filter.options[this.filter.selectedIndex].text === 'Custom band') {
        this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text + ' (&#955; = ' + this.band.custom.wavelength + '&#8491;, &#916;&#955; = ' + this.band.custom.bandwidth + '&#8491;, F = ' + this.band.custom.fluxPh + 'photon/s/cm<sup>2</sup>/&#8491;)';
      } else {
        this.r_filter.innerHTML = this.filter.options[this.filter.selectedIndex].text;
      }
      this.r_reducer.innerHTML = this.reducer.options[this.reducer.selectedIndex].text;
      this.r_binning.innerHTML = this.binning.options[this.binning.selectedIndex].text;
      this.r_transparentnost_elemenata.innerHTML = this.transparentnost_elemenata.value;
      this.r_transparentnost_neba.innerHTML = this.transparentnost_neba.value;
      this.r_sjaj_neba.innerHTML = this.sjaj_neba.value;
      this.r_seeing.innerHTML = this.seeing.value;
      this.r_magnituda.innerHTML = this.magnituda.value;
      this.r_signal_to_noise.innerHTML = this.signal_to_noise.value;

      this.s_sig.innerHTML = (this.eqParams.sig).toFixed(2);
      this.s_sky.innerHTML = (this.eqParams.sky).toFixed(2);
      this.s_dc.innerHTML = this.eqParams.dc;
      this.s_ro.innerHTML = this.eqParams.ro;
      this.s_pix.innerHTML = this.eqParams.n;
    },


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
        this.showGraphCB.checked ? this.canvas.classList.remove("collapsed"): this.canvas.classList.add("collapsed");
      }
    },


    getFnValues: function() {
      // dark current
      this.eqParams.dc = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].dc);
      // read-out noise
      this.eqParams.ro = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].ro);
      // quantum efficiency
      this.eqParams.qe = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].qe);
      // pixel size
      this.eqParams.pxSize = Number(this.camera[this.ccd.options[this.ccd.selectedIndex].value].pxSize);
      // binning
      this.eqParams.binning = Number(this.binning.value);
      // filter wavelength
      this.eqParams.wavelength = Number(this.band[this.filter.options[this.filter.selectedIndex].value].wavelength);
      // filter bandwidth
      this.eqParams.bandwidth = Number(this.band[this.filter.options[this.filter.selectedIndex].value].bandwidth);
      // filter flux (photon/A/m^2/s)
      this.eqParams.fluxPh = Number(this.band[this.filter.options[this.filter.selectedIndex].value].fluxPh*10000);
      // signal-to-noise
      this.eqParams.snr = Number(this.signal_to_noise.value);
      // telescope focalLength
      this.eqParams.focalLength = Number(this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].focalLength*this.reducer.value);
      // unobstructed area of main mirror in m^2
      this.eqParams.area = Number(Math.pow(this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].diameter,2)*Math.PI/4)*this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].effectiveAreaCoef;
      // camera resolution
      this.eqParams.res = Number((this.eqParams.binning*this.eqParams.pxSize*206265/this.eqParams.focalLength).toFixed(2));
      // number of pixels
      this.eqParams.n = Number((Math.pow(0.67*this.seeing.value/this.eqParams.res,2)*Math.PI).toFixed(2));
      // sky transparency
      this.eqParams.skyTransparency = Number(this.transparentnost_neba.value);
      // total transparency on all optical elements
      this.eqParams.totalTransparency = Number(this.transparentnost_elemenata.value);
      // object magnitude
      this.eqParams.mag = Number(this.magnituda.value);
      // sky magnitude
      this.eqParams.skyMag = Number(this.sjaj_neba.value);
      // signal
      this.eqParams.sig = Number(Math.pow(10, -1*this.eqParams.mag/2.5)*this.eqParams.fluxPh*this.eqParams.area*this.eqParams.skyTransparency*this.eqParams.totalTransparency*this.eqParams.qe*this.eqParams.bandwidth);
      // sky
      this.eqParams.sky = Number(Math.pow(10, -1*this.eqParams.skyMag/2.5)*this.eqParams.fluxPh*this.eqParams.area*this.eqParams.skyTransparency*this.eqParams.totalTransparency*this.eqParams.qe*this.eqParams.bandwidth*Math.pow(this.eqParams.res,2));
    },

    calculateExposure: function() {
      // signal
      var sig = this.eqParams.sig;
      // sky
      var sky = this.eqParams.sky;
      // dark current
      var dc = this.eqParams.dc;
      // read-out noise
      var ro = this.eqParams.ro;
      // number of pixels
      var n = this.eqParams.n;
      // signal-to-moise ratio
      var snr = this.eqParams.snr;

      this.eqParams.exposure = Number(((Math.pow(snr,2)*(sig+(sky+dc)*n)+Math.sqrt(Math.pow(snr,4)*Math.pow((sig+(sky+dc)*n),2)+4*Math.pow(sig*snr*ro,2)*n))/(2*Math.pow(sig,2))).toFixed(2));

      // ako je ekspozicija duža od 20 sekundi zaokruži vrednost
      if (this.eqParams.exposure > 20) {
        this.ekspozicija.innerHTML = Math.round(this.eqParams.exposure);
      } else {
        this.ekspozicija.innerHTML = this.eqParams.exposure;
      }

    },


    setXOffset: function(sn) {
      var ctx = this.canvas.getContext("2d");
      var txt = sn.toString();
      var txtWidth= ctx.measureText(txt).width;

      this.graph.xOffset = txtWidth + 5 < 20? 25: txtWidth + 5;
    },

    resetGraph: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      ctx.setTransform(1,0,0,1,0,0);
      ctx.strokeStyle = "#000";

      ctx.clearRect(0,0,width,height);
    },

    drawGraphLines: function() {
      var ctx = this.canvas.getContext("2d");
      var width = this.canvas.width;
      var height = this.canvas.height;

      this.setXOffset(Math.ceil(this.eqParams.snr*1.3));

      ctx.setTransform(1,0,0,-1,0,height);

      this.graph.broj_podeokaX = 0;
      this.graph.broj_podeokaY = 0;

      // jako bitno da bi kasnije mogli da obrišemo linije nacrtane lineTo() metodom
      ctx.beginPath();

      // koordinatne linije
      // x-osa
      ctx.moveTo(this.graph.xOffset,this.graph.yOffset + 10);
      ctx.lineTo(width - 30,this.graph.yOffset + 10);
      // y-osa
      ctx.moveTo(this.graph.xOffset + 10,this.graph.yOffset);
      ctx.lineTo(this.graph.xOffset + 10,height - 20);

      // podeoci na x osi
      for (var i = this.graph.xOffset + 10 + this.graph.podeokX; i <= width - 30; i += this.graph.podeokX) {
        ctx.moveTo(i,this.graph.yOffset+10);
        ctx.lineTo(i,this.graph.yOffset);
        this.graph.broj_podeokaX++;
      }

      // podeoci na y osi
      for (var j = this.graph.yOffset + 10 + this.graph.podeokY; j <= height - 20; j += this.graph.podeokY) {
        ctx.moveTo(this.graph.xOffset+10,j);
        ctx.lineTo(this.graph.xOffset,j);
        this.graph.broj_podeokaY++;
      }

      ctx.stroke();

      ctx.closePath();
    },

    addGraphValues: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      var n = 1;
      var m = 1;
      var t = this.eqParams.exposure;
      var snr = this.eqParams.snr;

      this.graph.upLimitX = Math.ceil(t*1.3);
      this.graph.upLimitY = Math.ceil(snr*1.3);

      ctx.setTransform(1,0,0,1,0,0);

      // oznake koordinatnih osa
      ctx.font = "16px sans-serif";
      ctx.fillText("S/N",this.graph.xOffset,15);
      ctx.fillText("t(s)",width-25,height-this.graph.yOffset-5);

      // koordinatni početak
      ctx.font = "10px sans-serif";
      ctx.fillText("0",3,height-this.graph.yOffset-5); // y-osa
      ctx.fillText("0",this.graph.xOffset+7,height-this.graph.yOffset+15); // x-osa

      // vrednosti na x osi
      if (this.graph.upLimitX > this.graph.broj_podeokaX) {
        while (this.graph.upLimitX%this.graph.broj_podeokaX !== 0) {
          this.graph.upLimitX++;
        }
        for (var j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 30; j += this.graph.podeokX) {
          ctx.moveTo(j,height-3);
          ctx.fillText(n*this.graph.upLimitX/this.graph.broj_podeokaX,j-5,height-this.graph.yOffset+15);
          n++;
        }
      } else {
        for (var j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 20; j += this.graph.podeokX) {
          ctx.moveTo(j,height-3);
          ctx.fillText((n*this.graph.upLimitX/this.graph.broj_podeokaX).toFixed(2),j-5,height-this.graph.yOffset+15);
          n++;
        }
      }

      // vrednosti na y osi
      if (this.graph.upLimitY > this.graph.broj_podeokaY) {
        while (this.graph.upLimitY%this.graph.broj_podeokaY !== 0) {
          this.graph.upLimitY++;
        }
        for (var j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
          ctx.moveTo(0,j);
          ctx.fillText(m*this.graph.upLimitY/this.graph.broj_podeokaY,3,j+10);
          m++;
        }
      } else {
        for (var j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
          ctx.moveTo(0,j);
          ctx.fillText((m*this.graph.upLimitY/this.graph.broj_podeokaY).toFixed(2),3,j+10);
          m++;
        }
      }
    },

    drawGraph: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      var scaleX = this.graph.podeokX*this.graph.broj_podeokaX/this.graph.upLimitX;
      var scaleY = this.graph.podeokY*this.graph.broj_podeokaY/this.graph.upLimitY;

      var sig = this.eqParams.sig;
      var sky = this.eqParams.sky;
      var dc = this.eqParams.dc;
      var ro = this.eqParams.ro;
      var n = this.eqParams.n;

      var snr = 0;

      ctx.setTransform(1,0,0,-1,this.graph.xOffset+11,height-this.graph.yOffset-11);
      ctx.beginPath();

      ctx.moveTo(0,0);

      if (this.graph.upLimitX !== 0) {
        for (var t = 0; t <= this.graph.upLimitX; t+= this.graph.upLimitX/this.graph.dataPointsNo) {
          snr = sig*t/Math.sqrt(sig*t+sky*n*t+dc*t*n+ro*ro*n);
          ctx.lineTo(t*scaleX,snr*scaleY);
        }
      }

      ctx.stroke();
      ctx.closePath();

      this.graph.drawn = true;

    },

    drawHelpLines: function() {
      var ctx = this.canvas.getContext("2d");
      var height = this.canvas.height;
      var width = this.canvas.width;

      var scaleX = this.graph.podeokX*this.graph.broj_podeokaX/this.graph.upLimitX;
      var scaleY = this.graph.podeokY*this.graph.broj_podeokaY/this.graph.upLimitY;

      var t = this.eqParams.exposure;
      var snr = this.eqParams.snr;

      ctx.setTransform(1,0,0,-1,this.graph.xOffset+11,height-this.graph.yOffset-11);
      ctx.beginPath();

      ctx.strokeStyle = "#bbb";

      ctx.moveTo(0,snr*scaleY-1);
      ctx.lineTo(this.canvas.width,snr*scaleY-1);
      ctx.moveTo(t*scaleX-1,0);
      ctx.lineTo(t*scaleX-1,this.canvas.width);

      ctx.stroke();
      ctx.closePath();

    },


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



  }

  // inicijalizacija
  kalkulator.init();

});
