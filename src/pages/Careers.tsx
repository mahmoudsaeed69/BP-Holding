import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { trpc } from "@/providers/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Briefcase,
  Send,
  Loader2,
  Users,
  TrendingUp,
  GraduationCap,
  Heart,
} from "lucide-react";

const benefits = [
  { icon: TrendingUp, title: "Career Growth", desc: "Clear progression paths and professional development" },
  { icon: GraduationCap, title: "Training", desc: "Continuous learning and certification programs" },
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive medical coverage for you and family" },
  { icon: Users, title: "Team Culture", desc: "Collaborative environment with diverse teams" },
];

export default function Careers() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", position: "", department: "",
    experience: "", education: "", salaryExpectation: "", message: "",
    cvUrl: "", portfolioUrl: "",
  });

  const submitMutation = trpc.jobApplication.submit.useMutation({
    onSuccess: () => {
      toast.success(t("careers.form.success"));
      setForm({ fullName: "", email: "", phone: "", position: "", department: "",
        experience: "", education: "", salaryExpectation: "", message: "",
        cvUrl: "", portfolioUrl: "" });
    },
    onError: () => toast.error(t("contact.form.error")),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.position) return;
    submitMutation.mutate(form);
  };

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Briefcase className="w-4 h-4" />
            <span>{t("nav.careers")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("careers.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("careers.subtitle")}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-background rounded-xl p-6 border shadow-sm text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Submit Your Application</h2>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.name")} *</label>
                <Input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.email")} *</label>
                <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.phone")} *</label>
                <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.position")} *</label>
                <Input value={form.position} onChange={e => setForm({...form, position: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.department")}</label>
                <Input value={form.department} onChange={e => setForm({...form, department: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.experience")}</label>
                <Input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.education")}</label>
                <Input value={form.education} onChange={e => setForm({...form, education: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.salary")}</label>
                <Input value={form.salaryExpectation} onChange={e => setForm({...form, salaryExpectation: e.target.value})} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.cv")}</label>
                <Input placeholder="Paste CV URL" value={form.cvUrl} onChange={e => setForm({...form, cvUrl: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.portfolio")}</label>
                <Input placeholder="Portfolio URL" value={form.portfolioUrl} onChange={e => setForm({...form, portfolioUrl: e.target.value})} /></div>
            </div>
            <div><label className="text-sm font-medium mb-1.5 block">{t("careers.form.message")}</label>
              <Textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} /></div>
            <Button type="submit" size="lg" disabled={submitMutation.isPending} className="w-full sm:w-auto">
              {submitMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {t("careers.form.submit")}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
