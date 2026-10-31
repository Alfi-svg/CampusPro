export const chatbotConfig = {
  apiEnabled: false,
  confidenceThreshold: 0.65,
  maxResponseLength: 120,
  enableFallback: true,
  showSuggestedQuestions: true,
  typingDelay: 500
};

export interface ChatbotIntent {
  id: string;
  name: string;
  keywords: string[];
  exampleQuestions: string[];
  response: string;
  suggestedQuestions: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  isEmergencyAlert?: boolean;
}

export const CHATBOT_INTENTS: ChatbotIntent[] = [
  {
    id: "greeting",
    name: "Greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good evening", "assalamu alaikum", "greetings", "sup"],
    exampleQuestions: ["Hello!", "Hi there", "Good morning CampusCare"],
    response: "Hello! I am CampusCare Assistant, your smart campus companion. How can I help you today?",
    suggestedQuestions: [
      "How do I submit a complaint?",
      "How do I track my complaint?",
      "Wi-Fi is not working in library"
    ]
  },
  {
    id: "complaint_submission",
    name: "Complaint Submission",
    keywords: ["submit", "new complaint", "report issue", "file complaint", "create ticket", "lodge complaint", "problem report"],
    exampleQuestions: ["How to submit a complaint?", "I want to report an issue", "Where do I file a complaint?"],
    response: "Navigate to the 'Submit Complaint' tab. Fill in your location, category, and issue details. Our AI will automatically categorize and prioritize it.",
    suggestedQuestions: [
      "Track an existing complaint",
      "What are the complaint categories?",
      "Who reviews my complaint?"
    ]
  },
  {
    id: "complaint_tracking",
    name: "Complaint Tracking",
    keywords: ["track", "status", "complaint id", "check progress", "ticket status", "where is my complaint", "cc-"],
    exampleQuestions: ["How do I track my complaint?", "Check my ticket status", "Where do I enter my complaint ID?"],
    response: "Open the 'Track Complaint' page and enter your unique Complaint ID (e.g., CC-9012) to inspect real-time department updates and timelines.",
    suggestedQuestions: [
      "Submit a new complaint",
      "Why is my complaint taking time?",
      "Contact administration"
    ]
  },
  {
    id: "classroom_projector",
    name: "Classroom & Projector",
    keywords: ["projector", "hdmi", "screen", "mic", "microphone", "sound system", "podium", "lecture hall", "audio"],
    exampleQuestions: ["The projector in Room 402 is not working", "HDMI cable is broken in lecture hall", "Microphone has no sound"],
    response: "For AV issues like faulty projectors or microphones, submit a ticket under 'Classroom & Projector' so Audio-Visual services can dispatch a technician.",
    suggestedQuestions: [
      "Submit projector complaint",
      "Emergency seminar assistance",
      "Track AV complaint"
    ]
  },
  {
    id: "campus_wifi",
    name: "Campus Wi-Fi",
    keywords: ["wifi", "wi-fi", "internet", "network", "bandwidth", "login portal", "captive portal", "signal", "disconnect"],
    exampleQuestions: ["Campus Wi-Fi is disconnected", "No internet in library", "Cannot log into student network"],
    response: "For Wi-Fi issues, specify your building, floor, and nearest room number under 'Campus Wi-Fi' so Network Operations can check the access point.",
    suggestedQuestions: [
      "Report Wi-Fi outage",
      "Wi-Fi credentials reset",
      "Contact IT department"
    ]
  },
  {
    id: "washroom_cleanliness",
    name: "Washroom & Cleanliness",
    keywords: ["washroom", "toilet", "bathroom", "cleanliness", "dirty", "leakage", "water", "basin", "soap", "trash", "dustbin", "waste"],
    exampleQuestions: ["Washroom on 3rd floor is dirty", "Water basin is leaking", "Overflowing trash bin"],
    response: "Submit a report under 'Washroom & Cleanliness' noting the floor and wing. Sanitation & Housekeeping will immediately be notified for cleaning.",
    suggestedQuestions: [
      "Report water leakage",
      "Cleanliness request in cafeteria",
      "Track sanitation ticket"
    ]
  },
  {
    id: "fan_ac",
    name: "Fan & AC",
    keywords: ["fan", "ac", "air condition", "air conditioner", "cooling", "heat", "temperature", "noisy fan", "ac remote"],
    exampleQuestions: ["AC is not cooling in Room 301", "Ceiling fan is making loud noise", "Classroom is too hot"],
    response: "File a complaint under 'Fan & AC' with your classroom number. The HVAC Maintenance Unit will inspect the compressor or fan motor.",
    suggestedQuestions: [
      "Report broken AC",
      "Classroom heating issue",
      "Track HVAC ticket"
    ]
  },
  {
    id: "electricity",
    name: "Electricity",
    keywords: ["electric", "power", "spark", "wiring", "socket", "switch", "short circuit", "outage", "blackout", "breaker"],
    exampleQuestions: ["Power socket is sparking", "Power cut in building 2", "Exposed wire on floor"],
    response: "Electrical hazards receive CRITICAL priority. Please stay clear of exposed wires or sparking switches while our facilities team isolates the breaker.",
    suggestedQuestions: [
      "Report electrical spark",
      "Power outage in lab",
      "Campus emergency helpline"
    ]
  },
  {
    id: "transportation",
    name: "Transportation",
    keywords: ["bus", "shuttle", "transport", "driver", "route", "commute", "schedule", "timing", "bus stop"],
    exampleQuestions: ["Shuttle bus arrived late", "Bus route schedule", "Missing campus bus at stop A"],
    response: "For bus timing delays or route complaints, select 'Transportation' and include the bus number and route so Transport Logistics can investigate.",
    suggestedQuestions: [
      "Report delayed shuttle",
      "Shuttle timing schedule",
      "Contact transport wing"
    ]
  },
  {
    id: "campus_security",
    name: "Campus Security",
    keywords: ["security", "guard", "gate", "threat", "theft", "lost item", "harassment", "dark path", "lights", "safety", "fight"],
    exampleQuestions: ["Streetlights are dark near gate 2", "Lost my wallet in library", "Security assistance needed"],
    response: "For safety concerns or perimeter lighting issues, file under 'Campus Security'. For active emergencies, immediately contact Campus Security at Ext. 999.",
    suggestedQuestions: [
      "Emergency security contacts",
      "Report broken walkway light",
      "Report lost item"
    ]
  },
  {
    id: "admin_contact",
    name: "Administration Contact",
    keywords: ["admin", "office", "contact", "email", "phone", "hours", "head", "dean", "helpdesk", "proctor"],
    exampleQuestions: ["How do I contact campus admin?", "What are Proctor office hours?", "Campus helpdesk number"],
    response: "Campus Admin is available Sunday to Thursday, 9 AM - 5 PM. Office: Admin Block Rm 102. Phone: +880-2-998877, Email: campuscare@university.edu.",
    suggestedQuestions: [
      "Emergency helpline numbers",
      "IT department contact",
      "Proctor office location"
    ]
  },
  {
    id: "general_help",
    name: "General Help",
    keywords: ["help", "what can you do", "guide", "info", "how does this work", "options", "features", "menu"],
    exampleQuestions: ["How does CampusCare work?", "What can you do?", "Help me get started"],
    response: "CampusCare AI automates university complaint tracking, AI severity triage, and department routing. You can report issues, check updates, or ask me questions anytime!",
    suggestedQuestions: [
      "Submit a complaint",
      "Check recent complaints",
      "Safety emergency help"
    ]
  }
];

// Emergency words that trigger immediate safety notice
const EMERGENCY_KEYWORDS = [
  "fire", "smoke", "explosion", "blood", "attack", "weapon", "harassment", 
  "danger", "emergency", "life threatening", "injury", "ambulance", "police"
];

export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchChatbotIntent(rawInput: string): {
  intent: ChatbotIntent | null;
  confidence: number;
  isEmergency: boolean;
  response: string;
  suggestedQuestions: string[];
} {
  const normalized = normalizeText(rawInput);

  // Check for immediate emergency / safety hazard
  const hasEmergency = EMERGENCY_KEYWORDS.some(kw => {
    const reg = new RegExp(`\\b${kw}\\b`, "i");
    return reg.test(normalized);
  });

  if (hasEmergency) {
    return {
      intent: null,
      confidence: 1.0,
      isEmergency: true,
      response: "⚠️ IMMEDIATE DANGER DETECTED: If anyone is in immediate physical danger, medical crisis, or fire, please immediately call Campus Emergency at 999 or Campus Security Dispatch at +880-1700-000999! Do not wait for ticket resolution.",
      suggestedQuestions: [
        "Campus Security Emergency Desk",
        "Medical Center Helpline",
        "Report physical security incident"
      ]
    };
  }

  // Tokenize user words
  const words = normalized.split(" ").filter(w => w.length > 1);

  let bestIntent: ChatbotIntent | null = null;
  let highestScore = 0;

  for (const intent of CHATBOT_INTENTS) {
    let score = 0;

    // Check direct phrase match
    for (const kw of intent.keywords) {
      if (normalized.includes(kw)) {
        score += 0.45;
      }
    }

    // Check example question similarity
    for (const eq of intent.exampleQuestions) {
      const eqNorm = normalizeText(eq);
      if (normalized === eqNorm) {
        score += 0.8;
      } else if (normalized.includes(eqNorm) || eqNorm.includes(normalized)) {
        score += 0.4;
      }
    }

    // Check word overlaps
    for (const word of words) {
      for (const kw of intent.keywords) {
        if (kw === word) {
          score += 0.3;
        } else if (kw.includes(word) && word.length > 3) {
          score += 0.15;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  }

  // Normalize confidence between 0 and 1
  const confidence = Math.min(1.0, highestScore);

  if (bestIntent && confidence >= chatbotConfig.confidenceThreshold) {
    return {
      intent: bestIntent,
      confidence,
      isEmergency: false,
      response: bestIntent.response,
      suggestedQuestions: bestIntent.suggestedQuestions
    };
  }

  // Fallback response specified by instructions
  return {
    intent: null,
    confidence,
    isEmergency: false,
    response: "I'm not sure about that. Please select one of the suggested questions or contact campus administration.",
    suggestedQuestions: [
      "How do I submit a complaint?",
      "How do I track my complaint?",
      "Wi-Fi is not working in library",
      "Contact campus administration"
    ]
  };
}
