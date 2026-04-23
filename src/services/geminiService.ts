import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '') || '' 
});

export interface PacingStats {
  completedCount: number;
  totalProblems: number;
  daysRemaining: number;
  requiredRate: number;
  backlog: number;
  isBehind: boolean;
  topicMastery: Array<{ label: string; value: string }>;
}

export async function generateRecoveryPlan(stats: PacingStats): Promise<string> {
  const prompt = `
    You are an expert DSA Coach and Pacing Strategist. 
    Analyze the following student progress data and provide a "Stress-Free Recovery Phase" plan.
    
    DATA:
    - Total Problems in Sheet: ${stats.totalProblems}
    - Problems Solved: ${stats.completedCount}
    - Problems Remaining: ${stats.totalProblems - stats.completedCount}
    - Days Remaining: ${stats.daysRemaining}
    - Required Daily Solve Rate: ${stats.requiredRate.toFixed(2)} problems/day
    - Backlog (how many problems they are behind target): ${stats.backlog}
    - Status: ${stats.isBehind ? "BEHIND SCHEDULE" : "ON TRACK"}
    - Topic Mastery: ${JSON.stringify(stats.topicMastery)}

    OBJECTIVE:
    1. Acknowledge their status (encouraging if on track, firm but supportive if behind).
    2. If behind, calculate exactly how much extra effort is needed (e.g., "solve 2 extra problems for the next 5 days").
    3. Suggest which topics to focus on based on their mastery levels (prioritize low mastery topics).
    4. Provide specific, actionable steps for "Tomorrow" to get back on track.
    5. Keep the tone professional, technical, and motivating.
    
    OUTPUT FORMAT:
    - Use Markdown. 
    - Keep it concise (max 200 words).
    - Use bold text for key figures.
    - Do not use H1 or H2 tags; use bold headings instead.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Unable to generate insights at this moment. Keep pushing!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI Coach is taking a break. Focus on your backlog of " + stats.backlog + " problems.";
  }
}
