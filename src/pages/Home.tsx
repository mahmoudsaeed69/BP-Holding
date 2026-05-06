import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import {
  Building2,
  HardHat,
  Paintbrush,
  Palette,
  ClipboardCheck,
  Settings,
  ArrowRight,
  CheckCircle,
  Quote,
} from "lucide-react";

const servicesIcons = [
  { icon: Building2, key: "residential" },
  { icon: HardHat, key: "structural" },
  { icon: Paintbrush, key: "finishing" },
  { icon: Palette, key: "design" },
  { icon: ClipboardCheck, key: "consultation" },
  { icon: Settings, key: "projectManagement" },
];

const stats = [
  { value: "150+", labelKey: "hero.stats.projects" },
  { value: "20+", labelKey: "hero.stats.experience" },
  { value: "80+", labelKey: "hero.stats.clients" },
  { value: "200+", labelKey: "hero.stats.team" },
];

export default function Home() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const { data: projectsData } = trpc.project.list.useQuery({
    featured: true,
    limit: 6,
  });
  const { data: servicesData } = trpc.service.list.useQuery();
  const { data: testimonialsData } = trpc.testimonial.list.useQuery();

  const apiProjects = projectsData?.items ?? [];
  const services = servicesData ?? [];
  const testimonials = testimonialsData ?? [];

  const fallbackProjects = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    titleEn: `Project ${i + 1}`,
    titleAr: `مشروع ${i + 1}`,
    slug: `project-${i + 1}`,
    locationEn: "Riyadh, KSA",
    locationAr: "الرياض، المملكة العربية السعودية",
    featuredImage: `https://images.unsplash.com/photo-${[
      "1504307651254-35680f356dfd",
      "1541888946425-d81bb19240f5",
      "1486406146926-c627a92ad1ab",
      "1503387762-592deb58ef4e",
      "1518005068255-f37970356b57",
      "1487958449943-2429e8be8625",
    ][i]}?auto=format&fit=crop&w=600&q=80`,
    status: "completed" as const,
    shortDescriptionEn: "Premium construction project delivered with excellence.",
    descriptionEn: null,
    clientName: null,
  }));

  const featuredProjects = apiProjects.length > 0 ? apiProjects : fallbackProjects;

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Saudi Arabia's Premier Construction Partner
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/projects">
                  {t("hero.ctaPrimary")}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link to="/quote">
                  {t("hero.ctaSecondary")}
                </Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="bg-background/80 backdrop-blur rounded-xl p-4 border shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">{t("about.title")}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t("about.description")}
              </p>
              <div className="space-y-3">
                {["integrity", "quality", "innovation", "safety", "partnership"].map((value) => (
                  <div key={value} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{t(`about.values.${value}`)}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8" variant="outline">
                <Link to="/about">
                  {t("common.readMore")}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
                alt="Construction site"
                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-lg hidden lg:block">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("services.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("services.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length > 0
              ? services.slice(0, 6).map((service) => {
                  const iconEntry = servicesIcons.find(
                    (s) => s.key === service.slug
                  );
                  const Icon = iconEntry?.icon ?? Building2;
                  return (
                    <Link
                      key={service.id}
                      to="/services"
                      className="group bg-background rounded-xl p-6 border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {service.nameEn}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {service.shortDescriptionEn || service.descriptionEn}
                      </p>
                    </Link>
                  );
                })
              : servicesIcons.map((svc) => {
                  const Icon = svc.icon;
                  return (
                    <Link
                      key={svc.key}
                      to="/services"
                      className="group bg-background rounded-xl p-6 border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {t(`services.${svc.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {t(`services.${svc.key}.desc`)}
                      </p>
                    </Link>
                  );
                })}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                {t("common.viewAll")} {t("nav.services")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t("projects.title")}</h2>
              <p className="text-muted-foreground text-lg">{t("projects.subtitle")}</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/projects">
                {t("common.viewAll")}
                <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-background rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.featuredImage ?? "/placeholder.svg"}
                    alt={project.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs px-2.5 py-1 rounded-full capitalize">
                    {project.status}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {project.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {project.shortDescriptionEn || ""}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground gap-3">
                    <span>{project.locationEn}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">
              Trusted by leading organizations across Saudi Arabia
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(testimonials.length > 0
              ? testimonials.slice(0, 3)
              : [
                  { id: 1, name: "Ahmed Al-Rashid", role: "CEO", company: "Al-Rashid Group", content: "BP Holding delivered our villa project with exceptional quality and professionalism. Their attention to detail is unmatched.", rating: 5 },
                  { id: 2, name: "Sarah Al-Farsi", role: "Project Director", company: "Farsi Developments", content: "Working with Business Pioneers Holding has been a game-changer. Their engineering consultation services are world-class.", rating: 5 },
                  { id: 3, name: "Mohammed Al-Otaibi", role: "Owner", company: "Otaibi Real Estate", content: "The interior design team transformed our commercial space beyond expectations. Highly recommended for any project.", rating: 5 },
                ]
            ).map((t) => (
              <div key={t.id} className="bg-background rounded-xl p-6 border shadow-sm">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-4">{t.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 sm:p-12 lg:p-16 text-center text-primary-foreground">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              Let's discuss how Business Pioneers Holding can bring your vision to life with our expertise in construction, engineering, and design.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-base px-8">
                <Link to="/quote">{t("hero.ctaSecondary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/contact">{t("nav.contact")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
