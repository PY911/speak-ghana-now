import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findLanguage } from "@/lib/lessons";

export default defineTool({
  name: "list_lessons",
  title: "List lessons",
  description: "List the units and lessons for one GoGhana language, given its language code (e.g. twi, ga, ewe, fante).",
  inputSchema: {
    languageCode: z.string().describe("Language code, e.g. 'twi'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ languageCode }) => {
    const lang = findLanguage(languageCode.trim().toLowerCase());
    if (!lang) {
      return { content: [{ type: "text", text: `Unknown language code: ${languageCode}` }], isError: true };
    }
    const units = lang.units.map((u) => ({
      id: u.id,
      title: u.title,
      description: u.description,
      lessons: lang.lessons
        .filter((l) => l.unit === u.id)
        .map((l) => ({ id: l.id, title: l.title, wordCount: l.words.length })),
    }));
    const payload = { language: { code: lang.code, name: lang.name }, units };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
