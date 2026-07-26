import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLanguages from "./tools/list-languages";
import listLessons from "./tools/list-lessons";
import getLesson from "./tools/get-lesson";
import getMyProgress from "./tools/get-my-progress";
import recordLessonResult from "./tools/record-lesson-result";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "goghana-mcp",
  title: "GoGhana",
  version: "0.1.0",
  instructions:
    "Tools for GoGhana, an app for learning Ghanaian languages (Twi, Ga, Ewe, Fante). Use list_languages and list_lessons to browse the course, get_lesson for vocabulary and cultural notes, get_my_progress for the signed-in learner's XP and streak, and record_lesson_result to save a practice score.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLanguages, listLessons, getLesson, getMyProgress, recordLessonResult],
});
