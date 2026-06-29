/* /auth/+page.server.js */
import { fail, redirect } from "@sveltejs/kit";
import { randomBytes } from "crypto";
import { db } from "$lib/server/db";
import { user, session } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import * as auth from "$lib/server/auth";
import { config } from "$lib";
// import * as table from "$lib/server/db/schema";

export const load = async (event) => {
  if (event.locals.user) {
    throw redirect(302, "/account");
  }
  return { locals: event.locals };
};

export const actions = {
  login: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    if (!username || !password) {
      return fail(400, { message: "Username and password are required" });
    }

    // Find user
    const existingUser = await db.select().from(user).where(eq(user.username, username)).get();

    if (!existingUser) {
      return fail(400, { message: "Invalid username or password" });
    }

    // Verify password
    const valid = await auth.verifyPassword(password, existingUser.passwordHash);
    if (!valid) {
      return fail(400, { message: "Invalid username or password" });
    }

    // cleanup old sessions
    // await db.delete(session).where(eq(session.userId, existingUser.id));

    // clean up expired sessions
    await db.delete(session).where(
      and(eq(session.userId, existingUser.id), lt(session.expiresAt, new Date()))
    );

    // Create session
    const token = auth.generateSessionToken();
    await auth.createSession(token, existingUser.id);

    event.cookies.set(config.cookieNames.session, token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: config.maxAge,
    });

    // console.log("DEBUG",event.cookies.get(config.cookieNames.session));

    throw redirect(303, "/");
  },

  register: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();

    if (!username || !password) {
      return fail(400, { message: "Username and password are required" });
    }

    if (username.length < 3) {
      return fail(400, { message: "Username must be at least 3 characters" });
    }

    if (password.length < 4) {
      return fail(400, { message: "Password must be at least 4 characters" });
    }

    // Check username taken
    const existingUser = await db.select()
      .from(user)
      .where(eq(user.username, username))
      .get();

    if (existingUser) {
      return fail(400, { message: "Username already registered" });
    }

    // Create user
    const userId = randomBytes(8).toString("hex");
    await db.insert(user).values({
      id: userId,
      username,
      passwordHash: await auth.hashPassword(password),
    });

    // Create session
    const token = auth.generateSessionToken();
    await auth.createSession(token, userId);

    event.cookies.set(config.cookieNames.session, token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: config.maxAge,
    });

    throw redirect(303, "/");
  },
};

