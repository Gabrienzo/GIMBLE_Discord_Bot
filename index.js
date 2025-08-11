// Requer as classes do discord.js de que precisamos
const { Client, GatewayIntentBits } = require('discord.js');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria uma nova instância do Cliente
// Intents são as permissões que o bot precisa para funcionar
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Quando o cliente estiver pronto, execute este código (apenas uma vez)
client.once('ready', () => {
    console.log(`Bot pronto! Logado como ${client.user.tag}`);
});

// Escuta por novas mensagens
client.on('messageCreate', message => {
    // Ignora mensagens de outros bots para não criar loops
    if (message.author.bot) return;

    // Responde "pong!" se a mensagem for "ping"
    if (message.content === 'ping') {
        message.reply('pong!');
    }
});

// Faz o login no Discord com o token do seu cliente
client.login(process.env.DISCORD_TOKEN);