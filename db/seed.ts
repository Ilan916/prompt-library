import "dotenv/config";
import { db } from "@/db";

import { usersTable } from "@/db/schema/users";
import { promptsTable } from "@/db/schema/prompt";
import { promptStepsTable } from "@/db/schema/prompt_steps";
import { categoriesTable } from "@/db/schema/categories";
import { promptCategoriesTable } from "@/db/schema/prompt_categories";
import { aiModelsTable } from "@/db/schema/ai_models";
import { promptAiModelsTable } from "@/db/schema/prompt_ai_models";

async function seed() {
  console.log("🧹 Cleaning database...");

  // IMPORTANT : ordre enfants → parents
  await db.delete(promptStepsTable);
  await db.delete(promptAiModelsTable);
  await db.delete(promptCategoriesTable);
  await db.delete(promptsTable);
  await db.delete(usersTable);
  await db.delete(categoriesTable);
  await db.delete(aiModelsTable);

  console.log("🌱 Seeding database...");

  // ---------- USER ----------
  const [user] = await db
    .insert(usersTable)
    .values({
      first_name: "Ilan",
      last_name: "Lallemand",
      username: "ilan",
      email: "ilan@test.com",
      password_hash: "hashed-password",
      auth_provider: "email",
    })
    .returning();

  // ---------- AI MODELS ----------
  const aiModels = await db
    .insert(aiModelsTable)
    .values([
      { name: "ChatGPT", slug: "chatgpt" },
      { name: "Claude", slug: "claude" },
      { name: "Gemini", slug: "gemini" },
      { name: "Midjourney", slug: "midjourney" },
    ])
    .returning();

  // ---------- CATEGORIES ----------
  const categories = await db
    .insert(categoriesTable)
    .values([
      { name: "Développement", slug: "dev" },
      { name: "Design", slug: "design" },
      { name: "Marketing", slug: "marketing" },
      { name: "Productivité", slug: "productivity" },
    ])
    .returning();

  // ---------- PROMPTS ----------
  const prompts = await db
    .insert(promptsTable)
    .values([
      {
        title: "Landing page SaaS performante",
        objective: "Créer une landing page SaaS optimisée conversion.",
        public_id: "PROMPT-1",
        type: "text",
        score: 42,
        author_id: user.id,
      },
      {
        title: "Post LinkedIn viral",
        objective: "Créer un post LinkedIn très engageant.",
        public_id: "PROMPT-2",
        type: "text",
        score: 54,
        author_id: user.id,
      },
      {
        title: "Checklist freelance débutant",
        objective: "Aider un freelance à bien démarrer.",
        public_id: "PROMPT-3",
        type: "text",
        score: 18,
        author_id: user.id,
      },
      {
        title: "Illustration fantasy épique",
        objective: "Créer une scène fantasy détaillée.",
        public_id: "PROMPT-4",
        type: "image",
        score: 71,
        preview_image_url: "https://picsum.photos/400/200?fantasy",
        author_id: user.id,
      },
      {
        title: "Routine productivité quotidienne",
        objective: "Créer une routine quotidienne efficace.",
        public_id: "PROMPT-5",
        type: "text",
        score: 12,
        author_id: user.id,
      },

      // ---- MULTI STEPS ----
      {
        title: "Prompt multi-step API REST",
        objective: "Comprendre et utiliser une API REST.",
        public_id: "PROMPT-6",
        type: "text",
        score: 22,
        author_id: user.id,
      },
      {
        title: "Refactor code React propre",
        objective: "Améliorer un composant React.",
        public_id: "PROMPT-7",
        type: "text",
        score: 28,
        author_id: user.id,
      },
      {
        title: "Audit UX app mobile",
        objective: "Identifier les problèmes UX.",
        public_id: "PROMPT-8",
        type: "text",
        score: 18,
        author_id: user.id,
      },
      {
        title: "Jeu JavaScript simple",
        objective: "Créer un mini jeu JS.",
        public_id: "PROMPT-9",
        type: "text",
        score: 33,
        author_id: user.id,
      },
      {
        title: "Prompt image cyberpunk",
        objective: "Créer une illustration cyberpunk.",
        public_id: "PROMPT-10",
        type: "image",
        score: 65,
        preview_image_url: "https://picsum.photos/400/200?cyberpunk",
        author_id: user.id,
      },
    ])
    .returning();

  // ---------- PROMPT STEPS ----------
  for (const prompt of prompts) {
    // PROMPTS SIMPLES → 1 user + 1 assistant
    if (["PROMPT-1", "PROMPT-2", "PROMPT-3", "PROMPT-4", "PROMPT-5"].includes(prompt.public_id)) {
      await db.insert(promptStepsTable).values([
        {
          prompt_id: prompt.id,
          role: "user",
          content: `Instruction principale pour "${prompt.title}".`,
          step_order: 1,
        },
        {
          prompt_id: prompt.id,
          role: "assistant",
          content: `Réponse idéale attendue pour "${prompt.title}".`,
          step_order: 2,
        },
      ]);
    }

    // PROMPTS MULTI-STEPS
    if (prompt.public_id === "PROMPT-6") {
      await db.insert(promptStepsTable).values([
        { prompt_id: prompt.id, role: "user", content: "Explique-moi ce qu’est une API REST.", step_order: 1 },
        { prompt_id: prompt.id, role: "assistant", content: "Une API REST est une interface...", step_order: 2 },
        { prompt_id: prompt.id, role: "user", content: "Donne un exemple en Node.js.", step_order: 3 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici un exemple Express...", step_order: 4 },
      ]);
    }

    if (prompt.public_id === "PROMPT-7") {
      await db.insert(promptStepsTable).values([
        { prompt_id: prompt.id, role: "user", content: "Analyse ce composant React.", step_order: 1 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici les problèmes identifiés...", step_order: 2 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici une version refactorisée.", step_order: 3 },
      ]);
    }

    if (prompt.public_id === "PROMPT-8") {
      await db.insert(promptStepsTable).values([
        { prompt_id: prompt.id, role: "user", content: "Audit UX de cette app mobile.", step_order: 1 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici les problèmes UX...", step_order: 2 },
        { prompt_id: prompt.id, role: "assistant", content: "Propositions d’amélioration.", step_order: 3 },
      ]);
    }

    if (prompt.public_id === "PROMPT-9") {
      await db.insert(promptStepsTable).values([
        { prompt_id: prompt.id, role: "user", content: "Créer un jeu JS simple.", step_order: 1 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici la structure du jeu.", step_order: 2 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici le code complet.", step_order: 3 },
      ]);
    }

    if (prompt.public_id === "PROMPT-10") {
      await db.insert(promptStepsTable).values([
        { prompt_id: prompt.id, role: "user", content: "Décris une scène cyberpunk futuriste.", step_order: 1 },
        { prompt_id: prompt.id, role: "assistant", content: "Voici la description détaillée.", step_order: 2 },
      ]);
    }

    // ---------- LINK CATEGORY + AI ----------
    await db.insert(promptCategoriesTable).values({
      prompt_id: prompt.id,
      category_id: categories[Math.floor(Math.random() * categories.length)].id,
    });

    await db.insert(promptAiModelsTable).values({
      prompt_id: prompt.id,
      ai_model_id: aiModels[Math.floor(Math.random() * aiModels.length)].id,
    });
  }

  console.log("✅ Seed terminé avec succès !");
}

seed().catch((err) => {
  console.error("❌ Seed failed", err);
  process.exit(1);
});
