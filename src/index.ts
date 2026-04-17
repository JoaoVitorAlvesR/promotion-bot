import { Client, LocalAuth, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { matchFilter } from "./match-filter";
import "dotenv/config";
import notifier from "node-notifier";

if (!process.env.PHONE_NUMBER || !process.env.GROUP_ID) {
  throw new Error("Variáveis de ambiente não definidas");
}

function notify(msg: string) {
  notifier.notify({
    title: "Produto encontrado!",
    message: msg,
  });
}

const PHONE_NUMBER = process.env.PHONE_NUMBER!;
const GROUP_ID = process.env.GROUP_ID!;

const client = new Client({
  authStrategy: new LocalAuth(),
});

let myContactId: string | null = null;

client.on("qr", (qr) => {
  console.log("Escaneie o QR Code:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("✅ Bot conectado!");
  const contact = await client.getNumberId(PHONE_NUMBER);

  if (contact) {
    myContactId = contact._serialized;
  }
});

client.on("message", async (msg: Message) => {
  try {
    if (!msg.from.endsWith("@g.us")) return;
    // console.log("msg", msg.from);
    const text = msg.body.toLowerCase();

    const result = matchFilter(text);
    if (!result) return;

    const { filter, price } = result;

    let groupName = "Grupo desconhecido";

    try {
      const chat = await msg.getChat();
      groupName = chat.name;
    } catch {}

    console.log("achado", filter.name);

    notify(filter.name);
    const message = `🔥 ${filter.name} encontrado!
📦 ${msg.body}
📍 ${groupName}
    `;

    if (myContactId) {
      await client.sendMessage(myContactId, message);
    }

    await client.sendMessage(GROUP_ID, message);
  } catch (err) {
    console.error("Erro:", err);
  }
});

client.initialize();
