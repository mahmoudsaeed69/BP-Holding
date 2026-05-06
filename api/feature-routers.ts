import { createRouter, publicQuery, adminQuery } from "./middleware";
import { z } from "zod";
import { db } from "../db";
import {
  projects,
  projectCategories,
  services,
  jobApplications,
  contractorApplications,
  inquiries,
  rfqSubmissions,
  siteContent,
  mediaAssets,
  testimonials,
  teamMembers,
  blogPosts,
  users,
} from "../db/schema";
import { eq, desc, asc, like, and, or, count } from "drizzle-orm";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";

function getInsertId(result: MySqlRawQueryResult): number {
  return Number((result as unknown as [{ insertId: number }])[0].insertId);
}

export const projectRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          categoryId: z.number().optional(),
          status: z.enum(["completed", "ongoing", "upcoming"]).optional(),
          search: z.string().optional(),
          featured: z.boolean().optional(),
          limit: z.number().min(1).max(100).default(12),
          offset: z.number().min(0).default(0),
          sortBy: z.enum(["newest", "oldest", "title"]).default("newest"),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? {
        limit: 12,
        offset: 0,
        sortBy: "newest" as const,
      };
      const conditions = [];

      if (opts.categoryId)
        conditions.push(eq(projects.categoryId, opts.categoryId));
      if (opts.status) conditions.push(eq(projects.status, opts.status));
      if (opts.featured) conditions.push(eq(projects.isFeatured, true));
      if (opts.search) {
        const s = `%${opts.search}%`;
        conditions.push(
          or(
            like(projects.titleEn, s),
            like(projects.titleAr, s),
            like(projects.descriptionEn, s)
          )
        );
      }

      const where =
        conditions.length > 0 ? and(...conditions) : undefined;
      const orderBy =
        opts.sortBy === "oldest"
          ? asc(projects.createdAt)
          : opts.sortBy === "title"
            ? asc(projects.titleEn)
            : desc(projects.createdAt);

      const items = await db.query.projects.findMany({
        where,
        orderBy,
        limit: opts.limit,
        offset: opts.offset,
        with: { category: true },
      });

      const totalResult = await db
        .select({ count: count() })
        .from(projects)
        .where(where);
      const total = totalResult[0]?.count ?? 0;

      return { items, total, limit: opts.limit, offset: opts.offset };
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const item = await db.query.projects.findFirst({
        where: eq(projects.slug, input.slug),
        with: { category: true },
      });
      return item ?? null;
    }),

  create: adminQuery
    .input(
      z.object({
        titleEn: z.string().min(1),
        titleAr: z.string().min(1),
        slug: z.string().min(1),
        descriptionEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        shortDescriptionEn: z.string().optional(),
        shortDescriptionAr: z.string().optional(),
        categoryId: z.number().optional(),
        locationEn: z.string().optional(),
        locationAr: z.string().optional(),
        clientName: z.string().optional(),
        projectValue: z.string().optional(),
        duration: z.string().optional(),
        status: z.enum(["completed", "ongoing", "upcoming"]).default("completed"),
        featuredImage: z.string().optional(),
        galleryImages: z.array(z.string()).optional(),
        servicesUsed: z.array(z.string()).optional(),
        completionDate: z.string().optional(),
        isFeatured: z.boolean().default(false),
        metaTitleEn: z.string().optional(),
        metaTitleAr: z.string().optional(),
        metaDescriptionEn: z.string().optional(),
        metaDescriptionAr: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(projects).values(input);
      return { success: true, id: getInsertId(result) };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          titleEn: z.string().optional(),
          titleAr: z.string().optional(),
          slug: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionAr: z.string().optional(),
          shortDescriptionEn: z.string().optional(),
          shortDescriptionAr: z.string().optional(),
          categoryId: z.number().optional(),
          locationEn: z.string().optional(),
          locationAr: z.string().optional(),
          clientName: z.string().optional(),
          projectValue: z.string().optional(),
          duration: z.string().optional(),
          status: z.enum(["completed", "ongoing", "upcoming"]).optional(),
          featuredImage: z.string().optional(),
          galleryImages: z.array(z.string()).optional(),
          servicesUsed: z.array(z.string()).optional(),
          completionDate: z.string().optional(),
          isFeatured: z.boolean().optional(),
          isActive: z.boolean().optional(),
          metaTitleEn: z.string().optional(),
          metaTitleAr: z.string().optional(),
          metaDescriptionEn: z.string().optional(),
          metaDescriptionAr: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(projects)
        .set({ ...input.data, updatedAt: new Date() })
        .where(eq(projects.id, input.id));
      return { success: true };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});

export const categoryRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.query.projectCategories.findMany({
      orderBy: asc(projectCategories.sortOrder),
    });
  }),

  create: adminQuery
    .input(
      z.object({
        nameEn: z.string().min(1),
        nameAr: z.string().min(1),
        slug: z.string().min(1),
        descriptionEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        icon: z.string().optional(),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(projectCategories).values(input);
      return { success: true, id: getInsertId(result) };
    }),
});

export const serviceRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.query.services.findMany({
      orderBy: asc(services.sortOrder),
    });
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const item = await db.query.services.findFirst({
        where: eq(services.slug, input.slug),
      });
      return item ?? null;
    }),

  create: adminQuery
    .input(
      z.object({
        nameEn: z.string().min(1),
        nameAr: z.string().min(1),
        slug: z.string().min(1),
        descriptionEn: z.string().optional(),
        descriptionAr: z.string().optional(),
        shortDescriptionEn: z.string().optional(),
        shortDescriptionAr: z.string().optional(),
        icon: z.string().optional(),
        image: z.string().optional(),
        featuresEn: z.array(z.string()).optional(),
        featuresAr: z.array(z.string()).optional(),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(services).values(input);
      return { success: true, id: getInsertId(result) };
    }),
});

export const jobApplicationRouter = createRouter({
  list: adminQuery
    .input(
      z
        .object({
          status: z
            .enum(["new", "reviewing", "interview", "rejected", "hired"])
            .optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? { limit: 50, offset: 0 };
      const where = opts.status
        ? eq(jobApplications.status, opts.status)
        : undefined;
      const items = await db.query.jobApplications.findMany({
        where,
        orderBy: desc(jobApplications.createdAt),
        limit: opts.limit,
        offset: opts.offset,
      });
      const totalResult = await db
        .select({ count: count() })
        .from(jobApplications)
        .where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  submit: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        position: z.string().min(1),
        department: z.string().optional(),
        experience: z.string().optional(),
        education: z.string().optional(),
        salaryExpectation: z.string().optional(),
        message: z.string().optional(),
        cvUrl: z.string().optional(),
        portfolioUrl: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(jobApplications).values(input);
      return { success: true, id: getInsertId(result) };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "reviewing", "interview", "rejected", "hired"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(jobApplications)
        .set({
          status: input.status,
          notes: input.notes,
          updatedAt: new Date(),
        })
        .where(eq(jobApplications.id, input.id));
      return { success: true };
    }),
});

export const contractorRouter = createRouter({
  list: adminQuery
    .input(
      z
        .object({
          status: z
            .enum(["new", "reviewing", "approved", "rejected"])
            .optional(),
          companyType: z
            .enum(["contractor", "supplier", "subcontractor", "consultant"])
            .optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? { limit: 50, offset: 0 };
      const conditions = [];
      if (opts.status)
        conditions.push(eq(contractorApplications.status, opts.status));
      if (opts.companyType)
        conditions.push(eq(contractorApplications.companyType, opts.companyType));
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const items = await db.query.contractorApplications.findMany({
        where,
        orderBy: desc(contractorApplications.createdAt),
        limit: opts.limit,
        offset: opts.offset,
      });
      const totalResult = await db
        .select({ count: count() })
        .from(contractorApplications)
        .where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  submit: publicQuery
    .input(
      z.object({
        companyName: z.string().min(1),
        contactName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        companyType: z.enum([
          "contractor",
          "supplier",
          "subcontractor",
          "consultant",
        ]),
        specialization: z.string().optional(),
        crNumber: z.string().optional(),
        vatNumber: z.string().optional(),
        yearsOfExperience: z.number().optional(),
        numberOfEmployees: z.number().optional(),
        annualRevenue: z.string().optional(),
        website: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        country: z.string().default("Saudi Arabia"),
        services: z.array(z.string()).optional(),
        pastProjects: z.string().optional(),
        certifications: z.array(z.string()).optional(),
        documents: z
          .array(z.object({ name: z.string(), url: z.string() }))
          .optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(contractorApplications).values(input);
      return { success: true, id: getInsertId(result) };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "reviewing", "approved", "rejected"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(contractorApplications)
        .set({
          status: input.status,
          notes: input.notes,
          updatedAt: new Date(),
        })
        .where(eq(contractorApplications.id, input.id));
      return { success: true };
    }),
});

export const inquiryRouter = createRouter({
  list: adminQuery
    .input(
      z
        .object({
          status: z
            .enum(["new", "in_progress", "resolved", "archived"])
            .optional(),
          inquiryType: z
            .enum([
              "general",
              "project",
              "partnership",
              "career",
              "contractor",
              "media",
            ])
            .optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? { limit: 50, offset: 0 };
      const conditions = [];
      if (opts.status) conditions.push(eq(inquiries.status, opts.status));
      if (opts.inquiryType)
        conditions.push(eq(inquiries.inquiryType, opts.inquiryType));
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const items = await db.query.inquiries.findMany({
        where,
        orderBy: desc(inquiries.createdAt),
        limit: opts.limit,
        offset: opts.offset,
      });
      const totalResult = await db
        .select({ count: count() })
        .from(inquiries)
        .where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  submit: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        company: z.string().optional(),
        subject: z.string().min(1),
        message: z.string().min(1),
        inquiryType: z
          .enum([
            "general",
            "project",
            "partnership",
            "career",
            "contractor",
            "media",
          ])
          .default("general"),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(inquiries).values(input);
      return { success: true, id: getInsertId(result) };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "in_progress", "resolved", "archived"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(inquiries)
        .set({
          status: input.status,
          notes: input.notes,
          updatedAt: new Date(),
        })
        .where(eq(inquiries.id, input.id));
      return { success: true };
    }),
});

export const rfqRouter = createRouter({
  list: adminQuery
    .input(
      z
        .object({
          status: z
            .enum([
              "new",
              "reviewing",
              "quoted",
              "negotiating",
              "approved",
              "rejected",
            ])
            .optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? { limit: 50, offset: 0 };
      const where = opts.status
        ? eq(rfqSubmissions.status, opts.status)
        : undefined;
      const items = await db.query.rfqSubmissions.findMany({
        where,
        orderBy: desc(rfqSubmissions.createdAt),
        limit: opts.limit,
        offset: opts.offset,
      });
      const totalResult = await db
        .select({ count: count() })
        .from(rfqSubmissions)
        .where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  submit: publicQuery
    .input(
      z.object({
        fullName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        company: z.string().optional(),
        projectType: z.string().min(1),
        projectDescription: z.string().min(1),
        estimatedBudget: z.string().optional(),
        timeline: z.string().optional(),
        location: z.string().optional(),
        servicesNeeded: z.array(z.string()).optional(),
        attachments: z
          .array(z.object({ name: z.string(), url: z.string() }))
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(rfqSubmissions).values(input);
      return { success: true, id: getInsertId(result) };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum([
          "new",
          "reviewing",
          "quoted",
          "negotiating",
          "approved",
          "rejected",
        ]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(rfqSubmissions)
        .set({
          status: input.status,
          notes: input.notes,
          updatedAt: new Date(),
        })
        .where(eq(rfqSubmissions.id, input.id));
      return { success: true };
    }),
});

export const contentRouter = createRouter({
  list: publicQuery
    .input(z.object({ section: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const opts = input ?? {};
      const where = opts.section
        ? eq(siteContent.section, opts.section)
        : undefined;
      return db.query.siteContent.findMany({
        where,
        orderBy: asc(siteContent.key),
      });
    }),

  getByKey: publicQuery
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      const item = await db.query.siteContent.findFirst({
        where: eq(siteContent.key, input.key),
      });
      return item ?? null;
    }),

  upsert: adminQuery
    .input(
      z.object({
        key: z.string().min(1),
        section: z.string().min(1),
        contentEn: z.string().optional(),
        contentAr: z.string().optional(),
        type: z.enum(["text", "html", "json", "image"]).default("text"),
      })
    )
    .mutation(async ({ input }) => {
      const existing = await db.query.siteContent.findFirst({
        where: eq(siteContent.key, input.key),
      });
      if (existing) {
        await db
          .update(siteContent)
          .set({
            ...input,
            updatedAt: new Date(),
          })
          .where(eq(siteContent.id, existing.id));
        return { success: true, id: existing.id };
      } else {
        const result = await db.insert(siteContent).values({
          ...input,
          isActive: true,
        });
        return { success: true, id: getInsertId(result) };
      }
    }),
});

export const mediaRouter = createRouter({
  list: adminQuery
    .input(
      z
        .object({
          folder: z.string().optional(),
          type: z.enum(["image", "document", "video", "other"]).optional(),
          limit: z.number().default(50),
          offset: z.number().default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? { limit: 50, offset: 0 };
      const conditions = [];
      if (opts.folder) conditions.push(eq(mediaAssets.folder, opts.folder));
      if (opts.type) conditions.push(eq(mediaAssets.type, opts.type));
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const items = await db.query.mediaAssets.findMany({
        where,
        orderBy: desc(mediaAssets.createdAt),
        limit: opts.limit,
        offset: opts.offset,
      });
      const totalResult = await db
        .select({ count: count() })
        .from(mediaAssets)
        .where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        originalName: z.string().optional(),
        url: z.string().min(1),
        thumbnailUrl: z.string().optional(),
        type: z.enum(["image", "document", "video", "other"]).default("image"),
        mimeType: z.string().optional(),
        size: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        tags: z.array(z.string()).optional(),
        folder: z.string().default("general"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await db.insert(mediaAssets).values({
        ...input,
        uploadedBy: ctx.user?.id,
      });
      return { success: true, id: getInsertId(result) };
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(mediaAssets).where(eq(mediaAssets.id, input.id));
      return { success: true };
    }),
});

export const testimonialRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.query.testimonials.findMany({
      where: eq(testimonials.isActive, true),
      orderBy: asc(testimonials.sortOrder),
    });
  }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().optional(),
        role: z.string().optional(),
        company: z.string().optional(),
        content: z.string().min(1),
        contentAr: z.string().optional(),
        avatar: z.string().optional(),
        rating: z.number().min(1).max(5).default(5),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(testimonials).values(input);
      return { success: true, id: getInsertId(result) };
    }),
});

export const teamRouter = createRouter({
  list: publicQuery.query(async () => {
    return db.query.teamMembers.findMany({
      where: eq(teamMembers.isActive, true),
      orderBy: asc(teamMembers.sortOrder),
    });
  }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        nameAr: z.string().optional(),
        role: z.string().min(1),
        roleAr: z.string().optional(),
        bio: z.string().optional(),
        bioAr: z.string().optional(),
        image: z.string().optional(),
        email: z.string().optional(),
        linkedin: z.string().optional(),
        sortOrder: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const result = await db.insert(teamMembers).values(input);
      return { success: true, id: getInsertId(result) };
    }),
});

export const blogRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          category: z.string().optional(),
          published: z.boolean().optional(),
          limit: z.number().default(12),
          offset: z.number().default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const opts = input ?? { limit: 12, offset: 0 };
      const conditions = [];
      if (opts.category) conditions.push(eq(blogPosts.category, opts.category));
      if (opts.published) conditions.push(eq(blogPosts.isPublished, true));
      const where = conditions.length > 0 ? and(...conditions) : undefined;
      const items = await db.query.blogPosts.findMany({
        where,
        orderBy: desc(blogPosts.createdAt),
        limit: opts.limit,
        offset: opts.offset,
      });
      const totalResult = await db
        .select({ count: count() })
        .from(blogPosts)
        .where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const item = await db.query.blogPosts.findFirst({
        where: eq(blogPosts.slug, input.slug),
      });
      return item ?? null;
    }),
});

export const statsRouter = createRouter({
  dashboard: adminQuery.query(async () => {
    const [projectCount] = await db.select({ count: count() }).from(projects);
    const [jobCount] = await db
      .select({ count: count() })
      .from(jobApplications);
    const [contractorCount] = await db
      .select({ count: count() })
      .from(contractorApplications);
    const [inquiryCount] = await db.select({ count: count() }).from(inquiries);
    const [rfqCount] = await db.select({ count: count() }).from(rfqSubmissions);
    const [userCount] = await db.select({ count: count() }).from(users);

    const newJobs = await db
      .select({ count: count() })
      .from(jobApplications)
      .where(eq(jobApplications.status, "new"));
    const newInquiries = await db
      .select({ count: count() })
      .from(inquiries)
      .where(eq(inquiries.status, "new"));
    const newRfqs = await db
      .select({ count: count() })
      .from(rfqSubmissions)
      .where(eq(rfqSubmissions.status, "new"));
    const newContractors = await db
      .select({ count: count() })
      .from(contractorApplications)
      .where(eq(contractorApplications.status, "new"));

    return {
      totals: {
        projects: projectCount?.count ?? 0,
        jobs: jobCount?.count ?? 0,
        contractors: contractorCount?.count ?? 0,
        inquiries: inquiryCount?.count ?? 0,
        rfqs: rfqCount?.count ?? 0,
        users: userCount?.count ?? 0,
      },
      pending: {
        jobs: newJobs[0]?.count ?? 0,
        inquiries: newInquiries[0]?.count ?? 0,
        rfqs: newRfqs[0]?.count ?? 0,
        contractors: newContractors[0]?.count ?? 0,
      },
    };
  }),
});
