import { useState } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! Ask me anything about Volunteer Impact Tracker!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const response = await API.post('/chat', { question: input });
      setMessages(prev => [...prev, { role: 'bot', text: response.data.answer, source: response.data.source }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Chat service unavailable.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='chatbot'>
      <div className='chat-header'>
        <h3>AI Assistant</h3>
        <span className='chat-status'>Online</span>
      </div>
      <div className='chat-messages'>
        {messages.map((msg, i) => (
          <div key={i} className={'chat-message ' + msg.role}>
            <div className='chat-bubble'>{msg.text}</div>
            {msg.source && <div className='chat-source'>Source: {msg.source}</div>}
          </div>
        ))}
        {loading && <div className='chat-message bot'><div className='chat-bubble'>Thinking...</div></div>}
      </div>
      <div className='chat-input'>
        <input placeholder='Ask about the system...' value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
