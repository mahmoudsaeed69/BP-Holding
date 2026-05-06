import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { trpc } from "@/providers/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Send, Loader2 } from "lucide-react";

export default function RequestQuote() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", company: "",
    projectType: "", projectDescription: "", estimatedBudget: "",
    timeline: "", location: "", servicesNeeded: [] as string[],
  });

  const submitMutation = trpc.rfq.submit.useMutation({
    onSuccess: () => {
      toast.success(t("quote.form.success"));
      setForm({ fullName: "", email: "", phone: "", company: "",
        projectType: "", projectDescription: "", estimatedBudget: "",
        timeline: "", location: "", servicesNeeded: [] });
    },
    onError: () => toast.error(t("contact.form.error")),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.projectType || !form.projectDescription) return;
    submitMutation.mutate(form);
  };

  const serviceOptions = [
    "Residential Construction", "Structural Concrete", "Interior Finishing",
    "Interior Design", "Engineering Consultation", "Project Management",
    "Renovation", "Landscaping", "MEP Works",
  ];

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <FileText className="w-4 h-4" />
            <span>{t("nav.requestQuote")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("quote.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("quote.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.name")} *</label>
                <Input value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.email")} *</label>
                <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.phone")} *</label>
                <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.company")}</label>
                <Input value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.projectType")} *</label>
                <Input value={form.projectType} onChange={e => setForm({...form, projectType: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.location")}</label>
                <Input value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.budget")}</label>
                <Input value={form.estimatedBudget} onChange={e => setForm({...form, estimatedBudget: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.timeline")}</label>
                <Input value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} /></div>
            </div>
            <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.services")}</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map(s => (
                  <button key={s} type="button"
                    onClick={() => setForm({...form, servicesNeeded: form.servicesNeeded.includes(s)
                      ? form.servicesNeeded.filter(x => x !== s) : [...form.servicesNeeded, s] })}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${form.servicesNeeded.includes(s)
                      ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-accent"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="text-sm font-medium mb-1.5 block">{t("quote.form.description")} *</label>
              <Textarea rows={6} value={form.projectDescription} onChange={e => setForm({...form, projectDescription: e.target.value})} required /></div>
            <Button type="submit" size="lg" disabled={submitMutation.isPending} className="w-full sm:w-auto">
              {submitMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {t("quote.form.submit")}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
