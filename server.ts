import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();

// Increase JSON payload limit if needed
app.use(express.json({ limit: '1mb' }));
app.use(cors());

const PORT = 3000;

let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
    if (!key) {
      console.warn("GEMINI_API_KEY is missing on server.");
    }
    aiInstance = new GoogleGenAI({ apiKey: key || 'MISSING_KEY' });
  }
  return aiInstance;
}

// Ensure the Express API works on Vercel or locally
app.post('/api/ai/simulate', async (req, res) => {
  const { code, language } = req.body;
  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const prompt = `
    You are the Nexus Intelligence Engine, a high-performance code execution simulator.
    Your task is to accurately predict the output of the provided code snippet as if it were run in a real environment.

    LANGUAGE: ${language}
    CODE:
    \`\`\`${language}
    ${code}
    \`\`\`

    TASK:
    1. Determine the Standard Output (stdout).
    2. Identify any Syntax or Runtime Errors (stderr).
    3. Estimate Runtime (in ms) and Memory Usage (in KB/MB) based on complexity and standard language overhead.
    4. Provide a "Nexus Hint" - a tactical observation about the time/space complexity or a potential edge case.
    5. Provide an Efficiency Score (0-100).

    JSON OUTPUT FORMAT (Mandatory - return ONLY the JSON block):
    {
      "stdout": "the standard output",
      "stderr": "any error messages or empty string",
      "runtime": "Xms",
      "memory": "X.XMB",
      "efficiencyScore": 85,
      "nexusHint": "Efficiency observation..."
    }
  `;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    
    res.json({
      stdout: data.stdout || "",
      stderr: data.stderr || "",
      runtime: data.runtime || "0ms",
      memory: data.memory || "0KB",
      efficiencyScore: data.efficiencyScore || 0,
      nexusHint: data.nexusHint || "No technical observation available."
    });
  } catch (error) {
    console.error("Execution Simulation Error:", error);
    res.json({
      stdout: "",
      stderr: "Nexus engine timed out or encountered an internal error.",
      runtime: "0ms",
      memory: "0KB",
      efficiencyScore: 0,
      nexusHint: "System failure."
    });
  }
});

app.post('/api/ai/recovery', async (req, res) => {
  const { stats, customQuery } = req.body;
  if (!stats) return res.status(400).json({ error: "Missing stats" });

  const statusLabel = stats.isBehind ? "BEHIND SCHEDULE" : stats.isAhead ? "AHEAD OF SCHEDULE" : "ON TRACK";
  
  const basePrompt = `
    You are an expert DSA Coach and Pacing Strategist. 
    Analyze the following student progress data and provide strategic advice.
    
    DATA:
    - Total Problems in Sheet: ${stats.totalProblems}
    - Problems Solved: ${stats.completedCount}
    - Problems Remaining: ${stats.totalProblems - stats.completedCount}
    - Days Remaining: ${stats.daysRemaining}
    - Required Daily Solve Rate: ${stats.requiredRate.toFixed(2)} problems/day
    - Backlog: ${stats.backlog}
    - Status: ${statusLabel}
    - Topic Mastery: ${JSON.stringify(stats.topicMastery)}
  `;

  const instructionPrompt = customQuery 
    ? `SPECIFIC USER QUERY: "${customQuery}"
       Answer the user's question specifically using their progress data as context. Provide a tactical plan.`
    : `OBJECTIVE: Analyze their status and provide a "Stress-Free Recovery Phase" plan.
       Suggest focus topics and specific steps for tomorrow.`;

  const formatPrompt = `
    OUTPUT FORMAT:
    - Use Markdown. 
    - KEEP IT EXTREMELY CONCISE.
    - **MANDATORY**: Use exactly 4-5 bullet points.
    - **MANDATORY**: Bold every key number, percentage, or date mentioned.
    - **MANDATORY**: No long paragraphs. Use one-line intros/outros only.
    - Do not use H1 or H2 tags.
  `;

  const prompt = basePrompt + "\n" + instructionPrompt + "\n" + formatPrompt;

  try {
    const response = await getAI().models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    res.json({ text: response.text || "Unable to generate insights at this moment. Keep pushing!" });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.json({ text: "The AI Coach is taking a break. Focus on your backlog of " + stats.backlog + " problems." });
  }
});

// Vercel Serverless Function compatibility
export default app;

// Only run the server loop if not executing as a Vercel serverless function
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  async function startServer() {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  startServer();
}
