export type UserRole =
  | "SUPER_ADMIN"
  | "SCHOOL_ADMIN"
  | "PRINCIPAL"
  | "VICE_PRINCIPAL"
  | "TEACHER"
  | "CLASS_TEACHER"
  | "STUDENT"
  | "PARENT"
  | "ACCOUNTANT"
  | "LIBRARIAN"
  | "STAFF";

export type PermissionAction =
  | "VIEW"
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "EXPORT"
  | "MANAGE";

export type PermissionResource =
  | "STUDENTS"
  | "TEACHERS"
  | "STAFF"
  | "ACADEMICS"
  | "ATTENDANCE"
  | "EXAMINATIONS"
  | "RESULTS"
  | "FINANCE"
  | "ADMISSIONS"
  | "LIBRARY"
  | "NOTICES"
  | "REPORTS"
  | "SETTINGS"
  | "CMS";

export interface UserSession {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isDemoUser: boolean;
  envMode: "demo" | "production";
  schoolId?: string;
  permissions?: string[];
}

export interface BanglaSchoolSettings {
  nameBn: string;
  nameEn: string;
  eiin: string;
  establishedYear: number;
  address: string;
  phone: string;
  email: string;
  logoUrl?: string;
  principalMessage?: string;
  numerals: "bn" | "en";
  primaryColor: string;
}

export interface StudentSummary {
  id: string;
  studentId: string;
  admissionNo: string;
  nameBn: string;
  nameEn: string;
  className: string;
  section: string;
  rollNumber: number;
  guardianName: string;
  guardianPhone: string;
  status: "ACTIVE" | "INACTIVE" | "TRANSFERRED" | "PASSED";
}

export interface TeacherSummary {
  id: string;
  employeeId: string;
  nameBn: string;
  nameEn: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  status: "ACTIVE" | "ON_LEAVE" | "RESIGNED";
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  classId: string;
  sectionId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE";
  note?: string;
}
