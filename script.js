const musicContainer = document.getElementById('music_container');
const progressContainer = document.getElementById('progress_container');
const playlistContainer = document.getElementById('playlist-container');

const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const playListEl = document.getElementById('list');

const playlist = [
  ['sonicunleashedost', 'Endless Possibilities'],
  ['my hero acadamia - you say run', 'My Hero Academia OST - You Say Run'],
  [
    'spiderverse',
    "Blackway & Black Caviar - What's Up Danger (Spider-Man_ Into the Spider-Verse) [Official Audio]"
  ]
];

// Keep track of playlist index
let trackIndex = 0;

// Track currently playing
let trackTitle = '';

// Track duration
let trackDuration = '';

// Initially load track details into DOM
loadTrack(playlist[trackIndex]);

// Initially load playlist into DOM
loadPlayList(playlist);

// Update track details
function loadTrack(track) {
  if (track[0] != '') {
    cover.src = `images/${track[0]}.png`;
  } else {
    cover.src = '';
  }
  audio.src = `music/${track[1]}.mp3`;
  title.innerText = track[1];
  trackTitle = track[1];
}

// Load playlist
function loadPlayList(playlist) {
  for (let i = 0; i < playlist.length; i++) {
    coverLocal = playlist[i][0];
    trackLocal = playlist[i][1];

    // Create cover element
    const itemCover = document.createElement('div');
    itemCover.classList = 'track-cover';
    const image = document.createElement('img');
    image.src = `images/${coverLocal}.png`;
    image.alt = 'cover-art';
    itemCover.appendChild(image);

    // Create track element
    const itemTrack = document.createElement('div');
    itemTrack.classList = 'track-title';
    itemTrack.innerText = trackLocal;

    // Create duration element
    const itemDuration = document.createElement('div');
    itemDuration.classList = 'item-duration';

    // Append elements to li
    const item = document.createElement('li');
    item.appendChild(itemCover);
    item.appendChild(itemTrack);
    item.appendChild(itemDuration);

    // Append li to ul
    playListEl.appendChild(item);
  }
}

// Update Playlist with currently playing track
function updatePlayList() {
  let trackTitles = [];
  trackTitles = document.querySelectorAll('.track-title');

  trackTitles.forEach(div => {
    if (div.innerText == trackTitle) {
      div.parentElement.classList = 'playing';
    } else {
      div.parentElement.classList = '';
    }
  });
}

// Play Track
function playTrack() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
  updatePlayList();
}

// Pause Track
function pauseTrack() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
}

// Next Track
function nextTrack() {
  trackIndex++;
  if (trackIndex > playlist.length - 1) {
    trackIndex = 0;
  }
  // console.log(trackIndex);
  loadTrack(playlist[trackIndex]);
  playTrack();
}

// Previous Track
function previousTrack() {
  trackIndex--;
  if (trackIndex < 0) {
    trackIndex = playlist.length - 1;
  }
  // console.log(trackIndex);
  loadTrack(playlist[trackIndex]);
  playTrack();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Set track from playlist
function setTrack(e) {
  console.log(e);
}

// Event Listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

// Previous Song
prevBtn.addEventListener('click', previousTrack);

// Next Song
nextBtn.addEventListener('click', nextTrack);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Click on playlist
playlistContainer.addEventListener('click', setTrack);

// Track ends
audio.addEventListener('ended', nextTrack);
