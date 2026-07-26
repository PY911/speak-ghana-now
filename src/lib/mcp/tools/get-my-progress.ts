import { defineTool } from "@lovable.dev/mcp-js";
import { LANGUAGES } from "@/lib/lessons";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_my_progress",
  title: "Get my progress",
  description: "Get the signed-in learner's GoGhana progress: XP, streak, and completed lessons per language.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const [{ data: profile, error: pErr }, { data: rows, error: rErr }] = await Promise.all([
      supabase.from("profiles").select("display_name,xp,streak,last_lesson_date").eq("id", ctx.getUserId()!).maybeSingle(),
      supabase.from("lesson_progress").select("language_code,lesson_id,best_score,completed_at").eq("user_id", ctx.getUserId()!),
    ]);
    const error = pErr ?? rErr;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const byLanguage = LANGUAGES.filter((l) => l.available).map((l) => ({
      code: l.code,
      name: l.name,
      completed: (rows ?? []).filter((r) => r.language_code === l.code).length,
      total: l.lessons.length,
    }));
    const payload = { profile, byLanguage, lessons: rows ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
