import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema/users";

export async function getPromptAuthor(authorId: string | null) {
  if (!authorId) return null;

  const [author] = await db
    .select({ id: usersTable.id, username: usersTable.username, firstName: usersTable.first_name, lastName: usersTable.last_name })
    .from(usersTable)
    .where(eq(usersTable.id, authorId));

  return author ?? null;
}
