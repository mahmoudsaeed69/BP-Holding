import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { TRPCProvider } from "@/providers/trpc";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { AuthLayout } from "@/components/AuthLayout";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Contractors = lazy(() => import("./pages/Contractors"));
const RequestQuote = lazy(() => import("./pages/RequestQuote"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const CompanyProfile = lazy(() => import("./pages/CompanyProfile"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <TRPCProvider>
        <ThemeProvider>
          <LanguageProvider>
            <TooltipProvider>
              <AuthLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/contractors" element={<Contractors />} />
                    <Route path="/quote" element={<RequestQuote />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/profile" element={<CompanyProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster position="top-right" richColors />
              </AuthLayout>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TRPCProvider>
    </I18nextProvider>
  );
}
