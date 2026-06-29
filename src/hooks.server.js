import { sequence } from '@sveltejs/kit/hooks';
import { handleAuth } from '$lib/hooks/handleAuth.js';
import { handleTheme } from '$lib/hooks/handleTheme.js';

export const handle = sequence(handleAuth, handleTheme);
// export const handle = handleAuth;

// import { redirect } from "@sveltejs/kit";
// import { validateSession } from '$lib/server/auth';
// import { config } from "$lib";

// export async function handle({ event, resolve }) {
//   const { pathname } = event.url;  
//   console.log("PATHNAME", pathname, config?.cookieNames.session);

//   // event.locals.user = null;
//   // event.locals.session = null;

//   // Pass through static assets
//   if (!event.route.id) return resolve(event);

//   // Pass through auth route
//   if (pathname === '/auth') return resolve(event);


//   // Everything else needs a valid session
//   const token = event.cookies.get(config?.cookieNames.session);
//   const result = await validateSession(token);

//   if (!result) {
//     throw redirect(303, '/auth');
//   }

//   // Valid session — hydrate locals
  
//   const { passwordHash, ...safeUser } = result.user;
//   event.locals.user = safeUser;
//   event.locals.session = result.session;

//   return resolve(event);

// };