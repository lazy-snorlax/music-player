const musicContainer = document.getElementById('music_container');
const progressContainer = document.getElementById('progress_container');

const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const playlist = [
  ['sonicunleashedost', 'Endless Possiblities'],
  ['sonicunleashedost', 'My Hero Academia OST - You Say Run']
];

// Keep track of playlist index
let trackIndex = 1;

// Initially load track details into DOM
loadTrack(playlist[trackIndex][trackIndex]);

// Update track details
function loadTrack(track) {
  title.innerText = track;
  // audio.src = `music/${track[2]}.mp3`;
  // cover.src = `images/${track[1]}.png`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
