import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { trpc } from "@/providers/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  HardHat,
  Send,
  Loader2,
  Shield,
  Handshake,
  FileCheck,
  TrendingUp,
} from "lucide-react";

const benefits = [
  { icon: Handshake, title: "Partnership", desc: "Long-term collaboration opportunities" },
  { icon: Shield, title: "Fair Procurement", desc: "Transparent and competitive bidding process" },
  { icon: FileCheck, title: "Compliance", desc: "Full regulatory compliance support" },
  { icon: TrendingUp, title: "Growth", desc: "Grow your business with major projects" },
];

export default function Contractors() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [form, setForm] = useState<{
    companyName: string; contactName: string; email: string; phone: string;
    companyType: "contractor" | "supplier" | "subcontractor" | "consultant"; specialization: string; crNumber: string;
    vatNumber: string; yearsOfExperience: number | undefined;
    numberOfEmployees: number | undefined; annualRevenue: string;
    website: string; address: string; city: string; country: string;
    services: string[]; certifications: string[];
    pastProjects: string; message: string;
  }>({
    companyName: "", contactName: "", email: "", phone: "",
    companyType: "contractor", specialization: "", crNumber: "",
    vatNumber: "", yearsOfExperience: undefined,
    numberOfEmployees: undefined, annualRevenue: "",
    website: "", address: "", city: "", country: "Saudi Arabia",
    services: [], certifications: [],
    pastProjects: "", message: "",
  });

  const submitMutation = trpc.contractor.submit.useMutation({
    onSuccess: () => {
      toast.success(t("contractors.form.success"));
      setForm({ companyName: "", contactName: "", email: "", phone: "",
        companyType: "contractor", specialization: "", crNumber: "",
        vatNumber: "", yearsOfExperience: undefined, numberOfEmployees: undefined,
        annualRevenue: "", website: "", address: "", city: "", country: "Saudi Arabia",
        services: [], certifications: [], pastProjects: "", message: "" });
    },
    onError: () => toast.error(t("contact.form.error")),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactName || !form.email || !form.phone) return;
    submitMutation.mutate(form);
  };

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <HardHat className="w-4 h-4" />
            <span>{t("nav.contractors")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("contractors.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("contractors.subtitle")}</p>
        </div>
      </section>

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

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Registration Form</h2>
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.companyName")} *</label>
                <Input value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.contactName")} *</label>
                <Input value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.email")} *</label>
                <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.phone")} *</label>
                <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.companyType")} *</label>
                <Select value={form.companyType} onValueChange={(v: "contractor" | "supplier" | "subcontractor" | "consultant") => setForm({...form, companyType: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="subcontractor">Subcontractor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.specialization")}</label>
                <Input value={form.specialization} onChange={e => setForm({...form, specialization: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.crNumber")}</label>
                <Input value={form.crNumber} onChange={e => setForm({...form, crNumber: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.vatNumber")}</label>
                <Input value={form.vatNumber} onChange={e => setForm({...form, vatNumber: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.experience")}</label>
                <Input type="number" value={form.yearsOfExperience ?? ""} onChange={e => setForm({...form, yearsOfExperience: Number(e.target.value)})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.employees")}</label>
                <Input type="number" value={form.numberOfEmployees ?? ""} onChange={e => setForm({...form, numberOfEmployees: Number(e.target.value)})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.revenue")}</label>
                <Input value={form.annualRevenue} onChange={e => setForm({...form, annualRevenue: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.website")}</label>
                <Input value={form.website} onChange={e => setForm({...form, website: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.city")}</label>
                <Input value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">{t("contractors.form.address")}</label>
                <Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("contractors.form.pastProjects")}</label>
              <Textarea rows={4} value={form.pastProjects} onChange={e => setForm({...form, pastProjects: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t("contractors.form.message")}</label>
              <Textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <Button type="submit" size="lg" disabled={submitMutation.isPending} className="w-full sm:w-auto">
              {submitMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {t("contractors.form.submit")}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
