import { useRef } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Building2,
  Download,
  Printer,
  Award,
  Users,
  Target,
  Globe,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function CompanyProfile() {
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";
  const profileRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!profileRef.current) return;
    const canvas = await html2canvas(profileRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("BP-Holding-Company-Profile.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  const highlights = [
    { icon: Award, label: "ISO 9001:2015 Certified" },
    { icon: Users, label: "200+ Expert Employees" },
    { icon: Target, label: "150+ Projects Delivered" },
    { icon: Globe, label: "Serving All KSA Regions" },
    { icon: Calendar, label: "20+ Years of Excellence" },
    { icon: Building2, label: "Vision 2030 Contributor" },
  ];

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Building2 className="w-4 h-4" />
            <span>Company Profile</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Business Pioneers Holding</h1>
          <p className="text-lg text-muted-foreground">Company Profile & Portfolio</p>
          <div className="flex gap-3 mt-6 print:hidden">
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </section>

      <div ref={profileRef} className="bg-white text-black py-12">
        <div className="container mx-auto px-4">
          {/* Cover */}
          <div className="text-center mb-12 border-b pb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Business Pioneers Holding</h2>
            <p className="text-muted-foreground text-lg">Building Excellence Across Saudi Arabia</p>
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" />+966 11 234 5678</span>
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" />info@bpholding.sa</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />Riyadh, KSA</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <Card key={h.label} className="border">
                  <CardContent className="pt-4 pb-3 flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{h.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* About */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-muted-foreground leading-relaxed">
              Business Pioneers Holding (BP Holding) is a premier Saudi construction and engineering company 
              established in 2004. With over two decades of excellence, we have delivered more than 150 projects 
              across residential, commercial, and industrial sectors. Our comprehensive services include residential 
              construction, structural concrete works, interior finishing, interior design, and engineering consultation.
              We are proud contributors to Saudi Vision 2030, committed to building sustainable communities and 
                world-class infrastructure across the Kingdom.
            </p>
          </div>

          {/* Services */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Residential Construction", desc: "Premium villas and residential buildings with modern designs" },
                { title: "Structural Concrete Works", desc: "Foundations, columns, beams, and frameworks" },
                { title: "Interior Finishing", desc: "Flooring, painting, gypsum, and decorative works" },
                { title: "Interior Design", desc: "Creative space planning and 3D visualization" },
                { title: "Engineering Consultation", desc: "Feasibility studies, planning, and compliance" },
                { title: "Project Management", desc: "End-to-end coordination and quality assurance" },
              ].map((s) => (
                <div key={s.title} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-1">{s.title}</h4>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Featured Projects</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: "Al Faisaliah Villa Complex", loc: "Riyadh", val: "SAR 45M" },
                { name: "Nakheel Tower Structure", loc: "Jeddah", val: "SAR 120M" },
                { name: "Diplomatic Quarter Residences", loc: "Riyadh", val: "SAR 85M" },
              ].map((p) => (
                <div key={p.name} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-1">{p.name}</h4>
                  <p className="text-xs text-muted-foreground">{p.loc} | {p.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="border-t pt-8 text-center">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />King Fahd Road, Riyadh 12212, KSA</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" />+966 11 234 5678</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" />info@bpholding.sa</span>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              &copy; {new Date().getFullYear()} Business Pioneers Holding. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
