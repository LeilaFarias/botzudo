import { useState } from 'react';

export default function Home() {
  const [mensagem, setMensagem] = useState('');
  const [resposta, setResposta] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    try {
      const res = await fetch(`/api/botzudo?q=${encodeURIComponent(mensagem)}`);
      const text = await res.text();
      setResposta(text);
    } catch (err) {
      setResposta('putz, deu ruim aqui, mano. Tenta de novo mais tarde.');
    }
  };

return (
  <div
    style={{
      minHeight: '100vh',
      margin: 0,
      background: '#111',
      color: '#eee',
      fontFamily: 'sans-serif',
      padding: '2rem',
    }}
  >
    <h1>🤖 Botzudo</h1>

    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.5rem 0' }}>
    <input
        type="text"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua pergunta"
        style={{
        padding: '0.5rem',
        fontSize: '1rem',
        width: '300px',
        }}
    />
    <button
        type="submit"
        style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#444',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        }}
    >
        Enviar
    </button>
    </form>

    <div
      style={{
        background: '#222',
        padding: '1rem',
        marginTop: '1rem',
        borderRadius: '8px',
        maxWidth: '500px',
      }}
    >
      {"Botzudo: " + resposta || 'Resposta aparecerá aqui'}
    </div>
  </div>
);

}