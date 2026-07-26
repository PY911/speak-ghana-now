import { defineTool } from "@lovable.dev/mcp-js";
import { LANGUAGES } from "@/lib/lessons";

export default defineTool({
  name: "list_languages",
  title: "List languages",
  description: "List the Ghanaian languages available in GoGhana, with their unit and lesson counts.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const languages = LANGUAGES.map((l) => ({
      code: l.code,
      name: l.name,
      region: l.region,
      greeting: l.greeting,
      available: l.available,
      unitCount: l.units.length,
      lessonCount: l.lessons.length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(languages, null, 2) }],
      structuredContent: { languages },
    };
  },
});
