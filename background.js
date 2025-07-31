body, html {
  height: 100%;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #0b1d38;
  overflow: hidden;
  color: #f1f1f1;
  position: relative;
}

/* Basit yıldızlar */
body::before {
  content: '';
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    radial-gradient(2px 2px at 10% 20%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 30% 40%, #eee, transparent),
    radial-gradient(1px 1px at 70% 60%, #ddd, transparent),
    radial-gradient(2px 2px at 90% 80%, #fff, transparent);
  background-repeat: repeat;
  background-size: 100px 100px;
  z-index: 0;
  pointer-events: none;
}
