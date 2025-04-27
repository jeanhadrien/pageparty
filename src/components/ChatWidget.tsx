import React, { useEffect, useRef, useState } from 'react';
import useAblyChat, { ChatMessage } from '@/hooks/useAblyChat';

const STORAGE_KEY = 'url‑chat‑username';

function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [pendingUsername, setPendingUsername] = useState('');
    const [text, setText] = useState('');

    // Build a deterministic room name from full URL (origin + pathname; query ignored)
    const roomName = btoa(location.origin + location.pathname);

    const { messages, publish } = useAblyChat(roomName, username ?? undefined);
    const listRef = useRef<HTMLUListElement>(null);

    // Persist username
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setUsername(stored);
    }, []);

    useEffect(() => {
        if (open && listRef.current) {
            // Scroll to latest
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, open]);

    const handleSend = () => {
        if (!text.trim()) return;
        publish(text.trim());
        setText('');
    };

    const handleSaveUsername = () => {
        if (!pendingUsername.trim()) return;
        localStorage.setItem(STORAGE_KEY, pendingUsername.trim());
        setUsername(pendingUsername.trim());
    };

    return (
        <>
            {/* Floating button */}
            <button
                className="urlchat‑toggle"
                onClick={() => setOpen(!open)}
                aria‑label="Open chat" >

            💬


            {/* Chat window */}
            {
                open && (
                    <div className="urlchat‑window">
                        <header>
                            <span className="title">Page chat</span>
                            <button className="close" onClick={() => setOpen(false)}>
                                ✕
                            </button>
                        </header>

                        {!username ? (
                            <div className="username‑prompt">
                                <p>Pick a username to join this chat</p>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={pendingUsername}
                                    onChange={(e) => setPendingUsername(e.target.value)}
                                />
                                <button onClick={handleSaveUsername}>Join</button>
                            </div>
                        ) : (
                            <>
                                <ul className="messages" ref={listRef}>
                                    {messages.map((m, idx) => (
                                        <li key={idx} className={m.username === username ? 'me' : ''}>
                                            <strong>{m.username}</strong>: {m.text}
                                        </li>
                                    ))}
                                </ul>
                                <form
                                    className="input‑bar"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSend();
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Say something…"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                    <button type="submit">➤</button>
                                </form>
                            </>
                        )}
                    </div>
                )
            }
        </>
    );
}

export default ChatWidget;