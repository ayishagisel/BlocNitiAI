import { 
  users, 
  repairIssues, 
  harassmentReports,
  type User, 
  type UpsertUser,
  type UpdateUserProfile,
  type InsertRepairIssue,
  type RepairIssue,
  type InsertHarassmentReport,
  type HarassmentReport
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProfile(userId: string, profile: UpdateUserProfile): Promise<User>;
  
  // Repair issues operations
  getRepairIssuesByUserId(userId: string): Promise<RepairIssue[]>;
  getRepairIssue(id: number): Promise<RepairIssue | undefined>;
  createRepairIssue(userId: string, data: InsertRepairIssue): Promise<RepairIssue>;
  updateRepairIssueAIAnalysis(id: number, analysis: { hpdViolationClass: string; correctionDeadline: string; aiAnalysis: string }): Promise<void>;
  deleteRepairIssue(id: number, userId: string): Promise<void>;
  
  // Harassment reports operations
  getHarassmentReportsByUserId(userId: string): Promise<HarassmentReport[]>;
  createHarassmentReport(userId: string, data: InsertHarassmentReport): Promise<HarassmentReport>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserProfile(userId: string, profile: UpdateUserProfile): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...profile,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Repair issues operations
  async getRepairIssuesByUserId(userId: string): Promise<RepairIssue[]> {
    return await db
      .select()
      .from(repairIssues)
      .where(eq(repairIssues.userId, userId))
      .orderBy(desc(repairIssues.createdAt));
  }

  async getRepairIssue(id: number): Promise<RepairIssue | undefined> {
    const [issue] = await db
      .select()
      .from(repairIssues)
      .where(eq(repairIssues.id, id));
    return issue;
  }

  async createRepairIssue(userId: string, data: InsertRepairIssue): Promise<RepairIssue> {
    const [issue] = await db
      .insert(repairIssues)
      .values({
        ...data,
        userId,
      })
      .returning();
    return issue;
  }

  async updateRepairIssueAIAnalysis(
    id: number, 
    analysis: { hpdViolationClass: string; correctionDeadline: string; aiAnalysis: string }
  ): Promise<void> {
    await db
      .update(repairIssues)
      .set({
        hpdViolationClass: analysis.hpdViolationClass,
        correctionDeadline: analysis.correctionDeadline,
        aiAnalysis: analysis.aiAnalysis,
        updatedAt: new Date(),
      })
      .where(eq(repairIssues.id, id));
  }

  async deleteRepairIssue(id: number, userId: string): Promise<void> {
    await db
      .delete(repairIssues)
      .where(eq(repairIssues.id, id));
  }

  // Harassment reports operations
  async getHarassmentReportsByUserId(userId: string): Promise<HarassmentReport[]> {
    return await db
      .select()
      .from(harassmentReports)
      .where(eq(harassmentReports.userId, userId))
      .orderBy(desc(harassmentReports.createdAt));
  }

  async createHarassmentReport(userId: string, data: InsertHarassmentReport): Promise<HarassmentReport> {
    const [report] = await db
      .insert(harassmentReports)
      .values({
        ...data,
        userId,
      })
      .returning();
    return report;
  }
}

export const storage = new DatabaseStorage();