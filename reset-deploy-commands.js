require('dotenv').config();
const { REST, Routes } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Removendo todos os comandos globais...');

    // Coloca array vazio para deletar todos os comandos globais
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: [] },
    );

    console.log('Todos os comandos globais foram removidos com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();
