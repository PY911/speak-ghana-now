import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findLesson } from "@/lib/lessons";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "record_lesson_result",
  title: "Record lesson result",
  description: "Record the signed-in learner's score for a GoGhana lesson. Keeps the best score for that lesson.",
  inputSchema: {
    languageCode: z.string().describe("Language code, e.g. 'twi'."),
    lessonId: z.string().describe("Lesson id as returned by list_lessons."),
    score: z.number().int().describe("Number of words answered correctly."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ languageCode, lessonId, score }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const code = languageCode.trim().toLowerCase();
    const lesson = findLesson(code, lessonId.trim());
    if (!lesson) {
      return { content: [{ type: "text", text: `No lesson '${lessonId}' in language '${languageCode}'.` }], isError: true };
    }
    const clamped = Math.max(0, Math.min(lesson.words.length, Math.round(score)));
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId()!;

    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("id,best_score")
      .eq("user_id", userId)
      .eq("language_code", code)
      .eq("lesson_id", lesson.id)
      .maybeSingle();

    if (existing) {
      if (clamped <= existing.best_score) {
        return {
          content: [{ type: "text", text: `Kept previous best score of ${existing.best_score}.` }],
          structuredContent: { bestScore: existing.best_score, updated: false },
        };
      }
      const { error } = await supabase
        .from("lesson_progress")
        .update({ best_score: clamped, completed_at: new Date().toISOString() })
        .eq("id", existing.id);
      if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    } else {
      const { error } = await supabase
        .from("lesson_progress")
        .insert({ user_id: userId, language_code: code, lesson_id: lesson.id, best_score: clamped });
      if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    }

    return {
      content: [{ type: "text", text: `Recorded ${clamped}/${lesson.words.length} for ${lesson.title}.` }],
      structuredContent: { bestScore: clamped, total: lesson.words.length, updated: true },
    };
  },
});
