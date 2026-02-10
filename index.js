require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

// ===== CONFIGURACIÓN =====
const CANAL_ORIGEN_ID = '1419319563178344468';
const CANAL_DESTINO_ID = '1419808985552257085';
const EMOJI = '✅';

// ===== BOT LISTO =====
client.once('ready', () => {
  console.log(`Conectado como ${client.user.tag}`);
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch {
      return;
    }
  }

  const message = reaction.message;

  // Validaciones
  if (reaction.emoji.name !== EMOJI) return;
  if (message.channel.id !== CANAL_ORIGEN_ID) return;

  const canalDestino = await client.channels.fetch(CANAL_DESTINO_ID);
  const autor = message.author;

  await canalDestino.send(
    `# 🎉 **¡Bienvenido/a al staff!** 🎉\n\n` +
    `**${autor} fue aprobado y ahora forma parte del staff.\n**` +
    `**¡Pasate por #1465432146649813092 para orientacion! 💪**`
  );
});

client.login(process.env.TOKEN);
