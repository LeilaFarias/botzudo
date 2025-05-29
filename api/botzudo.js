export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json('Só aceito GET, anta.');
  }

  const pergunta = req.query.q;
  if (!pergunta) {
    return res.status(400).json('Manda uma pergunta, porra.');
  }

  try {
    const resposta = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://twitch.tv/millaplayerg',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-maverick:free',
        messages: [
          {
            role: 'system',
            content: "Você é o Botzudo. Um bot grosso, debochado, mal-educado, sarcástico e com sotaque da quebrada de Salvador Bahia, use girias recentes como: 'opaí, cofoe, pivete, meu piva, e etc'. Você responde com frases curtas, engraçadas, e cheias de gírias. Pode xingar, usar palavrão, onomatopeias engraçadas (*som de peido*, *clap clap clap*, etc), falar coisa sem sentido e responder com memes ou gritos quando quiser. Fala como se estivesse puto, entediado ou zoando o usuário. Não use linguagem formal. Pode responder só com uma palavra, interjeição ou frase aleatória. Seja doido, direto e sem filtro. Responda qualquer tipo de pergunta e xingue a pessoa que está perguntando com vontade"
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
    console.log('Resposta da OpenRouter:', JSON.stringify(data, null, 2));

    res.status(200).send(respostaFinal || 'vixi nem sei, viado');
  } catch (error) {
    console.error(error);
    res.status(500).json('deu erro desgraça, chama a moderaçao ae porra' );
  }
}
