import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { user, session } from '$lib/server/db/schema';
import { config } from "$lib";


const SALT_ROUNDS = 12;
const SESSION_DURATION = 1000 * config.maxAge;

// #region Passwords ***********/
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}       

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
// #endregion Passwords ***********/


// #region Session ***********/
export function generateSessionToken() {
  return randomBytes(32).toString('hex');
}   

export async function createSession(token, userId) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const newSession = {
    id: token,
    userId,
    expiresAt
  };

  await db.insert(session).values(newSession);
  return newSession;
}


export async function validateSession(token) {
  // → looks up session, checks expiry, returns { user, session } or null
  if (!token) return null;

  const result = await db
    .select()
    .from(session)
    .innerJoin(user, eq(session.userId, user.id))
    .where(eq(session.id, token))
    .get();

  if (!result) return null;

  // Check expiry
  if (result.session.expiresAt < new Date()) {
    await db.delete(session).where(eq(session.id, token));
    return null;
  } 

  return {
    user: result.user,
    session: result.session
  };

}


export async function invalidateSession(token) {
  await db.delete(session)
    .where(eq(session.id, token));
}

// #endregion Session ***********/


