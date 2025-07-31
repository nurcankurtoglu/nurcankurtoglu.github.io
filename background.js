/* Dynamic Stars Background */

#stars, #stars2, #stars3 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
  z-index: 0;
}

#stars {
  background: url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/star.png');
  animation: moveStars 200s linear infinite;
  opacity: 0.4;
}

#stars2 {
  background: url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/star.png');
  animation: moveStars 400s linear infinite;
  opacity: 0.3;
}

#stars3 {
  background: url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/star.png');
  animation: moveStars 600s linear infinite;
  opacity: 0.2;
}

@keyframes moveStars {
  from { transform: translateY(0); }
  to { transform: translateY(-1000px); }
}
