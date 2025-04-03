let audioContext;
let soundSource;
let soundBuffer;
let isSoundPlaying = false;
let selectedSound = null;

const soundFiles = {
    rain: "rain.mp3",
    fireplace: "fireplace.mp3",
    brownNoise: "brownnoise.mp3"
};

function initAudio(){
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.error("Not supported");
    }
}

async function loadSound(soundName){
    if(!audioContext) initAudio();
    
    try{
        const response = await fetch(soundFiles[soundName]);
        const arrayBuffer = await response.arrayBuffer();
        soundBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log(`${soundName} Loaded`);
        return true;
    }catch (error){
        console.error("Error:", error);
        return false;
    }
}

function playSound(){
    if (!soundBuffer || !audioContext){
        return;
    }     
    stopSound();
    
    soundSource = audioContext.createBufferSource();
    soundSource.buffer = soundBuffer;
    soundSource.loop = true;
    soundSource.connect(audioContext.destination);
    soundSource.start();
    isSoundPlaying = true;
}

function stopSound(){
    if (soundSource && isSoundPlaying){
        soundSource.stop();
        isSoundPlaying = false;
    }
}

function setupSoundSelection() {
    const soundButtons = document.querySelectorAll(".sound-item");
    
    soundButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const soundName = button.dataset.sound;
            selectedSound = soundName;
            await loadSound(soundName);
        });
    });
}

async function selectSound(soundName){
    selectedSound = soundName;
    await loadSound(soundName);
}

window.soundControls = {
    startSound:function(){ 
        if(selectedSound){
            playSound();
        }
    },
    stopSound:function(){
        stopSound();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", () => {
        if(!audioContext){
            initAudio();
        }
    },{once:true});
    
    setupSoundSelection();
});