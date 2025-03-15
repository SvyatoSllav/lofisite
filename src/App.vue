<template>
  <div class="music-player__wrapper">
    <div class="music-player">
      <div class="music-player__cover">
        <img src="./assets/lofi.jpg" alt="Album Cover" class="music-player__cover-image">
      </div>
      <div class="music-player__info">
        <h2 class="music-player__title">{{ currentSong.title }}</h2>
        <p class="music-player__artist">{{ currentSong.artist }}</p>
      </div>
      <audio ref="audioPlayer" :src="audioSrc" class="music-player__audio"></audio>
      <div class="music-player__controls">
        <button @click="playPause" class="music-player__control-button">
          <pauseIcon color="#000" width="25" height="25" v-show="isPlaying" />
          <playIcon width="25" height="25" v-show="!isPlaying" />
        </button>
      </div>
      <p v-if="error" class="music-player__error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import pauseIcon from '@src/assets/pause.svg'
import playIcon from '@src/assets/play.svg'
import axios from 'axios';

export default {
  components: {
    pauseIcon,
    playIcon,
  },
  data() {
    return {
      currentSong: {
        title: 'From Me to You - Mono / Remast',
        artist: 'BEAUTIES',
      },
      audioSrc: null, // Blob URL for the audio file
      isPlaying: false,
      error: null,
    };
  },
  async created() {
    await this.fetchRandomMusic();
  },
  methods: {
    async fetchRandomMusic() {
      try {
        // Fetch the audio file as a binary response
        const response = await axios.get('http://213.171.5.141/music/random/', {
          responseType: 'blob', // Important: Fetch as a binary blob
        });

        // Create a Blob URL from the binary data
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        this.audioSrc = URL.createObjectURL(blob);

        console.log('Audio Blob URL:', this.audioSrc); // Debugging
      } catch (err) {
        this.error = 'Failed to fetch music.';
        console.error(err);
      }
    },
    playPause() {
      const audio = this.$refs.audioPlayer;

      audio.addEventListener('error', (err) => {
        this.error = 'Failed to load or play music.';
        console.error('Audio error:', err);
      });

      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => {
          this.error = 'Failed to play music.';
          console.error(err);
        });
      }
      this.isPlaying = !this.isPlaying;
    },
  },
};
</script>

<style scoped lang="scss">
.music-player {
  max-width: 400px;
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #962419 0%, #661710 44.79%, #430E09 100%);
  }
}

.music-player__cover {
  margin-bottom: 20px;
}

.music-player__cover-image {
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 6px solid #4b110c;
}

.music-player__info {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}

.music-player__title {
  font-size: 24px;
  margin: 0;
}

.music-player__artist {
  font-size: 16px;
  color: #fff;
  margin: 0;
}

.music-player__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
}

.music-player__control-button {
  width: 67px;
  height: 67px;
  border-radius: 50%;
  background-color: #fff;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.music-player__error {
  color: red;
  text-align: center;
}
</style>