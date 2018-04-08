var playing = false;
var audio = document.getElementById('myAudio');
var test = document.getElementById('test');

function play() {
  var ctx = new AudioContext();
  var audioSrc = ctx.createMediaElementSource(audio);
  var analyser = ctx.createAnalyser();
  // we have to connect the MediaElementSource with the analyser
  audioSrc.connect(analyser);
  audioSrc.connect(ctx.destination);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

  // frequencyBinCount tells you how many values you'll receive from the analyser
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // we're ready to receive some data!
  // loop
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData
     let x1 = frequencyData[0];
     let y1 =frequencyData[1];
     let color1 = "#" + frequencyData[0] + "0" ;
     let color2 = "#" + frequencyData[1] + "0" ;
     console.log(frequencyData);
     test.setAttribute("style","width:" + x1 + "vw;height:" + x1+"vh;background-color:" + color1);
  }

  audio.play();
  playing = true;
  renderFrame();
}


function stopping(){
  if (playing === true){
    audio.pause();
    playing = false;
  }
}
