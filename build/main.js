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
      podeokY: 45
    },
    eqParams: {
      sig: 0,
      sky: 0,
      dc: 0,
      rn: 0,
      qe: 0,
      wavelength: 0,
      bandwidth: 0,
      fluxPh: 0,
      skyTransparency: 0,
      totalTransparency: 0,
      pxSize: 0,
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
        focalLength: 6
      },
      nasmyth: {
        diameter: 1.4,
        focalLength: 11.2
      }
    },
    camera: {
      apogeeU42: {
        dc: 1,
        rn: 10,
        qe: 0.9,
        pxSize: 13.5e-6
      },
      apogeeE47: {
        dc: 0.1,
        rn: 10,
        qe: 0.96,
        pxSize: 13e-6
      },
      iKonL: {
        dc: null,
        rn: null,
        qe: 0.95,
        pxSize: 13.5e-6
      },
      iXon897: {
        dc: null,
        rn: null,
        qe: 0.925,
        pxSize: 16e-6
      },
      sbigst10xme: {
        dc: null,
        rn: null,
        qe: 0.85,
        pxSize: 6.8e-6
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
        fluxJY: 0,
        fluxPh: 0
      },
      'Ha-kontinuum': {
        wavelength: 6452,
        bandwidth: 50,
        fluxJY: 0,
        fluxPh: 0
      },
      '[SII]': {
        wavelength: 6726,
        bandwidth: 50,
        fluxJY: 0,
        fluxPh: 0
      }
    },


    init: function() {
      this.cacheDom();
      this.bindEvent('click', this.submit, this.execute.bind(this));
    },

    bindEvent: function(event, target, callback) {
      target.addEventListener(event, callback);
    },


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
      this.r_sky = document.querySelector('.r_sky');
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
      this.r_sky.innerHTML = (this.eqParams.sky).toFixed(2);
      this.s_dc.innerHTML = this.eqParams.dc;
      this.s_ro.innerHTML = this.eqParams.rn;
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
        this.result.classList.remove("collapsed");
      }
    },


    getFnValues: function() {
      // dark current
      this.eqParams.dc = this.camera[this.ccd.options[this.ccd.selectedIndex].value].dc;
      // read-out noise
      this.eqParams.rn = this.camera[this.ccd.options[this.ccd.selectedIndex].value].rn;
      // quantum efficiency
      this.eqParams.qe = this.camera[this.ccd.options[this.ccd.selectedIndex].value].qe;
      // pixel size
      this.eqParams.pxSize = this.camera[this.ccd.options[this.ccd.selectedIndex].value].pxSize;
      // filter wavelength
      this.eqParams.wavelength = this.band[this.filter.options[this.filter.selectedIndex].value].wavelength;
      // filter bandwidth
      this.eqParams.bandwidth = this.band[this.filter.options[this.filter.selectedIndex].value].bandwidth;
      // filter flux (photon/A/m^2/s)
      this.eqParams.fluxPh = this.band[this.filter.options[this.filter.selectedIndex].value].fluxPh*10000;
      // signal-to-noise
      this.eqParams.snr = Number(this.signal_to_noise.value);
      // telescope focalLength
      this.eqParams.focalLength = this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].focalLength*this.reducer.value;
      // unobstructed area of main mirror in m^2
      this.eqParams.area = Math.pow(this.telescope[this.teleskop.options[this.teleskop.selectedIndex].value].diameter,2)*Math.PI/4;
      // camera resolution
      this.eqParams.res = Number((this.eqParams.pxSize*206265/this.eqParams.focalLength).toFixed(2));
      // number of pixels
      this.eqParams.n = Number((Math.pow(0.67*this.seeing.value,2)*Math.PI/this.eqParams.res).toFixed(2));
      // sky transparency
      this.eqParams.skyTransparency = Number(this.transparentnost_neba.value);
      // total transparency on all optical elements
      this.eqParams.totalTransparency = Number(this.transparentnost_elemenata.value);
      // object magnitude
      this.eqParams.mag = Number(this.magnituda.value);
      // sky magnitude
      this.eqParams.skyMag = Number(this.sjaj_neba.value);
      // signal
      this.eqParams.sig = Math.pow(10, -1*this.eqParams.mag/2.5)*this.eqParams.fluxPh*this.eqParams.area*this.eqParams.skyTransparency*this.eqParams.totalTransparency*this.eqParams.qe*this.eqParams.bandwidth;
      // sky
      this.eqParams.sky = Math.pow(10, -1*this.eqParams.skyMag/2.5)*this.eqParams.fluxPh*this.eqParams.area*this.eqParams.skyTransparency*this.eqParams.totalTransparency*this.eqParams.qe*this.eqParams.bandwidth*Math.pow(this.eqParams.res,2);
    },

    calculateExposure: function() {
      // signal
      var sig = this.eqParams.sig;
      // sky
      var sky = this.eqParams.sky;
      // dark current
      var dc = this.eqParams.dc;
      // read-out noise
      var rn = this.eqParams.rn;
      // number of pixels
      var n = this.eqParams.n;
      // signal-to-moise ratio
      var snr = this.eqParams.snr;

      this.eqParams.exposure = ((Math.pow(snr,2)*(sig+(sky+dc)*n)+Math.sqrt(Math.pow(snr,4)*Math.pow((sig+(sky+dc)*n),2)+4*Math.pow(sig*snr,2)*rn*n))/(2*Math.pow(sig,2))).toFixed(2);

      // ako je ekspozicija duža od 20 sekundi zaokruži vrednost
      if (this.eqParams.exposure > 20) {
        this.eqParams.exposure = Math.round(this.eqParams.exposure);
      }

      this.ekspozicija.innerHTML = this.eqParams.exposure;

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
        for (let j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 20; j += this.graph.podeokX) {
          ctx.moveTo(j,height-3);
          ctx.fillText(n*this.graph.upLimitX/this.graph.broj_podeokaX,j-5,height-this.graph.yOffset+15);
          n++;
        }
      } else {
        for (let j = this.graph.xOffset + 10 + this.graph.podeokX; j < width - 20; j += this.graph.podeokX) {
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
        for (let j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
          ctx.moveTo(0,j);
          ctx.fillText(m*this.graph.upLimitY/this.graph.broj_podeokaY,3,j+10);
          m++;
        }
      } else {
        for (let j = height - 15 - this.graph.yOffset - this.graph.podeokY; j > 20; j -= this.graph.podeokY) {
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
      var rn = this.eqParams.rn;
      var n = this.eqParams.n;

      var snr = 0;

      ctx.setTransform(1,0,0,-1,this.graph.xOffset+11,height-this.graph.yOffset-11);
      ctx.beginPath();

      ctx.moveTo(0,0);

      if (this.graph.upLimitX !== 0) {
        for (let t = 0; t <= this.graph.upLimitX; t+= this.graph.upLimitX/this.graph.dataPointsNo) {
          snr = sig*t/Math.sqrt(sig*t+sky*n*t+dc*t*n+rn*n);
          ctx.lineTo(t*scaleX,snr*scaleY);
        }
      }

      ctx.stroke();
      ctx.closePath();

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
