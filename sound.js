let audioContext; //Handels audio sound
let soundSource; //Playing Sound
let soundBuffer; //Loading sound data
let soundPlaying = false; //Check if sound is palaying
let selectedSound = null; //Checks the sound file selected

//Library consisting the sounds
const soundFiles = {
    rain: "rain.mp3",
    fireplace: "fireplace.mp3",
    brownNoise: "brownnoise.mp3"
};

//Initialises the web API audio
function audio(){
    try{
        audioContext = new (window.AudioContext || window.webkitAudioContext)(); //Creates audioContext with browser support
    }catch(e) {
        console.error("Not supported"); //If sounds is not supported
    }
}


//Loads sounds files from the server and decodes into a buffer
async function loadSound(soundName){
    if(!audioContext) audio(); //Initialises audioContext if it doesn't exits
    
    try{
        const response = await fetch(soundFiles[soundName]); //Fetches sounds file
        const arrayBuffer = await response.arrayBuffer(); //Converts arrway buffer for audio
        soundBuffer = await audioContext.decodeAudioData(arrayBuffer); //Decodes the audio into playable format
        console.log(`${soundName} Loaded`);
        return true;
    }catch (error){
        console.error("Error:", error);
        return false;
    }
}

//Plays and stops loaded sound
function playSound(){
    if (!soundBuffer || !audioContext){ //Doesn't play sound if none is loaded
        return;
    }     
    stopSound(); //Stops playing any current sound
    
    soundSource = audioContext.createBufferSource(); //Creates new audio source
    soundSource.buffer = soundBuffer; //Assigns loaded buffer
    soundSource.loop = true; //Sounds plays in a continous loop
    soundSource.connect(audioContext.destination); //Connects the audio to speakers
    soundSource.start(); //Plays sound
    soundPlaying = true; //Boolean value for soundplaying
}

//Stops playing any current sound
function stopSound(){
    //Only stops sound if theres an active sound playing
    if (soundSource && soundPlaying){
        soundSource.stop();
        soundPlaying = false;
    }
}

//Sound selection buttons and UI
function setupSoundSelection() {
    const soundButtons = document.querySelectorAll(".sound-item"); //Gets all elements with class "sound-item"
    
    soundButtons.forEach(button => { //Handler for buttons
        button.addEventListener("click", async () => {
            const soundName = button.dataset.sound; //Gets the sound selected
            selectedSound = soundName; //Updates selected sound
            await loadSound(soundName); ///loads selected sound
        });
    });
}

//Selects and loads a sound
async function selectSound(soundName){
    selectedSound = soundName;
    await loadSound(soundName);
}

//Sound control function to global scope to interact with the UI
window.soundControls = {
    startSound:function(){ //Starts the playback of the selected sound
        if(selectedSound){
            playSound();
        }
    },
    stopSound:function(){ //Stops currently playing sounds
        stopSound();
    }
};

//Initialises DOM
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", () => { //Handler to initialise the audio context
        if(!audioContext){
            audio();
        }
    },{once:true}); //ensures the audios is only ran once
    
    setupSoundSelection();
});