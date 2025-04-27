
export default defineBackground(() => {
  console.log('Background ready', { id: browser.runtime.id });
});