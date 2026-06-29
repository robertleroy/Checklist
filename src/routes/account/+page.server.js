
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import * as auth from "$lib/server/auth";
import { user, session } from "$lib/server/db/schema";
// import * as table from "$lib/server/db/schema";
import { config } from "$lib";
// import { getRequestEvent } from "$app/server";

// export const load = async (event) => {
  

// };

export const actions = {
  editName: async (event) => {
    const formData = await event.request.formData();
    const userid = formData.get("userid");
    const username = formData.get("username").trim();

    console.log("editName",userid,username);

    if (username.length < 3) {
      return fail(400, { message: "Username must be at least 3 characters" });
    }

    try {
      await db.update(user).set({ username }).where(eq(user.id, userid));
    } catch {
      return fail(500, { message: "an error has occurred" });
    }
  },

  verifyPassword: async (event) => {
    const formData = await event.request.formData();
    const userId = formData.get("userId");
    const currentPassword = formData.get("currentPassword").trim();

    // console.log("verifyPassword",userId,currentPassword);

    const res = await db.select().from(user).where(eq(user.id, userId));

    // console.log("RES", res);


    const existingUser = res.at(0);
    const validPassword = await auth.verifyPassword(currentPassword, existingUser.passwordHash);

    // console.log("validPassword", validPassword);

    if (!validPassword) {
      return fail(400, { message: "invalid" });
    }
    return { verified: true };
  },

  editPassword: async (event) => {
    const formData = await event.request.formData();
    const userId = formData.get("userId");
    const password = formData.get("newPassword").trim();
    const confirmPassword = formData.get("confirmPassword").trim();

    
    console.log("editPassword",userId,confirmPassword);

    if (password.length < 4) {
      return fail(400, { message: "Password must be at least 4 characters" });
    }

    if (password !== confirmPassword) {
      return fail(400, { message: "invalid password:", detail: "passwords must match" });
    }

    const passwordHash = await auth.hashPassword(password);

    try {      
      await db.update(user).set({ passwordHash }).where(eq(user.id, userId));
    } catch {
      return fail(500, { message: "an error has occurred" });
    }
    return { message: "", verified: false };
  },

  deleteAccount: async (event) => {
    const formData = await event.request.formData();
    const userId = formData.get("userId");
    const username = formData.get("username");
    
    
    // console.log("deleteAccount",userId,username);

    try {
      await auth.invalidateSession(event.locals.session.id);
      await event.cookies.delete(config.cookieNames.session, { 
        path: '/',
      });
      const result = await db.delete(user).where(eq(user.id, userId));
      return {
        success: true,
        id: userId,
        username,
      };
    } catch (err) {
      return fail(500, { message: "an error has occurred" });
    }

    // try {
    //   await auth.invalidateSession(event.locals.session.id);   
    //   await auth.deleteSessionTokenCookie(event);
    //   const result = await db.delete(table.user).where(eq(table.user.id, userid));
      
    //   return {
    //     success: true,
    //     id: userid,
    //     username,
    //   };
    // } catch (err) {
    //   return fail(500, { message: "an error has occurred" });
    // }
  },
};

