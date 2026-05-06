import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Building2 className="w-6 h-6 text-primary" />
              BP Holding
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("about.description")}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+966 11 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@bpholding.sa</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Riyadh, Kingdom of Saudi Arabia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t("nav.services")}
            </h3>
            <ul className="space-y-2">
              {[
                { key: "residential", to: "/services" },
                { key: "structural", to: "/services" },
                { key: "finishing", to: "/services" },
                { key: "design", to: "/services" },
                { key: "consultation", to: "/services" },
                { key: "projectManagement", to: "/services" },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(`services.${item.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t("nav.about")}
            </h3>
            <ul className="space-y-2">
              {[
                { label: t("nav.about"), to: "/about" },
                { label: t("nav.projects"), to: "/projects" },
                { label: t("nav.careers"), to: "/careers" },
                { label: t("nav.contractors"), to: "/contractors" },
                { label: t("nav.contact"), to: "/contact" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Profile */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Company Profile
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Download Company Profile (PDF)
                </Link>
              </li>
              <li>
                <Link
                  to="/quote"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.requestQuote")}
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-sm text-foreground mb-2">
                Working Hours
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("contact.info.weekdays")}: 8:00 AM - 5:00 PM
              </p>
              <p className="text-sm text-muted-foreground">
                {t("contact.info.weekend")}: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} Business Pioneers Holding. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.contact")}
            </Link>
            <Link
              to="/quote"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t("nav.requestQuote")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
