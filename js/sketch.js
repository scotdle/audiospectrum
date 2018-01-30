
var recordPlayer;
var fft;
var volhistory = [];
var widthOfBand;
function setup() {
    createCanvas(1024,1024);
    angleMode(DEGREES);
    fft = new p5.FFT();
recordPlayer = new p5.AudioIn();
amplitude = new p5.FFT(0.9, 64);
widthOfBand = width / 64;
recordPlayer.start();

}


function draw() {
   var volumeLevel= recordPlayer.getLevel();
    fft.setInput(recordPlayer);
    volhistory.push(volumeLevel);
    background(0);
    stroke(255);
    noFill();
    var spectrum = fft.analyze();
    smooth(0.9);
    for(i = 0; i < spectrum.length; i++) {

      amplitude = spectrum[i];
      var y = map(amplitude, 0 , 256, height, 0);
      rect(i * widthOfBand, y, widthOfBand, height - y);

    }
    console.log(spectrum.length);


if(volhistory.length > 360) {
    volhistory.splice(0,1);
  }
}

