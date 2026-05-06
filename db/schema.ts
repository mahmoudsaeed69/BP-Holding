import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  json,
  boolean,
  bigint,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const projectCategories = mysqlTable("projectCategories", {
  id: serial("id").primaryKey(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  icon: varchar("icon", { length: 100 }),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProjectCategory = typeof projectCategories.$inferSelect;

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  shortDescriptionEn: text("shortDescriptionEn"),
  shortDescriptionAr: text("shortDescriptionAr"),
  categoryId: bigint("categoryId", { mode: "number", unsigned: true }),
  locationEn: varchar("locationEn", { length: 255 }),
  locationAr: varchar("locationAr", { length: 255 }),
  clientName: varchar("clientName", { length: 255 }),
  projectValue: varchar("projectValue", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  status: mysqlEnum("status", [
    "completed",
    "ongoing",
    "upcoming",
  ]).default("completed"),
  featuredImage: text("featuredImage"),
  galleryImages: json("galleryImages").$type<string[]>(),
  servicesUsed: json("servicesUsed").$type<string[]>(),
  completionDate: varchar("completionDate", { length: 50 }),
  isFeatured: boolean("isFeatured").default(false),
  isActive: boolean("isActive").default(true),
  metaTitleEn: varchar("metaTitleEn", { length: 255 }),
  metaTitleAr: varchar("metaTitleAr", { length: 255 }),
  metaDescriptionEn: text("metaDescriptionEn"),
  metaDescriptionAr: text("metaDescriptionAr"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;

export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  descriptionEn: text("descriptionEn"),
  descriptionAr: text("descriptionAr"),
  shortDescriptionEn: text("shortDescriptionEn"),
  shortDescriptionAr: text("shortDescriptionAr"),
  icon: varchar("icon", { length: 100 }),
  image: text("image"),
  featuresEn: json("featuresEn").$type<string[]>(),
  featuresAr: json("featuresAr").$type<string[]>(),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;

export const jobApplications = mysqlTable("jobApplications", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }),
  experience: varchar("experience", { length: 100 }),
  education: varchar("education", { length: 255 }),
  salaryExpectation: varchar("salaryExpectation", { length: 100 }),
  message: text("message"),
  cvUrl: text("cvUrl"),
  portfolioUrl: text("portfolioUrl"),
  status: mysqlEnum("status", [
    "new",
    "reviewing",
    "interview",
    "rejected",
    "hired",
  ]).default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type JobApplication = typeof jobApplications.$inferSelect;

export const contractorApplications = mysqlTable("contractorApplications", {
  id: serial("id").primaryKey(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  companyType: mysqlEnum("companyType", [
    "contractor",
    "supplier",
    "subcontractor",
    "consultant",
  ]).notNull(),
  specialization: varchar("specialization", { length: 255 }),
  crNumber: varchar("crNumber", { length: 100 }),
  vatNumber: varchar("vatNumber", { length: 100 }),
  yearsOfExperience: int("yearsOfExperience"),
  numberOfEmployees: int("numberOfEmployees"),
  annualRevenue: varchar("annualRevenue", { length: 100 }),
  website: text("website"),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  country: varchar("country", { length: 100 }).default("Saudi Arabia"),
  services: json("services").$type<string[]>(),
  pastProjects: text("pastProjects"),
  certifications: json("certifications").$type<string[]>(),
  documents: json("documents").$type<{ name: string; url: string }[]>(),
  message: text("message"),
  status: mysqlEnum("status", [
    "new",
    "reviewing",
    "approved",
    "rejected",
  ]).default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ContractorApplication = typeof contractorApplications.$inferSelect;

export const inquiries = mysqlTable("inquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  inquiryType: mysqlEnum("inquiryType", [
    "general",
    "project",
    "partnership",
    "career",
    "contractor",
    "media",
  ]).default("general"),
  isRead: boolean("isRead").default(false),
  status: mysqlEnum("status", ["new", "in_progress", "resolved", "archived"]).default("new"),
  assignedTo: bigint("assignedTo", { mode: "number", unsigned: true }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;

export const rfqSubmissions = mysqlTable("rfqSubmissions", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  company: varchar("company", { length: 255 }),
  projectType: varchar("projectType", { length: 255 }).notNull(),
  projectDescription: text("projectDescription").notNull(),
  estimatedBudget: varchar("estimatedBudget", { length: 100 }),
  timeline: varchar("timeline", { length: 100 }),
  location: varchar("location", { length: 255 }),
  servicesNeeded: json("servicesNeeded").$type<string[]>(),
  attachments: json("attachments").$type<{ name: string; url: string }[]>(),
  status: mysqlEnum("status", [
    "new",
    "reviewing",
    "quoted",
    "negotiating",
    "approved",
    "rejected",
  ]).default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type RfqSubmission = typeof rfqSubmissions.$inferSelect;

export const siteContent = mysqlTable("siteContent", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  section: varchar("section", { length: 100 }).notNull(),
  contentEn: text("contentEn"),
  contentAr: text("contentAr"),
  type: mysqlEnum("type", ["text", "html", "json", "image"]).default("text"),
  isActive: boolean("isActive").default(true),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type SiteContent = typeof siteContent.$inferSelect;

export const mediaAssets = mysqlTable("mediaAssets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  originalName: varchar("originalName", { length: 255 }),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  type: mysqlEnum("type", ["image", "document", "video", "other"]).default("image"),
  mimeType: varchar("mimeType", { length: 100 }),
  size: int("size"),
  width: int("width"),
  height: int("height"),
  uploadedBy: bigint("uploadedBy", { mode: "number", unsigned: true }),
  tags: json("tags").$type<string[]>(),
  folder: varchar("folder", { length: 255 }).default("general"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;

export const testimonials = mysqlTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("nameAr", { length: 255 }),
  role: varchar("role", { length: 255 }),
  company: varchar("company", { length: 255 }),
  content: text("content").notNull(),
  contentAr: text("contentAr"),
  avatar: text("avatar"),
  rating: int("rating").default(5),
  isActive: boolean("isActive").default(true),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;

export const teamMembers = mysqlTable("teamMembers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameAr: varchar("nameAr", { length: 255 }),
  role: varchar("role", { length: 255 }).notNull(),
  roleAr: varchar("roleAr", { length: 255 }),
  bio: text("bio"),
  bioAr: text("bioAr"),
  image: text("image"),
  email: varchar("email", { length: 320 }),
  linkedin: text("linkedin"),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;

export const blogPosts = mysqlTable("blogPosts", {
  id: serial("id").primaryKey(),
  titleEn: varchar("titleEn", { length: 255 }).notNull(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerptEn: text("excerptEn"),
  excerptAr: text("excerptAr"),
  contentEn: text("contentEn"),
  contentAr: text("contentAr"),
  featuredImage: text("featuredImage"),
  authorId: bigint("authorId", { mode: "number", unsigned: true }),
  category: varchar("category", { length: 100 }),
  tags: json("tags").$type<string[]>(),
  isPublished: boolean("isPublished").default(false),
  publishedAt: timestamp("publishedAt"),
  views: int("views").default(0),
  metaTitleEn: varchar("metaTitleEn", { length: 255 }),
  metaTitleAr: varchar("metaTitleAr", { length: 255 }),
  metaDescriptionEn: text("metaDescriptionEn"),
  metaDescriptionAr: text("metaDescriptionAr"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
