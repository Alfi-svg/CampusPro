import { Complaint, ComplaintCategory, ComplaintPriority, ComplaintStatus } from "./types";

const STORAGE_KEY = "campuscare_complaints_v1";

export const INITIAL_DEMO_COMPLAINTS: Complaint[] = [
  {
    id: "CC-9012",
    studentName: "Tahmid Rahman",
    studentId: "CSE-2022-045",
    department: "Computer Science & Engineering",
    campusLocation: "Building 3, Room 402 (CSE Lab 2)",
    category: "Electricity",
    title: "Exposed Electrical Wiring & Sparking Near Power Strip",
    description: "During today's 2:00 PM lab session, a heavy spark came out from the floor cable duct right beneath workbench 4. It caused a mild burning smell and power tripped across three tables. It is an immediate safety hazard for students.",
    priority: "CRITICAL",
    status: "In Progress",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    assignedDepartment: "Electrical & Facilities Division",
    aiAnalysis: {
      category: "Electricity",
      priority: "CRITICAL",
      summary: "Live electrical spark and burning smell detected in student lab with active power trip.",
      recommended_action: "Isolate circuit breaker immediately and dispatch electrical safety crew.",
      assigned_department: "Electrical & Facilities Division",
      urgency_reason: "High risk of electrical fire or electrocution during active student lab hours.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        note: "Complaint submitted with urgent flag."
      },
      {
        status: "Under Review",
        timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        note: "AI flagged as CRITICAL. Routed to Facilities supervisor."
      },
      {
        status: "In Progress",
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        note: "Electrician assigned (Badge #EL-14). Lab 2 breaker #4 isolated."
      }
    ]
  },
  {
    id: "CC-8841",
    studentName: "Fatima Noor",
    studentId: "BBA-2023-112",
    department: "School of Business",
    campusLocation: "Central Library, 2nd Floor Quiet Zone",
    category: "Campus Wi-Fi",
    title: "Complete Wi-Fi Deadzone in Library Reference Section",
    description: "The 'Campus-Secure-5G' SSID repeatedly disconnects and shows 'No Internet Access' near desks 14-26. We cannot access JSTOR and digital research repositories for midterm papers.",
    priority: "MEDIUM",
    status: "Under Review",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "IT Network & Infrastructure",
    aiAnalysis: {
      category: "Campus Wi-Fi",
      priority: "MEDIUM",
      summary: "Wi-Fi access point failure or signal attenuation affecting student study zones in the library.",
      recommended_action: "Check AP #LIB-2F-04 status, reboot access point, and perform RF channel survey.",
      assigned_department: "IT Network & Infrastructure",
      urgency_reason: "Disrupts essential academic research and midterm exam preparations.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        note: "Complaint logged by student."
      },
      {
        status: "Under Review",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        note: "Assigned to Network Operations Center."
      }
    ]
  },
  {
    id: "CC-8729",
    studentName: "Arif Hossain",
    studentId: "EEE-2021-089",
    department: "Electrical & Electronic Engineering",
    campusLocation: "Main Auditorium, Stage Area",
    category: "Classroom & Projector",
    title: "Projector Lamp Failure Ahead of Guest Seminar",
    description: "The central ceiling projector in Main Auditorium turns off with an overheating indicator light after 3 minutes. The international guest lecture is tomorrow at 10:00 AM.",
    priority: "HIGH",
    status: "Submitted",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "Audio-Visual & Multimedia Services",
    aiAnalysis: {
      category: "Classroom & Projector",
      priority: "HIGH",
      summary: "Audiovisual hardware breakdown in high-capacity hall scheduled for university guest seminar.",
      recommended_action: "Replace projector lamp and test cooling fan filter immediately.",
      assigned_department: "Audio-Visual & Multimedia Services",
      urgency_reason: "High public visibility event scheduled within 24 hours.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        note: "Initial report received."
      }
    ]
  },
  {
    id: "CC-8510",
    studentName: "Nusrat Jahan",
    studentId: "ARC-2024-034",
    department: "Architecture",
    campusLocation: "East Academic Block, 3rd Floor Restrooms",
    category: "Washroom & Cleanliness",
    title: "Severe Water Leakage and Clogged Basin Drain",
    description: "Continuous water overflow from the middle wash basin onto the floor has created a slipping hazard. Janitorial service has not attended since morning.",
    priority: "MEDIUM",
    status: "Resolved",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "Sanitation & Housekeeping",
    aiAnalysis: {
      category: "Washroom & Cleanliness",
      priority: "MEDIUM",
      summary: "Plumbing blockage causing floor flooding and slip hazard in East Block restroom.",
      recommended_action: "Unclog drain pipe, mop standing water, and place wet-floor warning signage.",
      assigned_department: "Sanitation & Housekeeping",
      urgency_reason: "Sanitary violation and physical slip danger in heavily trafficked corridor.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        note: "Report registered."
      },
      {
        status: "In Progress",
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        note: "Plumber unclogged P-trap and sealed pipe joint."
      },
      {
        status: "Resolved",
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        note: "Area disinfected, dry, and verified operational by Housekeeping Supervisor."
      }
    ]
  },
  {
    id: "CC-8395",
    studentName: "Saiful Islam",
    studentId: "ME-2022-076",
    department: "Mechanical Engineering",
    campusLocation: "Lecture Hall 101, Science Building",
    category: "Fan & AC",
    title: "Both Split AC Units Emitting Burning Odor and Rattle",
    description: "The two wall-mounted AC units make a loud metallic screeching sound and do not cool. With 85 students in the class, room temperature exceeds 34°C.",
    priority: "HIGH",
    status: "In Progress",
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "HVAC Maintenance Unit",
    aiAnalysis: {
      category: "Fan & AC",
      priority: "HIGH",
      summary: "Blower motor bearing failure in lecture hall creating excessive noise and heat distress.",
      recommended_action: "Shut down units to avoid compressor burnout, replace blower fan bearings.",
      assigned_department: "HVAC Maintenance Unit",
      urgency_reason: "Classroom environment unsuitable for teaching due to heat and mechanical noise.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
        note: "Submitted by class representative."
      },
      {
        status: "In Progress",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        note: "Technician dispatched with replacement fan assembly."
      }
    ]
  },
  {
    id: "CC-8204",
    studentName: "Maliha Tasnim",
    studentId: "LAW-2023-018",
    department: "Department of Law",
    campusLocation: "South Gate 2 / Female Dormitory Pathway",
    category: "Campus Security",
    title: "Broken Streetlamp on Evening Walkway Near South Gate",
    description: "The path connecting South Gate 2 to Dormitory 3 is pitch dark after 6:30 PM because two overhead solar floodlights are broken. Multiple students feel unsafe walking back from library.",
    priority: "HIGH",
    status: "Under Review",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "Campus Safety & Security",
    aiAnalysis: {
      category: "Campus Security",
      priority: "HIGH",
      summary: "Poor lighting in dormitory perimeter creating student safety vulnerability at night.",
      recommended_action: "Deploy temporary security patrol and replace LED fixture drivers on poles 4 and 5.",
      assigned_department: "Campus Safety & Security",
      urgency_reason: "Critical safety risk for female students walking after dusk.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        note: "Student safety concern filed."
      },
      {
        status: "Under Review",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        note: "Security supervisor increased evening patrol frequency; pending maintenance."
      }
    ]
  },
  {
    id: "CC-7988",
    studentName: "Zubair Ahmed",
    studentId: "CIV-2022-092",
    department: "Civil Engineering",
    campusLocation: "Campus Bus Stop A (Dhanmondi Route)",
    category: "Transportation",
    title: "Campus Shuttle Bus 04 Missing Scheduled 5:15 PM Departure",
    description: "Bus #04 consistently departs 30 minutes late or skips the Dhanmondi route on Thursdays, leaving over 60 commuting students stranded until the night schedule.",
    priority: "LOW",
    status: "Resolved",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "Transport & Logistics Wing",
    aiAnalysis: {
      category: "Transportation",
      priority: "LOW",
      summary: "Repeated bus schedule deviations on commuter transit route.",
      recommended_action: "Audit driver logs and assign backup shuttle vehicle during Thursday peak hours.",
      assigned_department: "Transport & Logistics Wing",
      urgency_reason: "Operational delay affecting commuter convenience but without immediate safety hazard.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        note: "Commuter feedback recorded."
      },
      {
        status: "In Progress",
        timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
        note: "Transport officer adjusted vehicle roster."
      },
      {
        status: "Resolved",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        note: "Backup 40-seater bus permanently added to 5:15 PM slot."
      }
    ]
  },
  {
    id: "CC-7651",
    studentName: "Kazi Rayhan",
    studentId: "ENG-2024-009",
    department: "Department of English",
    campusLocation: "Main Cafeteria, Counter B",
    category: "Washroom & Cleanliness",
    title: "Overflowing Waste Bins and Pest Infestation Near Food Area",
    description: "The general recycling and food waste containers outside counter B are spilling over with organic food scraps. Several stray cats and flies are clustering near eating tables.",
    priority: "MEDIUM",
    status: "Submitted",
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    assignedDepartment: "Sanitation & Housekeeping",
    aiAnalysis: {
      category: "Washroom & Cleanliness",
      priority: "MEDIUM",
      summary: "Waste accumulation posing hygienic hazard adjacent to food service stations.",
      recommended_action: "Empty and wash bins, establish hourly clearance routine during lunch peak.",
      assigned_department: "Sanitation & Housekeeping",
      urgency_reason: "Health and food safety violation in public student dining space.",
      isDemo: false
    },
    timeline: [
      {
        status: "Submitted",
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        note: "Cleanliness ticket created."
      }
    ]
  }
];

export const DEPARTMENTS_LIST = [
  "Electrical & Facilities Division",
  "IT Network & Infrastructure",
  "Audio-Visual & Multimedia Services",
  "Sanitation & Housekeeping",
  "HVAC Maintenance Unit",
  "Campus Safety & Security",
  "Transport & Logistics Wing",
  "Student Affairs & Administration"
];

function notifyStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("campuscare_data_updated"));
  }
}

export function getComplaints(): Complaint[] {
  if (typeof window === "undefined") {
    return INITIAL_DEMO_COMPLAINTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
      return INITIAL_DEMO_COMPLAINTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
      return INITIAL_DEMO_COMPLAINTS;
    }
    return parsed;
  } catch (e) {
    console.error("Failed to load complaints from localStorage", e);
    return INITIAL_DEMO_COMPLAINTS;
  }
}

export function getComplaintById(id: string): Complaint | undefined {
  const all = getComplaints();
  const cleanId = id.trim().toUpperCase();
  return all.find(c => c.id.toUpperCase() === cleanId);
}

export function saveComplaint(complaint: Complaint): Complaint {
  const all = getComplaints();
  const index = all.findIndex(c => c.id === complaint.id);
  let updated: Complaint[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = complaint;
  } else {
    updated = [complaint, ...all];
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyStorageChange();
  }
  return complaint;
}

export function updateComplaintStatus(
  id: string,
  status: ComplaintStatus,
  note?: string
): Complaint | undefined {
  const all = getComplaints();
  const index = all.findIndex(c => c.id.toUpperCase() === id.toUpperCase());
  if (index === -1) return undefined;

  const target = all[index];
  const now = new Date().toISOString();
  const updatedComplaint: Complaint = {
    ...target,
    status,
    updatedAt: now,
    timeline: [
      ...target.timeline,
      {
        status,
        timestamp: now,
        note: note || `Status updated to ${status} by campus administrator.`
      }
    ]
  };

  all[index] = updatedComplaint;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    notifyStorageChange();
  }
  return updatedComplaint;
}

export function assignComplaintDepartment(
  id: string,
  department: string
): Complaint | undefined {
  const all = getComplaints();
  const index = all.findIndex(c => c.id.toUpperCase() === id.toUpperCase());
  if (index === -1) return undefined;

  const target = all[index];
  const now = new Date().toISOString();
  const updatedComplaint: Complaint = {
    ...target,
    assignedDepartment: department,
    updatedAt: now,
    timeline: [
      ...target.timeline,
      {
        status: target.status,
        timestamp: now,
        note: `Reassigned to ${department} by administration.`
      }
    ]
  };

  all[index] = updatedComplaint;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    notifyStorageChange();
  }
  return updatedComplaint;
}

export function deleteComplaint(id: string): boolean {
  const all = getComplaints();
  const filtered = all.filter(c => c.id.toUpperCase() !== id.toUpperCase());
  if (filtered.length === all.length) return false;

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    notifyStorageChange();
  }
  return true;
}

export function resetToDemoData(): Complaint[] {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
    notifyStorageChange();
  }
  return INITIAL_DEMO_COMPLAINTS;
}

export function generateComplaintId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CC-${randomNum}`;
}
