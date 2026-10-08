import { UserRole, PermissionAction, PermissionResource } from "@/types";

export const ROLE_LABELS_BN: Record<UserRole, string> = {
  SUPER_ADMIN: "সুপার অ্যাডমিন",
  SCHOOL_ADMIN: "বিদ্যালয় প্রশাসক",
  PRINCIPAL: "প্রধান শিক্ষক / অধ্যক্ষ",
  VICE_PRINCIPAL: "সহকারী প্রধান শিক্ষক",
  TEACHER: "বিষয় শিক্ষক",
  CLASS_TEACHER: "শ্রেণি শিক্ষক",
  STUDENT: "শিক্ষার্থী",
  PARENT: "অভিভাবক",
  ACCOUNTANT: "হিসাবরক্ষক",
  LIBRARIAN: "গ্রন্থাগারিক",
  STAFF: "অফিস সহকারী",
};

type RolePermissions = Partial<Record<PermissionResource, PermissionAction[]>>;

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  SUPER_ADMIN: {
    STUDENTS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    TEACHERS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    STAFF: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    ACADEMICS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    ATTENDANCE: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    EXAMINATIONS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    RESULTS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    FINANCE: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    ADMISSIONS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    LIBRARY: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    NOTICES: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    REPORTS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    SETTINGS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    CMS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
  },
  SCHOOL_ADMIN: {
    STUDENTS: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    TEACHERS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    STAFF: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    ACADEMICS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    ATTENDANCE: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    EXAMINATIONS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    RESULTS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    FINANCE: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    ADMISSIONS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    LIBRARY: ["VIEW", "CREATE", "UPDATE", "EXPORT", "MANAGE"],
    NOTICES: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE", "EXPORT", "MANAGE"],
    REPORTS: ["VIEW", "EXPORT"],
    SETTINGS: ["VIEW", "UPDATE"],
    CMS: ["VIEW", "CREATE", "UPDATE", "DELETE"],
  },
  PRINCIPAL: {
    STUDENTS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT"],
    TEACHERS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT"],
    STAFF: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT"],
    ACADEMICS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT"],
    ATTENDANCE: ["VIEW", "APPROVE", "EXPORT"],
    EXAMINATIONS: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT"],
    RESULTS: ["VIEW", "APPROVE", "EXPORT"],
    FINANCE: ["VIEW", "APPROVE", "EXPORT"],
    ADMISSIONS: ["VIEW", "APPROVE", "EXPORT"],
    LIBRARY: ["VIEW", "EXPORT"],
    NOTICES: ["VIEW", "CREATE", "UPDATE", "DELETE", "APPROVE"],
    REPORTS: ["VIEW", "EXPORT"],
    SETTINGS: ["VIEW", "UPDATE"],
    CMS: ["VIEW", "UPDATE"],
  },
  VICE_PRINCIPAL: {
    STUDENTS: ["VIEW", "UPDATE", "EXPORT"],
    TEACHERS: ["VIEW", "EXPORT"],
    ACADEMICS: ["VIEW", "UPDATE", "EXPORT"],
    ATTENDANCE: ["VIEW", "UPDATE", "EXPORT"],
    EXAMINATIONS: ["VIEW", "UPDATE", "EXPORT"],
    RESULTS: ["VIEW", "EXPORT"],
    ADMISSIONS: ["VIEW", "APPROVE"],
    NOTICES: ["VIEW", "CREATE"],
    REPORTS: ["VIEW", "EXPORT"],
  },
  TEACHER: {
    STUDENTS: ["VIEW"],
    ACADEMICS: ["VIEW"],
    ATTENDANCE: ["VIEW", "CREATE", "UPDATE"],
    EXAMINATIONS: ["VIEW", "UPDATE"],
    RESULTS: ["VIEW", "CREATE", "UPDATE"],
    NOTICES: ["VIEW", "CREATE"],
    LIBRARY: ["VIEW"],
  },
  CLASS_TEACHER: {
    STUDENTS: ["VIEW", "UPDATE"],
    ACADEMICS: ["VIEW"],
    ATTENDANCE: ["VIEW", "CREATE", "UPDATE", "EXPORT"],
    EXAMINATIONS: ["VIEW", "UPDATE"],
    RESULTS: ["VIEW", "CREATE", "UPDATE", "EXPORT"],
    NOTICES: ["VIEW", "CREATE"],
    LIBRARY: ["VIEW"],
  },
  STUDENT: {
    STUDENTS: ["VIEW"],
    ACADEMICS: ["VIEW"],
    ATTENDANCE: ["VIEW"],
    EXAMINATIONS: ["VIEW"],
    RESULTS: ["VIEW"],
    FINANCE: ["VIEW"],
    NOTICES: ["VIEW"],
    LIBRARY: ["VIEW"],
  },
  PARENT: {
    STUDENTS: ["VIEW"],
    ATTENDANCE: ["VIEW"],
    RESULTS: ["VIEW"],
    FINANCE: ["VIEW"],
    NOTICES: ["VIEW"],
  },
  ACCOUNTANT: {
    FINANCE: ["VIEW", "CREATE", "UPDATE", "APPROVE", "EXPORT", "MANAGE"],
    STUDENTS: ["VIEW"],
    REPORTS: ["VIEW", "EXPORT"],
    NOTICES: ["VIEW"],
  },
  LIBRARIAN: {
    LIBRARY: ["VIEW", "CREATE", "UPDATE", "DELETE", "EXPORT", "MANAGE"],
    STUDENTS: ["VIEW"],
    TEACHERS: ["VIEW"],
    NOTICES: ["VIEW"],
  },
  STAFF: {
    STUDENTS: ["VIEW"],
    NOTICES: ["VIEW"],
    ATTENDANCE: ["VIEW"],
  },
};

export function hasPermission(
  role: UserRole,
  resource: PermissionResource,
  action: PermissionAction
): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) return false;
  const actions = permissions[resource];
  if (!actions) return false;
  return actions.includes(action) || actions.includes("MANAGE");
}
