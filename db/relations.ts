import { relations } from "drizzle-orm";
import { projects, projectCategories, jobApplications, contractorApplications, inquiries, rfqSubmissions, siteContent, mediaAssets, testimonials, teamMembers, blogPosts, users } from "./schema";

export const projectCategoryRelations = relations(projectCategories, ({ many }) => ({
  projects: many(projects),
}));

export const projectRelations = relations(projects, ({ one }) => ({
  category: one(projectCategories, {
    fields: [projects.categoryId],
    references: [projectCategories.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
}));

export const blogPostRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));

export const jobApplicationRelations = relations(jobApplications, ({}) => ({}));
export const contractorApplicationRelations = relations(contractorApplications, ({}) => ({}));
export const inquiryRelations = relations(inquiries, ({}) => ({}));
export const rfqSubmissionRelations = relations(rfqSubmissions, ({}) => ({}));
export const siteContentRelations = relations(siteContent, ({}) => ({}));
export const mediaAssetRelations = relations(mediaAssets, ({}) => ({}));
export const testimonialRelations = relations(testimonials, ({}) => ({}));
export const teamMemberRelations = relations(teamMembers, ({}) => ({}));
