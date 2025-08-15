const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../../musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pausa a música atual'),
  async execute(interaction) {
    musicPlayer.pause();
    await interaction.reply('⏸ Música pausada.');
  }
};
