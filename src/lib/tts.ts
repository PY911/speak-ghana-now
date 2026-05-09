// Browser speech synthesis with graceful fallback.
// Voices for Ghanaian languages are rarely installed; we fall back to a
// generic English voice so learners at least hear an attempted pronunciation.

let cachedVoices: SpeechSynthesisVoice[] | null = null;

function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  if (cachedVoices && cachedVoices.length) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

export function speak(text: string, voiceLang?: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = getVoices();
    // Try to find a voice for the requested BCP-47 prefix; otherwise prefer
    // an English voice (best phonetic approximation for Latin orthography).
    const match =
      (voiceLang && voices.find((v) => v.lang.toLowerCase().startsWith(voiceLang.toLowerCase()))) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (match) u.voice = match;
    u.rate = 0.85;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
  }
}

export const ttsAvailable = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;
