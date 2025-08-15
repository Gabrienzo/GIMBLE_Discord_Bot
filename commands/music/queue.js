const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const musicPlayer = require('../../musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Mostra a fila de músicas com barra de progresso e tempos'),
  async execute(interaction) {
    if (musicPlayer.queue.length === 0) {
      return interaction.reply({ content: '📭 A fila está vazia.', ephemeral: true });
    }

    const current = musicPlayer.queue[0];
    const elapsed = Math.floor((Date.now() - (current.startTime || Date.now())) / 1000);
    const total = current.duration;
    const remaining = Math.max(0, total - elapsed);

    const progress = musicPlayer.progressBar(elapsed, total, 20);

    const nextSongs = musicPlayer.queue.slice(1)
      .map((song, index) => `\`${index + 1}\` ${song.title}`)
      .join('\n') || 'Nenhuma música na fila.';

    const embed = new EmbedBuilder()
      .setColor('#1DB954')
      .setTitle(`🔊 Tocando agora: ${current.title}`)
      .setURL(current.url)
      .setThumbnail(current.thumbnail)
      .setDescription(
        `${progress} ${musicPlayer.formatTime(elapsed)} / ${musicPlayer.formatTime(total)}\n` +
        `⏳ Restante: ${musicPlayer.formatTime(remaining)}`
      )
      .addFields(
        { name: 'Fila:', value: nextSongs }
      )
      .setFooter({ text: `Total na fila: ${musicPlayer.queue.length} música(s)` });

    await interaction.reply({ embeds: [embed] });
  }
};
