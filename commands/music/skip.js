const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../../musicPlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Pula para a próxima música'),
  async execute(interaction) {
    musicPlayer.skip();
    await interaction.reply('⏭ Música pulada.');
  }
};
