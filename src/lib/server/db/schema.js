import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
  .notNull()
  .references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
}, (table) => ({
  expiresIdx: index('expires_at_idx').on(table.expiresAt),
})); 

export const lists = sqliteTable('lists', {
	id: text('id').primaryKey(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  position: integer('position').notNull().default(0),
  version: integer('version').notNull().default(1),
});

export const listItems = sqliteTable('list_items', {
	id: text('id').primaryKey(),
  listId: text('list_id').references(() => lists.id, { onDelete: 'cascade' }),
  name: text('name'),
  checked: integer('checked', { mode: 'boolean' }).notNull().default(false),
  position: integer('position').notNull().default(0),
  version: integer('version').notNull().default(1),
});