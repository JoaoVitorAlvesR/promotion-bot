# 🤖 Promotion Bot — WhatsApp

> Bot em **TypeScript + Node.js** que monitora grupos do WhatsApp e encontra promoções automaticamente com base em filtros inteligentes.

> Para conectar o bot, é necessário escanear o QR Code com o WhatsApp, assim como no WhatsApp Web.

> É recomendável participar de alguns grupos de promoções, pois o bot irá monitorar as mensagens desses grupos para identificar ofertas. Esses grupos podem ficar arquivados, não sendo necessário acompanhar manualmente.
---

## ✨ Funcionalidades

- 📡 Monitoramento em tempo real de grupos do WhatsApp
- 🔍 Filtros inteligentes com regras `required` + `oneOf`
- 💰 Detecção automática de preços no formato `R$`
- 📩 Notificações automáticas ao encontrar uma promoção
- ⚡ Código leve, limpo e fácil de estender

---

## 🚀 Demonstração

Quando uma promoção é encontrada, o bot envia uma mensagem como esta:

```
🔥 OPORTUNIDADE ENCONTRADA!
📦 Cooktop Electrolux 5 bocas
💰 R$ 1.200,00
📍 Grupo: Promoções SC
```

---

## 🧱 Tecnologias

| Tecnologia | Uso |
|---|---|
| [Node.js](https://nodejs.org) | Runtime |
| [TypeScript](https://www.typescriptlang.org) | Linguagem |
| [whatsapp-web.js](https://wwebjs.dev) | Integração com WhatsApp |
| [Puppeteer](https://pptr.dev) | Automação do navegador |
| [dotenv](https://github.com/motdotla/dotenv) | Variáveis de ambiente |
| [Vitest](https://vitest.dev) | Testes unitários |
---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/promotion-bot.git
cd promotion-bot
npm install
```

---

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PHONE_NUMBER=5548999999999
GROUP_ID=1234567890-123456@g.us
```

---

## ▶️ Como rodar

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
node dist/index.js
```

---

## 🧠 Filtros inteligentes

Os filtros ficam em `src/filters.ts`. Cada filtro segue esta estrutura:

```typescript
{
  name: "Cooktop",
  required: ["cooktop"],           // TODAS devem existir no texto
  oneOf: ["fischer", "brastemp", "electrolux"], // PELO MENOS UMA deve existir
  maxPrice: 1500,                  // Preço máximo em reais
}
```

### Regras

| Campo | Comportamento |
|---|---|
| `required` | **Todas** as palavras precisam estar no texto |
| `oneOf` | **Pelo menos uma** palavra precisa estar no texto |
| `maxPrice` | Preço detectado precisa ser menor ou igual ao limite |

---

## 💰 Detecção de preço

O bot reconhece automaticamente os formatos mais comuns:

```
R$ 3000
R$ 2.799
R$ 2.799,90
```

---

## 📁 Estrutura do projeto

```
src/
├── index.ts      # Ponto de entrada — conexão e escuta do WhatsApp
├── filters.ts    # Definição dos filtros de promoção
└── matcher.ts    # Lógica de match entre mensagem e filtros
```

---

## 🔐 Segurança

Adicione ao seu `.gitignore`:

```
node_modules/
.env
dist/
.wwebjs_auth/
```

> ⚠️ **Nunca commite o `.env` ou a pasta `.wwebjs_auth/`** — ela contém sua sessão autenticada do WhatsApp.

---

## ⚠️ Aviso de uso

- ❌ Não utilize para spam ou fins comerciais
- ✅ Uso pessoal em grupos privados é seguro
- 💡 Recomendado criar um grupo privado exclusivo para receber as notificações

---

## 🗺️ Roadmap

- [ ] Filtro por especificações numéricas (ex: telas 55"+, RAM 16GB+)
- [ ] Detecção automática de RAM e SSD em anúncios
- [ ] Interface web para configurar filtros
- [ ] Integração com Telegram
- [ ] Comparação de preços com lojas online

---

## 👨‍💻 Autor

Feito para automatizar a busca de promoções reais em grupos do WhatsApp.

---

## 🤝 Contribuição

Pull requests são bem-vindos! Sinta-se livre para abrir uma _issue_ com sugestões ou reportar bugs.

---

## 📜 Licença

Distribuído sob a licença [MIT](LICENSE).