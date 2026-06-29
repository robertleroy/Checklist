import { db } from "$lib/server/db";
import { listItems } from "$lib/server/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import { json } from "@sveltejs/kit";

export const PATCH = async ({ request, locals }) => {
  if (!locals.user) return json({ message: "Unauthorized" }, { status: 401 });

  const { id, name, checked, version } = await request.json();

  const result = await db
    .update(listItems)
    .set({ name, checked, version: version + 1 })
    .where(
      and(
        eq(listItems.id, id), 
        eq(listItems.version, version)
      )
    );

    if (!result.rowsAffected) {
      return json(
        { error: "version conflict" },
        { status: 409 }
      );
    }

  return json({ success: true });
};

export async function POST({ request }) {
  const { listId, afterPosition } = await request.json();

  const id = crypto.randomUUID().slice(-12);
  const newPosition = afterPosition + 1;

  try {
    // 1. Create the "hole" (Shift items down)
    await db
      .update(listItems)
      .set({
        // Use the column object directly in the template literal
        position: sql`position + 1`,
      })
      .where(and(eq(listItems.listId, listId), gte(listItems.position, newPosition)));

    // 2. Insert the complete record
    await db.insert(listItems).values({
      id,
      listId,
      name: "", // Empty string for the new input
      checked: false,
      position: newPosition,
    });

    // 3. Return the ID for the frontend focus logic
    return json({ id });
  } catch (error) {
    console.error("Failed to insert item:", error);
    return new Response(undefined, { status: 500 });
  }
}

export const DELETE = async ({ request, locals }) => {
  if (!locals.user) return json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  await db.delete(listItems).where(eq(listItems.id, id));
  return json({ success: true });
};
