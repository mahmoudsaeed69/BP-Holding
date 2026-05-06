import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { trpc } from "@/providers/trpc";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, MapPin, Clock, DollarSign, Wrench, Loader2 } from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const { data: project, isLoading } = trpc.project.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <Building2 className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-bold text-muted-foreground">Project not found</h1>
        <Button asChild className="mt-4">
          <Link to="/projects">{t("common.back")} to {t("nav.projects")}</Link>
        </Button>
      </div>
    );
  }

  const gallery = project.galleryImages ?? [];
  const services = project.servicesUsed ?? [];

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[300px] pt-16">
        <img
          src={project.featuredImage ?? `https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80`}
          alt={project.titleEn}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="container mx-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mb-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t("common.back")}
              </Link>
            </Button>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
              {project.titleEn}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/80 text-sm">
              {project.locationEn && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {project.locationEn}
                </span>
              )}
              {project.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.duration}
                </span>
              )}
              {project.projectValue && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {project.projectValue}
                </span>
              )}
              <span className="bg-white/20 px-2 py-0.5 rounded-full capitalize">
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("projects.viewProject")}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.descriptionEn || project.shortDescriptionEn || "No description available."}
                </p>
              </div>

              {/* Services Used */}
              {services.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    {t("projects.services")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <span key={s} className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t("projects.gallery")}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        className="rounded-lg object-cover h-40 w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold">Project Info</h3>
                {project.clientName && (
                  <div>
                    <span className="text-sm text-muted-foreground">{t("projects.client")}</span>
                    <p className="font-medium">{project.clientName}</p>
                  </div>
                )}
                {project.projectValue && (
                  <div>
                    <span className="text-sm text-muted-foreground">{t("projects.value")}</span>
                    <p className="font-medium">{project.projectValue}</p>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <span className="text-sm text-muted-foreground">{t("projects.duration")}</span>
                    <p className="font-medium">{project.duration}</p>
                  </div>
                )}
                {project.completionDate && (
                  <div>
                    <span className="text-sm text-muted-foreground">Completion</span>
                    <p className="font-medium">{project.completionDate}</p>
                  </div>
                )}
                {project.category && (
                  <div>
                    <span className="text-sm text-muted-foreground">Category</span>
                    <p className="font-medium">{project.category.nameEn}</p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <p className="font-medium capitalize">{project.status}</p>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link to="/quote">Request Similar Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
