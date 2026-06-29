import { db } from "$lib/server/db";
import { lists } from "$lib/server/db/schema";
import { eq, asc } from "drizzle-orm";

export const load = async (event) => {
  
  const user = event.locals.user;
  const session = event.locals.session;
  let userLists = [];

  if (user) {
    userLists = await db.select()
      .from(lists)
      .where(eq(lists.userId, user.id))
      .orderBy(asc(lists.position));
  }
  
  return { 
    pathname: event.url.pathname, // ????
    user, 
    session,
    lists: userLists,
  };
};