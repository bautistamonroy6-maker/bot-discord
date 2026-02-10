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
const CANAL_REPORTE_ID = '1419447360802525215';
const PLANTILLA_CAMPOS = [
  'Nick tuyo:',
  'Nick del acusado:',
  'Explicacion breve de lo sucedido:',
  'Pruebas (Rec, video, screenshot, etc...)'
];

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
    `**¡Pasate por #146543214664981309 para orientacion! 💪**`
  );
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CANAL_REPORTE_ID) return;

  const contenido = message.content || '';
  const faltaCampo = PLANTILLA_CAMPOS.some((campo) => !contenido.includes(campo));

  if (!faltaCampo) return;

  await message.reply(
    `${message.author} tu reporte no tiene la plantilla completa. ` +
    `Por favor usa esta plantilla:\n\n` +
    `Nick tuyo:\n\n` +
    `Nick del acusado:\n\n` +
    `Explicacion breve de lo sucedido:\n\n` +
    `Pruebas (Rec, video, screenshot, etc...)`
  );
});

client.login(process.env.TOKEN);


