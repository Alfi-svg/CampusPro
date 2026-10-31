import { AIAnalysisResult, ComplaintCategory, ComplaintPriority } from "./types";

export interface AnalyzeComplaintInput {
  studentName?: string;
  studentId?: string;
  department?: string;
  campusLocation: string;
  category: ComplaintCategory;
  title: string;
  description: string;
}

const CATEGORY_TO_DEPARTMENT: Record<ComplaintCategory, string> = {
  "Classroom & Projector": "Audio-Visual & Multimedia Services",
  "Campus Wi-Fi": "IT Network & Infrastructure",
  "Washroom & Cleanliness": "Sanitation & Housekeeping",
  "Fan & AC": "HVAC Maintenance Unit",
  "Electricity": "Electrical & Facilities Division",
  "Transportation": "Transport & Logistics Wing",
  "Campus Security": "Campus Safety & Security"
};

/**
 * Deterministic rule-based fallback analysis used when Gemini API key is not configured,
 * quota is exceeded, or network fails.
 */
export function getDeterministicDemoAnalysis(input: AnalyzeComplaintInput): AIAnalysisResult {
  const text = `${input.title} ${input.description}`.toLowerCase();
  let priority: ComplaintPriority = "MEDIUM";
  let urgencyReason = "Standard campus maintenance request requiring standard response window.";

  // High urgency keywords
  if (
    text.includes("spark") ||
    text.includes("fire") ||
    text.includes("smoke") ||
    text.includes("burn") ||
    text.includes("shock") ||
    text.includes("exposed wire") ||
    text.includes("short circuit") ||
    text.includes("danger") ||
    text.includes("emergency")
  ) {
    priority = "CRITICAL";
    urgencyReason = "Potential safety hazard, electrical risk, or physical danger requiring immediate isolation.";
  } else if (
    text.includes("exam") ||
    text.includes("seminar") ||
    text.includes("guest") ||
    text.includes("dark") ||
    text.includes("unsafe") ||
    text.includes("leak") ||
    text.includes("flood") ||
    text.includes("overheating") ||
    text.includes("auditorium") ||
    text.includes("harassment")
  ) {
    priority = "HIGH";
    urgencyReason = "Significant academic or operational disruption affecting a large group of students.";
  } else if (
    text.includes("dirty") ||
    text.includes("slow") ||
    text.includes("remote") ||
    text.includes("flicker") ||
    text.includes("noise") ||
    text.includes("dust")
  ) {
    priority = "MEDIUM";
    urgencyReason = "Moderate inconvenience impacting routine campus activities.";
  } else {
    priority = "LOW";
    urgencyReason = "Non-urgent convenience or scheduled maintenance feedback.";
  }

  // Recommended actions tailored by category
  let recommendedAction = "Review incident log, dispatch field inspector, and resolve within standard SLA.";
  if (input.category === "Electricity") {
    recommendedAction = "Trip main circuit breaker, cordon off hazard zone, and dispatch certified electrician with safety multimeter.";
  } else if (input.category === "Campus Wi-Fi") {
    recommendedAction = "Inspect local Access Point signal attenuation, check PoE switch port, and rebalance radio frequencies.";
  } else if (input.category === "Classroom & Projector") {
    recommendedAction = "Test projector lamp wattage, inspect HDMI matrix switch, and replace damaged video adapter.";
  } else if (input.category === "Washroom & Cleanliness") {
    recommendedAction = "Clear drainage blockage, sanitize surfaces with hospital-grade disinfectant, and restock supplies.";
  } else if (input.category === "Fan & AC") {
    recommendedAction = "Check refrigerant pressure, replace blower motor capacitor, and inspect air filter integrity.";
  } else if (input.category === "Campus Security") {
    recommendedAction = "Increase physical security patrol interval, verify CCTV camera angle, and inspect perimeter lighting.";
  } else if (input.category === "Transportation") {
    recommendedAction = "Check GPS telemetry for shuttle delays, optimize dispatch schedule, and notify student route group.";
  }

  const assignedDepartment = CATEGORY_TO_DEPARTMENT[input.category] || "Student Affairs & Administration";

  return {
    category: input.category,
    priority,
    summary: `[DEMO ANALYSIS] Issue reported at ${input.campusLocation}: "${input.title}". Assessment indicates ${priority.toLowerCase()} severity.`,
    recommended_action: recommendedAction,
    assigned_department: assignedDepartment,
    urgency_reason: urgencyReason,
    isDemo: true
  };
}

/**
 * Server-side function that queries Google Gemini API or falls back to deterministic analysis.
 */
export async function analyzeComplaintWithGemini(
  input: AnalyzeComplaintInput
): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key" || apiKey === "your_gemini_api_key_here") {
    console.warn("GEMINI_API_KEY not configured or set to placeholder. Using deterministic demo analysis.");
    return getDeterministicDemoAnalysis(input);
  }

  const prompt = `You are the AI triage engine for CampusCare AI, a university campus complaint management platform.
Analyze this student complaint and produce structured triage recommendations:

Student Location: ${input.campusLocation}
Category Chosen by Student: ${input.category}
Complaint Title: ${input.title}
Detailed Description: ${input.description}

You must return ONLY a raw JSON object (without markdown code fences, without backticks, without preamble) matching this schema:
{
  "category": "${input.category}",
  "priority": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "summary": "1-2 sentence objective summary of the problem and location",
  "recommended_action": "Precise practical technical action for maintenance staff",
  "assigned_department": "${CATEGORY_TO_DEPARTMENT[input.category] || "Electrical & Facilities Division"}",
  "urgency_reason": "Specific risk or reason justifying the assigned priority"
}

Allowed Categories: "Classroom & Projector", "Campus Wi-Fi", "Washroom & Cleanliness", "Fan & AC", "Electricity", "Transportation", "Campus Security"
Allowed Priorities: "LOW", "MEDIUM", "HIGH", "CRITICAL"
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Gemini API error (Status ${res.status}): ${errText}`);
      const fallback = getDeterministicDemoAnalysis(input);
      fallback.summary = `[DEMO ANALYSIS (API HTTP ${res.status})] ${fallback.summary.replace("[DEMO ANALYSIS] ", "")}`;
      return fallback;
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.error("Gemini returned empty candidate text");
      return getDeterministicDemoAnalysis(input);
    }

    // Clean text in case model wrapped it in code fences
    const cleaned = candidateText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    const validPriorities: ComplaintPriority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    const priority: ComplaintPriority = validPriorities.includes(parsed.priority)
      ? parsed.priority
      : "MEDIUM";

    return {
      category: parsed.category || input.category,
      priority,
      summary: parsed.summary || `${input.title} at ${input.campusLocation}`,
      recommended_action: parsed.recommended_action || "Investigate and resolve problem at reported location.",
      assigned_department: parsed.assigned_department || CATEGORY_TO_DEPARTMENT[input.category],
      urgency_reason: parsed.urgency_reason || "Assessed based on campus safety and student impact guidelines.",
      isDemo: false
    };
  } catch (error) {
    console.error("Exception during Gemini API analysis call:", error);
    const fallback = getDeterministicDemoAnalysis(input);
    fallback.summary = `[DEMO ANALYSIS (Network Error)] ${fallback.summary.replace("[DEMO ANALYSIS] ", "")}`;
    return fallback;
  }
}
