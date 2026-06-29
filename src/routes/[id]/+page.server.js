import { db } from "$lib/server/db";
import { lists, listItems } from "$lib/server/db/schema";
import { eq, asc, sql } from "drizzle-orm";
import { error, fail } from "@sveltejs/kit";

export const load = async ({ params, locals }) => {
  if (!locals.user) throw error(401, "Unauthorized");

  const listId = params.id;
  // 1. Get the list metadata
  const list = await db.query.lists.findFirst({
    where: eq(lists.id, listId),
  });

  if (!list) throw error(404, "List not found");

  // 2. Get the items for this list
  const items = await db.query.listItems.findMany({
    where: eq(listItems.listId, listId),
    orderBy: [asc(listItems.position)],
  });

  return {
    list,
    items,
  };
};

export const actions = {
  addItem: async ({ request, params, locals }) => {
    const user = locals.user;
    if (!user) return fail(401);
    const listId = params.id;

    try {
      // Find the highest current position for items in this list   
      const result = await db
        .select({ maxPos: sql`max(${listItems.position})` })
        .from(listItems)
        .where(eq(listItems.listId, listId));

      const nextPosition = (result[0]?.maxPos ?? -1) + 1;

      const id = crypto.randomUUID().slice(-12);

      await db.insert(listItems).values({
        id,
        listId: listId,
        name: "",
        position: nextPosition,
        checked: false,
      });
      return { success: true, id };
      
    } catch (err) {
      console.error(err);
      return fail(500, { message: "Could not add item" });
    }
  },
};
