const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../../musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Adiciona uma música à fila')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('URL do YouTube')
        .setRequired(true)
    ),
  async execute(interaction) {
    const url = interaction.options.getString('url');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❌ Você precisa estar em um canal de voz!', ephemeral: true });
    }

    try {
      await musicPlayer.addToQueue(url, voiceChannel);
      await interaction.reply(`🎵 Adicionado à fila: ${url}`);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Erro ao tocar a música.', ephemeral: true });
    }
  }
};
