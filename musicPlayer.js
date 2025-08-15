const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const play = require("play-dl");

class MusicPlayer {
  constructor() {
    this.queue = [];
    this.isPlaying = false;
    this.connection = null;
    this.player = createAudioPlayer();

    // Quando terminar a música
    this.player.on(AudioPlayerStatus.Idle, () => {
      this.queue.shift();
      if (this.queue.length > 0) {
        this.playNext();
      } else {
        this.isPlaying = false;
        this.connection.destroy();
        this.connection = null;
      }
    });
  }

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  progressBar(currentSec, totalSec, size = 20) {
    const filledLength = Math.round((currentSec / totalSec) * size);
    const emptyLength = size - filledLength;
    return `[${"█".repeat(filledLength)}${"─".repeat(emptyLength)}]`;
  }

  async playNext() {
    if (this.queue.length === 0) return;

    const url = this.queue[0];
    const stream = await play.stream(url);
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });
    this.player.play(resource);
    this.isPlaying = true;
  }

  async addToQueue(url, voiceChannel) {
    const info = await play.video_basic_info(url);
    const songData = {
      url,
      title: info.video_details.title,
      thumbnail: info.video_details.thumbnails[0].url,
      duration: info.video_details.durationInSec, // duração total em segundos
    };

    this.queue.push(songData);

    if (!this.isPlaying) {
      this.connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
      this.connection.subscribe(this.player);
      await this.playNext();
    }
  }

  async playNext() {
    if (this.queue.length === 0) return;

    const song = this.queue[0];
    const stream = await play.stream(song.url);
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    song.startTime = Date.now();
    this.player.play(resource);
    this.isPlaying = true;
  }

  pause() {
    this.player.pause();
  }

  resume() {
    this.player.unpause();
  }

  skip() {
    this.player.stop();
  }

  stop() {
    this.queue = [];
    this.player.stop();
    if (this.connection) {
      this.connection.destroy();
      this.connection = null;
    }
    this.isPlaying = false;
  }
}

module.exports = new MusicPlayer();
