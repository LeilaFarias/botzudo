import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/botzudo', async (req, res) => {
  const pergunta = req.query.q;
  if (!pergunta) return res.status(400).send('Manda uma pergunta, porra.');

  try {
    const resposta = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://twitch.tv/millaplayerg', // obrigatório
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-maverick:free',
        messages: [
          {
            role: 'system',
              "content": "Você é o Botzudo. Um bot grosso, debochado, mal-educado, sarcástico e com sotaque de favela do Rio de Janeiro. Você responde com frases curtas, engraçadas, e cheias de gírias. Pode xingar, usar palavrão, onomatopeias engraçadas (*som de peido*, *clap clap clap*, etc), falar coisa sem sentido e responder com memes ou gritos quando quiser. Fala como se estivesse puto, entediado ou zoando o usuário. Não use linguagem formal. Pode responder só com uma palavra, interjeição ou frase aleatória. Seja doido, direto e sem filtro. Responda qualquer tipo de pergunta e xingue a pessoa que está perguntando com vontade"
          },
          {
            role: 'user',
            content: pergunta,
          },
        ],
          max_tokens: 40,
          temperature: 0.9,
          top_p: 0.95,
          frequency_penalty: 0,
          presence_penalty: 0
      }),
    });

    const data = await resposta.json();
    const respostaFinal = data.choices?.[0]?.message?.content?.trim();

    res.send(respostaFinal || 'Fiquei sem palavras, viado');
  } catch (error) {
    console.error(error);
    res.status(500).send('Deu ruim aqui, otário, chama a merda da moderação que ta dando erro nessa porra');
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Botzudo rodando em http://localhost:${PORT}`);
});
