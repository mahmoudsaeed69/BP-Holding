import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { trpc } from "@/providers/trpc";
import {
  Building2,
  HardHat,
  Paintbrush,
  Palette,
  ClipboardCheck,
  Settings,
  CheckCircle,
} from "lucide-react";

const serviceIcons: Record<string, typeof Building2> = {
  residential: Building2,
  structural: HardHat,
  finishing: Paintbrush,
  design: Palette,
  consultation: ClipboardCheck,
  "project-management": Settings,
};

export default function Services() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const { data: servicesData } = trpc.service.list.useQuery();
  const services = servicesData ?? [];

  const serviceKeys = [
    "residential",
    "structural",
    "finishing",
    "design",
    "consultation",
    "projectManagement",
  ];

  const getFeatures = (key: string): string[] => {
    const defaults: Record<string, string[]> = {
      residential: [
        "Custom villa design and construction",
        "Residential building projects",
        "Turnkey home solutions",
        "Smart home integration",
      ],
      structural: [
        "Foundation engineering",
        "Reinforced concrete works",
        "Structural steel fabrication",
        "Seismic resistant design",
      ],
      finishing: [
        "Premium flooring solutions",
        "Gypsum and ceiling works",
        "Painting and decoration",
        "Lighting installation",
      ],
      design: [
        "Space planning and optimization",
        "3D visualization and renders",
        "Material selection guidance",
        "Furniture and fixture sourcing",
      ],
      consultation: [
        "Feasibility studies",
        "Project planning and scheduling",
        "Cost estimation and budgeting",
        "Regulatory compliance",
      ],
      projectManagement: [
        "End-to-end project coordination",
        "Quality control systems",
        "Timeline management",
        "Stakeholder reporting",
      ],
    };
    return defaults[key] ?? [];
  };

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Settings className="w-4 h-4" />
            <span>{t("nav.services")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("services.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("services.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {(services.length > 0
              ? services.map((s) => {
                  const Icon = serviceIcons[s.slug] ?? Building2;
                  const key = serviceKeys.find((k) =>
                    s.slug.includes(k)
                  ) ?? "residential";
                  return (
                    <div
                      key={s.id}
                      className="bg-background rounded-xl border shadow-sm overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">{s.nameEn}</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {s.descriptionEn || s.shortDescriptionEn}
                        </p>
                        <ul className="space-y-3">
                          {(s.featuresEn ?? getFeatures(key)).map((f, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {s.image && (
                        <img
                          src={s.image}
                          alt={s.nameEn}
                          className="w-full h-48 object-cover"
                        />
                      )}
                    </div>
                  );
                })
              : serviceKeys.map((key) => {
                  const Icon = serviceIcons[key] ?? Building2;
                  return (
                    <div
                      key={key}
                      className="bg-background rounded-xl border shadow-sm p-8"
                    >
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-4">
                        {t(`services.${key}.title`)}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {t(`services.${key}.desc`)}
                      </p>
                      <ul className="space-y-3">
                        {getFeatures(key).map((f, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
