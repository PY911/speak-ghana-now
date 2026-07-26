import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findLesson } from "@/lib/lessons";

export default defineTool({
  name: "get_lesson",
  title: "Get lesson content",
  description: "Get the full content of one GoGhana lesson: vocabulary, pronunciations, example sentences, grammar tip and cultural note.",
  inputSchema: {
    languageCode: z.string().describe("Language code, e.g. 'twi'."),
    lessonId: z.string().describe("Lesson id as returned by list_lessons."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ languageCode, lessonId }) => {
    const lesson = findLesson(languageCode.trim().toLowerCase(), lessonId.trim());
    if (!lesson) {
      return {
        content: [{ type: "text", text: `No lesson '${lessonId}' in language '${languageCode}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(lesson, null, 2) }],
      structuredContent: { lesson },
    };
  },
});
