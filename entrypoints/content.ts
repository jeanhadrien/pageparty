
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidget from '@/components/ChatWidget';
import '@/styles/chat.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    // Avoid double‑injection (e.g. in iframes)
    if (document.getElementById('__url‑chatroot')) return;

    const container = document.createElement('div');
    container.id = '__url‑chatroot';
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<ChatWidget />);
  },
});