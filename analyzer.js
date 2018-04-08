var playing = false;
var audio = document.getElementById('myAudio');
let parent = document.getElementById('bar_test');

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

  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(frequencyData);
     // render frame based on values in frequencyData

    for (i=1; i <= 12; i++){
      let node = document.getElementById("node".concat(i));
      node.setAttribute("style","height:" + frequencyData[i] + "px;");
    }
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
