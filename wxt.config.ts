import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'URL‑Based Chatrooms',
    description: 'Injects an Ably‑powered chatroom that is unique to the current page URL.',
    version: '0.1.0',
    host_permissions: ['<all_urls>'],
    permissions: ['storage'],
    action: {
      default_title: 'URL Chat',
    },
  },
});
