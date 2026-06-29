
import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import { lists } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import { config } from "$lib";
import { redirect } from "@sveltejs/kit";


export const actions = {
  createList: async ({ request, locals }) => {
    const user = locals.user;

    const formData = await request.formData();
    const name = formData.get("name");

    const newListId = crypto.randomUUID().slice(-12);

    if (!name || name.length < 3) {
      return fail(400, { message: "Name is required" });
    }

    try {
      // Get current count to set the next position
      const result = await db
        .select({ count: sql`count(*)` })
        .from(lists)
        .where(eq(lists.userId, user.id));

      const nextPosition = result[0].count;

      const newlist = {
        id: newListId,
        userId: user?.id,
        name: name.toString(),
        position: nextPosition,
      }

      await db.insert(lists).values(newlist);

      return { success: true, newlist: newlist };
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Database error" });
    }
  },
  
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);    
    }

    await auth.invalidateSession(event.locals.session.id);
    await event.cookies.delete(config.cookieNames.session, { 
        path: '/',
    });
    
    throw redirect(303, "/auth");
  },
};
