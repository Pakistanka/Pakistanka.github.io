const StarSky = {

  Config: {

    nightBack: null,
    top: 0,
    left: 0,
    maxStars: 1000,
    angle: 0,

  },

  Data: {

    Layer2: null,
  },

  Rotate: {

    Data: {

      angle: 0,
      angleStep: 0.01,
      interval: 10,
    },

    init: function() {

      setInterval(this.step, this.Data.interval)
    },

    getAngle: function() {
      if(this.Data.angle >= 360){
        this.Data.angle = 0;
      }
      this.Data.angle += this.Data.angleStep;
      return this.Data.angle;
    },

    step: function() {

      let layer = StarSky.Data.Layer2;

      layer.style.transform = 'rotate(' + StarSky.Rotate.getAngle() + 'deg)';
    },
  },

  init: function() {

    this.Config.nightBack = document.getElementsByTagName('body')[0];
    this.showStars();
    this.Rotate.init();
  },

  showStars: function() {

    let maxStar = this.Config.maxStars;
    let container = this.Config.nightBack;

    let layer_1 = document.createElement('div');
    layer_1.classList.add('layer_1');

    let layer_2 = document.createElement('div');
    layer_2.classList.add('layer_2');

    let skyWidth = window.innerWidth;
        skyHeight = window.innerHeight;
        diagonal = Math.sqrt(Math.pow(skyWidth, 2) + Math.pow(skyHeight, 2));



    let deltaWidth = -(diagonal - skyWidth) / 2;
        deltaHeight = -(diagonal - skyHeight) / 2;

        layer_2.style.height = diagonal + "px";
        layer_2.style.width = diagonal + "px";

        layer_2.style.top = deltaHeight + 'px';
        layer_2.style.left = deltaWidth + 'px';


      for(let i = 1; i < maxStar; i++) {

        let star = document.createElement('div');
        star.classList.add('star');

        let left = Math.round(Math.random() * diagonal)  + 'px';
        let top = Math.round(Math.random() * diagonal)  + 'px';

        star.style.left = left;
        star.style.top = top;


        let starColor = function(){
          let letters = 'ABCDE'.split('');
          let color = '#';
          for (let j = 0; j < 3; j++) {
            color += letters[Math.floor(Math.random() * letters.length)];
          }
          return color;
        }

        star.style.backgroundColor = starColor();
          // container.addEventListener('mousemove', function(e){
          //   let pageX = e.clientX,
          //       pageY = e.clientY;
          //
          //   layer_1.style.transform = 'translateX(' + pageX/1000 + '%) translateY(' + pageY/100 + '%)';
          //   layer_2.style.transform = 'translateX(' + pageX/1500 + '%) translateY(' + pageY/250 + '%)';
          //
          //   container.style = 'background-position:' + pageX/2000 + 'px center';
          // })


          layer_2.appendChild(star);
      }

    document.body.appendChild(layer_1);
    document.body.appendChild(layer_2);

    this.Data.Layer2 = layer_2;
  }

}

StarSky.init();
