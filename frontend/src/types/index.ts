// types/index.ts
// Re-export auth-related types from types/auth.
// Represents a citizen-reported issue or feedback for a smart city platform
export interface Report {
  _id: string;
  user: string; // User ID or populated UserProfile (the citizen reporting the issue)
  title: string; // e.g., "Broken Streetlight on Main St"
  description: string; // Detailed description of the issue
  category: "infrastructure" | "waste" | "traffic" | "safety" | "other"; // Categorize issues
  status: "open" | "in_progress" | "resolved" | "cancelled"; // Track resolution
  assignedWorker?: string; // Optional: Worker assigned to resolve (user with "worker" role)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Represents a comment on a report
export interface ReportComment {
  _id: string;
  report: string; // Reference to Report ID
  user: string; // User ID or populated UserProfile (citizen, admin, or worker)
  text: string; // Comment content
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
