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
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  PhoneCall,
} from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const submitMutation = trpc.inquiry.submit.useMutation({
    onSuccess: () => {
      toast.success(t("contact.form.success"));
      setForm({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    },
    onError: () => toast.error(t("contact.form.error")),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.subject || !form.message) return;
    submitMutation.mutate({
      ...form,
      inquiryType: form.inquiryType as "general" | "project" | "partnership" | "career" | "contractor" | "media",
    });
  };

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <PhoneCall className="w-4 h-4" />
            <span>{t("nav.contact")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.form.name")} *</label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.form.email")} *</label>
                    <Input type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.form.phone")}</label>
                    <Input value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.form.company")}</label>
                    <Input value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.form.type")}</label>
                    <Select value={form.inquiryType} onValueChange={(v) => setForm({ ...form, inquiryType: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{t("contact.form.subject")} *</label>
                    <Input value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("contact.form.message")} *</label>
                  <Textarea rows={6} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" size="lg" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {t("contact.form.submit")}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg">{t("contact.info.title")}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium">{t("contact.info.address")}</span>
                    <p className="text-sm text-muted-foreground">King Fahd Road, Riyadh 12212, KSA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium">{t("contact.info.phone")}</span>
                    <p className="text-sm text-muted-foreground">+966 11 234 5678</p>
                    <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium">{t("contact.info.email")}</span>
                    <p className="text-sm text-muted-foreground">info@bpholding.sa</p>
                    <p className="text-sm text-muted-foreground">projects@bpholding.sa</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium">{t("contact.info.hours")}</span>
                    <p className="text-sm text-muted-foreground">{t("contact.info.weekdays")}: 8:00 AM - 5:00 PM</p>
                    <p className="text-sm text-muted-foreground">{t("contact.info.weekend")}: Closed</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border h-48 bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Riyadh, Saudi Arabia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
