const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../../musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Para a música e limpa a fila'),
  async execute(interaction) {
    musicPlayer.stop();
    await interaction.reply('🛑 Música parada e fila limpa.');
  }
};
