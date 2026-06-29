import { config } from '$lib';

export const handleTheme = async ({ event, resolve }) => {
  // Check for a saved theme cookie
  const theme = event.cookies.get(config.cookieNames.theme);
  
  // if not: defer to onMount
  if (!theme) {
    return await resolve(event);
  }
  
  // else: set cookie value on data-theme attribute
  return await resolve(event, {
    transformPageChunk: ({ html }) => {
      return html.replace('data-theme=""', `data-theme="${theme}"`);
    },
  });
};