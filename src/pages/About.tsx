import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { Building2, Target, Eye, Award, Users, Shield, Clock, Leaf } from "lucide-react";

const milestones = [
  { year: "2004", title: "Founded", desc: "Business Pioneers Holding was established in Riyadh" },
  { year: "2008", title: "Expansion", desc: "Expanded to commercial construction projects" },
  { year: "2012", title: "Interior Division", desc: "Launched interior design and finishing division" },
  { year: "2016", title: "100 Projects", desc: "Completed our 100th project milestone" },
  { year: "2020", title: "Innovation", desc: "Adopted BIM and modern construction technologies" },
  { year: "2024", title: "Vision 2030", desc: "Major contributor to Saudi Vision 2030 projects" },
];

const values = [
  { icon: Shield, key: "integrity" },
  { icon: Award, key: "quality" },
  { icon: Target, key: "innovation" },
  { icon: Shield, key: "safety" },
  { icon: Users, key: "partnership" },
];

export default function About() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      {/* Page Header */}
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Building2 className="w-4 h-4" />
            <span>{t("nav.about")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("about.subtitle")}</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("about.description")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <Target className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">{t("about.mission.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("about.mission.text")}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <Eye className="w-6 h-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">{t("about.vision.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("about.vision.text")}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80"
                alt="Construction"
                className="rounded-xl object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80"
                alt="Site work"
                className="rounded-xl object-cover h-48 w-full mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.values.title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.key} className="bg-background rounded-xl p-6 text-center border shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-sm">{t(`about.values.${v.key}`)}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-primary/20 ml-4 space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
                  <div className="text-sm text-primary font-semibold mb-1">{m.year}</div>
                  <h3 className="font-semibold text-lg">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BP Holding</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Certified Excellence", desc: "ISO 9001, 14001, and 45001 certified" },
              { icon: Users, title: "Expert Team", desc: "200+ skilled engineers and professionals" },
              { icon: Clock, title: "On-Time Delivery", desc: "95% of projects delivered ahead of schedule" },
              { icon: Leaf, title: "Sustainable Build", desc: "Green building practices and materials" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-background rounded-xl p-6 border shadow-sm text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
