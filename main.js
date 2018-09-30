function preload() {
  song = loadSound("song.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude(0.3);
  filter = new p5.BandPass();

  //   DISCONNECT UNWANTED FREQUENCIES
  song.disconnect();

  //   CONNECT FX
  song.connect(filter);

  //   JUMP TO 55s INTO THE SONG
  song.jump(55);
}

function draw() {
  background(0);

  //   MOUSE CURSOR
  fill(255);
  ellipse(mouseX, mouseY, 10);

  //   FREQ (WHICH FREQ IS HIGH)
  let mappedfreq = map(mouseX, 0, windowWidth, 0, 10000);
  filter.freq(Math.floor(mappedfreq));

  //   RESOLUTION (FOCUS)
  mappedRes = map(mouseY, 10, windowHeight, 0, 4);
  console.log(filter.res(Math.floor(mappedRes)));

  var centerX = windowWidth / 2;
  var centerY = windowHeight / 2;

  //   GET LEVEL, USED FOR VISUALIZATION (FOR SIZE OF OBJECT)
  var level = amp.getLevel();

  //   VISUALIZER
  fill(random(0, 255), random(0, 255), random(0, 255));
  ellipse(centerX - 300, centerY, (level * 500) / 1.5);
  ellipse(centerX, centerY, level * 500);
  ellipse(centerX + 300, centerY, (level * 500) / 1.5);

  //   Display text
  fill(255);
  text("Left to Right = Freq Focus", 0, 10);
  text("Up to Down = Freq Bandwith", 0, 25);
  text("Frequency Bandwidth (How Wide): " + Math.floor(mappedRes), 0, 40);
  text(
    "Frequency Focus (Which frequencies are high): " + Math.floor(mappedfreq),
    0,
    55
  );

  song.onended(function() {
    song.jump(55);
  });
}
