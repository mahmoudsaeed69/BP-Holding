import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import {
  projectRouter,
  categoryRouter,
  serviceRouter,
  jobApplicationRouter,
  contractorRouter,
  inquiryRouter,
  rfqRouter,
  contentRouter,
  mediaRouter,
  testimonialRouter,
  teamRouter,
  blogRouter,
  statsRouter,
} from "./feature-routers";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  project: projectRouter,
  category: categoryRouter,
  service: serviceRouter,
  jobApplication: jobApplicationRouter,
  contractor: contractorRouter,
  inquiry: inquiryRouter,
  rfq: rfqRouter,
  content: contentRouter,
  media: mediaRouter,
  testimonial: testimonialRouter,
  team: teamRouter,
  blog: blogRouter,
  stats: statsRouter,
});

export type AppRouter = typeof appRouter;
