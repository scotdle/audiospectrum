
var recordPlayer;
var fft;
var volhistory = [];
var widthOfBand;


function setup() {

    var audioCanvas = document.getElementById('audiocanvas');
    var width = audioCanvas.offsetWidth;
  var audioSpectrum = createCanvas(width, 500);
    angleMode(DEGREES);
    fft = new p5.FFT();
recordPlayer = new p5.AudioIn();
amplitude = new p5.FFT(0.99, 64);
widthOfBand = width / 64;
recordPlayer.start();
audioSpectrum.parent('audiocanvas');




}


function draw() {
   var volumeLevel= recordPlayer.getLevel();
    fft.setInput(recordPlayer);
    volhistory.push(volumeLevel);
    background('#282828');
    stroke(0);
fill('#1ED760');
    var spectrum = fft.analyze();
    smooth(0.9);
    for(i = 0; i < spectrum.length; i++) {

      amplitude = spectrum[i];
      var y = map(amplitude, 0 , 500, height, 0);
      rect(i * widthOfBand, y, widthOfBand, height - y);

    }
    getAudioContext().resume();

}


