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
