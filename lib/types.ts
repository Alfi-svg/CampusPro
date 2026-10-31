export type ComplaintCategory =
  | "Classroom & Projector"
  | "Campus Wi-Fi"
  | "Washroom & Cleanliness"
  | "Fan & AC"
  | "Electricity"
  | "Transportation"
  | "Campus Security";

export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "In Progress"
  | "Resolved"
  | "Rejected";

export interface AIAnalysisResult {
  category: ComplaintCategory;
  priority: ComplaintPriority;
  summary: string;
  recommended_action: string;
  assigned_department: string;
  urgency_reason: string;
  isDemo?: boolean;
}

export interface ComplaintTimelineEntry {
  status: ComplaintStatus;
  timestamp: string;
  note: string;
}

export interface Complaint {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  campusLocation: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  assignedDepartment: string;
  aiAnalysis: AIAnalysisResult;
  timeline: ComplaintTimelineEntry[];
}

export type UserRole = "student" | "admin";

export interface DepartmentInfo {
  id: string;
  name: string;
  head: string;
  email: string;
  phone: string;
  activeTickets: number;
  avgResolutionHours: number;
}
