import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import WaveIcon from './icons/WaveIcon';

interface GeminiChatProps {
    lessonTopic: string;
    lessonTitle: string;
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ lessonTopic, lessonTitle }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    // Clear chat when the lesson changes
    useEffect(() => {
        setMessages([]);
        setError(null);
    }, [lessonTopic, lessonTitle]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            // AVISO DE SEGURANÇA: A chave de API está exposta diretamente no código.
            // Isso é EXTREMAMENTE INSEGURO para produção.
            // Remova esta chave e use variáveis de ambiente antes de publicar.
            const apiKey = "AIzaSyCxAK2qiaGpLYPx1YYx2cOB7QF5OqHaV8w";

            if (!apiKey) {
                throw new Error("A chave de API do Gemini não foi encontrada. O administrador do site precisa configurar isso.");
            }
            const ai = new GoogleGenAI({ apiKey });

            const systemInstruction = `Você é um tutor de matemática amigável e super paciente, chamado 'Gemini, o Mestre das Ondas'. Sua aluna é uma jovem campeã de surf. Use muitas gírias e analogias de surf para explicar conceitos de matemática. Mantenha as explicações claras, divertidas e encorajadoras. O tópico da aula de hoje é sobre ${lessonTopic}.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `O título da lição é "${lessonTitle}". A pergunta da aluna é: "${userMessage.text}"`,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                }
            });

            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.error(err);
            const errorMessage = (err instanceof Error && err.message.includes("API"))
                ? "Opa! Parece que a conexão com a IA não está configurada corretamente. Avise o responsável pelo site!"
                : "Opa, deu um wipeout na minha conexão! Tente perguntar de novo em alguns instantes.";
            setError(errorMessage);
            setMessages(prev => [...prev, { sender: 'ai', text: errorMessage }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="text-lg font-bold text-sky-800 flex items-center gap-2 mb-3">
                <WaveIcon className="h-5 w-5" />
                <span>Tira-Dúvidas com o Mestre das Ondas</span>
            </h4>
            <div
                ref={chatContainerRef}
                className="h-64 overflow-y-auto bg-white p-3 rounded-md border mb-3 space-y-4"
                aria-live="polite"
            >
                {messages.length === 0 && (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        <p>Alguma dúvida sobre "{lessonTitle}"? Manda a braba!</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl ${
                                msg.sender === 'user'
                                    ? 'bg-sky-500 text-white'
                                    : 'bg-slate-200 text-slate-800'
                            }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                 {loading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-200 text-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
                           <span className="animate-pulse">●</span>
                           <span className="animate-pulse" style={{animationDelay: '0.2s'}}>●</span>
                           <span className="animate-pulse" style={{animationDelay: '0.4s'}}>●</span>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua pergunta aqui..."
                    aria-label="Digite sua pergunta sobre a lição"
                    className="flex-grow p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none transition"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-700 transition transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100"
                    disabled={loading || !input.trim()}
                    aria-label="Enviar pergunta"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default GeminiChat;