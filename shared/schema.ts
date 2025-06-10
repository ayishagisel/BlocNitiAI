import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  
  // Additional user fields for BlocNiti
  dateOfBirth: date("date_of_birth"),
  phone: varchar("phone"),
  address: text("address"),
  unit: varchar("unit"),
  knowsOrganizer: boolean("knows_organizer"),
  threatened: boolean("threatened"),
  evictionCase: boolean("eviction_case"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Repair issues table
export const repairIssues = pgTable("repair_issues", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  roomNumber: integer("room_number"),
  roomName: varchar("room_name").notNull(),
  area: varchar("area").notNull(),
  status: varchar("status").notNull(), // urgent, priority, non-urgent
  issueDescription: text("issue_description").notNull(),
  proposedRemediation: text("proposed_remediation"),
  firstRequestDate: date("first_request_date"),
  issueBegan: date("issue_began"),
  
  // AI Analysis fields
  hpdViolationClass: varchar("hpd_violation_class"),
  correctionDeadline: varchar("correction_deadline"),
  aiAnalysis: text("ai_analysis"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Harassment reports table
export const harassmentReports = pgTable("harassment_reports", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  harassmentTypes: jsonb("harassment_types").notNull(), // array of types
  additionalDetails: text("additional_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  dateOfBirth: true,
  phone: true,
  address: true,
  unit: true,
  knowsOrganizer: true,
  threatened: true,
  evictionCase: true,
});

export const updateUserProfileSchema = createInsertSchema(users).pick({
  dateOfBirth: true,
  phone: true,
  address: true,
  unit: true,
  knowsOrganizer: true,
  threatened: true,
  evictionCase: true,
});

export const insertRepairIssueSchema = createInsertSchema(repairIssues).omit({
  id: true,
  userId: true,
  hpdViolationClass: true,
  correctionDeadline: true,
  aiAnalysis: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHarassmentReportSchema = createInsertSchema(harassmentReports).omit({
  id: true,
  userId: true,
  createdAt: true,
});

// TypeScript types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type InsertRepairIssue = z.infer<typeof insertRepairIssueSchema>;
export type RepairIssue = typeof repairIssues.$inferSelect;
export type InsertHarassmentReport = z.infer<typeof insertHarassmentReportSchema>;
export type HarassmentReport = typeof harassmentReports.$inferSelect;
