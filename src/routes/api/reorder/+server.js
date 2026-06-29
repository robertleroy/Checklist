import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { lists, listItems } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";


export const POST = async ({ request, locals }) => {
  if (!locals.user) return json({ error: "Unauthorized" }, { status: 401 });

  const { type, updates } = await request.json();
  const table = type === "lists" ? lists : listItems;

  try {
    await db.transaction(async (tx) => {
      for (const update of updates) {
        let dataToUpdate = {};

        if (type === "lists") {
          dataToUpdate = { position: update.position };
          // dataToUpdate.position = update.position;
        } else {
          if (update.position !== undefined) {
            dataToUpdate.position = update.position;
          }
        }
        await tx.update(table).set(dataToUpdate).where(eq(table.id, update.id));
      }
    });
    return json({ success: true });
    
  } catch (e) {
    console.error("Reorder Error:", e.message);
    return json({ error: e.message }, { status: 500 });
  }
};
