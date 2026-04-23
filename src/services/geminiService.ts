export interface PacingStats {
  completedCount: number;
  totalProblems: number;
  daysRemaining: number;
  requiredRate: number;
  backlog: number;
  isBehind: boolean;
  isAhead?: boolean;
  topicMastery: Array<{ label: string; value: string }>;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  runtime: string;
  memory: string;
  efficiencyScore: number;
  nexusHint: string;
}

export async function simulateExecution(code: string, language: string): Promise<ExecutionResult> {
  try {
    const response = await fetch('/api/ai/simulate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, language })
    });
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Execution Simulation Error:", error);
    return {
      stdout: "",
      stderr: "Nexus engine timed out or encountered a network error.",
      runtime: "0ms",
      memory: "0KB",
      efficiencyScore: 0,
      nexusHint: "System failure."
    };
  }
}

export async function generateRecoveryPlan(stats: PacingStats, customQuery?: string): Promise<string> {
  try {
    const response = await fetch('/api/ai/recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stats, customQuery })
    });
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    
    const data = await response.json();
    return data.text || "Unable to generate insights at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI Coach is taking a break. Focus on your backlog of " + stats.backlog + " problems.";
  }
}
