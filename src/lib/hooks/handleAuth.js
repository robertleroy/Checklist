// import * as auth from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import { validateSession } from '$lib/server/auth';
import { config } from "$lib";

export async function handleAuth({ event, resolve }) {
  const { pathname } = event.url;
  const sessionToken = event.cookies.get(config.cookieNames.session);
  // console.log("sessionToken",sessionToken);

  if (sessionToken) {
    const res = await validateSession(sessionToken);
    const session = await res?.session;
    const  user = await res?.user;
    // console.log("RES", { session, user });
    if (session) {
      event.locals.user = { 
        id: user.id, 
        username: user.username 
      };
      event.locals.session = session;
      // console.log(event.locals.user);
      return resolve(event);
    }
  }

  if (pathname !== "/auth") {
    throw redirect(303, "/auth");
  }
  return resolve(event);
};