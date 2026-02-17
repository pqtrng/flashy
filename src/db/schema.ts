import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Decks table - represents a collection of flashcards (e.g., "Vietnamese Language", "British History")
export const decksTable = pgTable("decks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(), // Clerk user ID
  name: varchar({ length: 255 }).notNull(), // e.g., "Learn Vietnamese"
  description: text(), // Optional description of the deck
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

// Cards table - individual flashcards within a deck
export const cardsTable = pgTable("cards", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  deckId: integer().notNull().references(() => decksTable.id, { onDelete: "cascade" }), // Foreign key to decks
  front: text().notNull(), // Front of the card (e.g., "Dog" or "When was the battle of hastings?")
  back: text().notNull(), // Back of the card (e.g., "Chó" or "1066")
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});
