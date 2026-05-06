import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Routes, Route, Link } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { trpc } from "@/providers/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Shield,
  LayoutDashboard,
  Briefcase,
  HardHat,
  PhoneCall,
  FileText,
  Users,
  Loader2,
} from "lucide-react";

const COLORS = ["#0f766e", "#14b8a6", "#5eead4", "#2dd4bf", "#0d9488", "#99f6e4"];

function AdminOverview() {
  const { data: stats, isLoading } = trpc.stats.dashboard.useQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totals = stats?.totals ?? { projects: 0, jobs: 0, contractors: 0, inquiries: 0, rfqs: 0, users: 0 };
  const pending = stats?.pending ?? { jobs: 0, inquiries: 0, rfqs: 0, contractors: 0 };

  const chartData = [
    { name: "Projects", value: totals.projects },
    { name: "Applications", value: totals.jobs },
    { name: "Contractors", value: totals.contractors },
    { name: "Inquiries", value: totals.inquiries },
    { name: "RFQs", value: totals.rfqs },
  ];

  const pendingData = [
    { name: "New Jobs", value: pending.jobs },
    { name: "New Inquiries", value: pending.inquiries },
    { name: "New RFQs", value: pending.rfqs },
    { name: "New Contractors", value: pending.contractors },
  ];

  const statCards = [
    { label: "Projects", value: totals.projects, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Applications", value: totals.jobs, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Contractors", value: totals.contractors, icon: HardHat, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Inquiries", value: totals.inquiries, icon: PhoneCall, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "RFQs", value: totals.rfqs, icon: FileText, color: "text-red-600", bg: "bg-red-50" },
    { label: "Users", value: totals.users, icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="pt-4 pb-3">
                <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-2`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Totals Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pendingData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={4}>
                  {pendingData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {pendingData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {entry.name}: {entry.value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ApplicationsTable() {
  const [status, setStatus] = useState<string>("");
  const { data, isLoading, refetch } = trpc.jobApplication.list.useQuery({
    status: status ? (status as "new" | "reviewing" | "interview" | "rejected" | "hired") : undefined,
  });

  const updateMutation = trpc.jobApplication.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button variant={status === "" ? "default" : "outline"} size="sm" onClick={() => setStatus("")}>All</Button>
        {["new", "reviewing", "interview", "rejected", "hired"].map(s => (
          <Button key={s} variant={status === s ? "default" : "outline"} size="sm" onClick={() => setStatus(s)} className="capitalize">{s}</Button>
        ))}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.items ?? []).length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No applications found</TableCell></TableRow>
            ) : (data?.items ?? []).map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.fullName}</TableCell>
                <TableCell>{app.position}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell><Badge variant={app.status === "new" ? "default" : app.status === "hired" ? "secondary" : "outline"} className="capitalize">{app.status}</Badge></TableCell>
                <TableCell>{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {app.status === "new" && <Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: app.id, status: "reviewing" })}>Review</Button>}
                    {app.status === "reviewing" && <Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: app.id, status: "interview" })}>Interview</Button>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ContractorsTable() {
  const [status, setStatus] = useState<string>("");
  const { data, isLoading, refetch } = trpc.contractor.list.useQuery({
    status: status ? (status as "new" | "reviewing" | "approved" | "rejected") : undefined,
  });

  const updateMutation = trpc.contractor.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button variant={status === "" ? "default" : "outline"} size="sm" onClick={() => setStatus("")}>All</Button>
        {["new", "reviewing", "approved", "rejected"].map(s => (
          <Button key={s} variant={status === s ? "default" : "outline"} size="sm" onClick={() => setStatus(s)} className="capitalize">{s}</Button>
        ))}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.items ?? []).length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No contractors found</TableCell></TableRow>
            ) : (data?.items ?? []).map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.companyName}</TableCell>
                <TableCell className="capitalize">{c.companyType}</TableCell>
                <TableCell>{c.contactName}<br/><span className="text-xs text-muted-foreground">{c.email}</span></TableCell>
                <TableCell><Badge variant={c.status === "new" ? "default" : c.status === "approved" ? "secondary" : "outline"} className="capitalize">{c.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {c.status === "new" && <Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: c.id, status: "reviewing" })}>Review</Button>}
                    {c.status === "reviewing" && <><Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: c.id, status: "approved" })}>Approve</Button><Button size="sm" variant="ghost" className="text-red-500" onClick={() => updateMutation.mutate({ id: c.id, status: "rejected" })}>Reject</Button></>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function InquiriesTable() {
  const [status, setStatus] = useState<string>("");
  const { data, isLoading, refetch } = trpc.inquiry.list.useQuery({
    status: status ? (status as "new" | "in_progress" | "resolved" | "archived") : undefined,
  });

  const updateMutation = trpc.inquiry.updateStatus.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button variant={status === "" ? "default" : "outline"} size="sm" onClick={() => setStatus("")}>All</Button>
        {["new", "in_progress", "resolved", "archived"].map(s => (
          <Button key={s} variant={status === s ? "default" : "outline"} size="sm" onClick={() => setStatus(s)} className="capitalize">{s}</Button>
        ))}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data?.items ?? []).length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No inquiries found</TableCell></TableRow>
            ) : (data?.items ?? []).map((inq) => (
              <TableRow key={inq.id}>
                <TableCell className="font-medium">{inq.fullName}</TableCell>
                <TableCell>{inq.subject}</TableCell>
                <TableCell className="capitalize">{inq.inquiryType}</TableCell>
                <TableCell><Badge variant={inq.status === "new" ? "default" : "outline"} className="capitalize">{inq.status}</Badge></TableCell>
                <TableCell>{inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "-"}</TableCell>
                <TableCell>
                  {inq.status === "new" && <Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: inq.id, status: "in_progress" })}>Process</Button>}
                  {inq.status === "in_progress" && <Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: inq.id, status: "resolved" })}>Resolve</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RfqsTable() {
  const { data, isLoading, refetch } = trpc.rfq.list.useQuery();
  const updateMutation = trpc.rfq.updateStatus.useMutation({ onSuccess: () => refetch() });

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin" /></div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data?.items ?? []).length === 0 ? (
            <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No RFQs found</TableCell></TableRow>
          ) : (data?.items ?? []).map((rfq) => (
            <TableRow key={rfq.id}>
              <TableCell className="font-medium">{rfq.fullName}<br/><span className="text-xs text-muted-foreground">{rfq.email}</span></TableCell>
              <TableCell>{rfq.projectType}</TableCell>
              <TableCell>{rfq.estimatedBudget || "-"}</TableCell>
              <TableCell><Badge variant={rfq.status === "new" ? "default" : "outline"} className="capitalize">{rfq.status}</Badge></TableCell>
              <TableCell>{rfq.createdAt ? new Date(rfq.createdAt).toLocaleDateString() : "-"}</TableCell>
              <TableCell>
                {rfq.status === "new" && <Button size="sm" variant="ghost" onClick={() => updateMutation.mutate({ id: rfq.id, status: "reviewing" })}>Review</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
    if (!isLoading && user && user.role !== "admin") navigate("/dashboard");
  }, [isLoading, isAuthenticated, user, navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!user || user.role !== "admin") return null;

  const navItems = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/applications", label: "Applications", icon: Briefcase },
    { to: "/admin/contractors", label: "Contractors", icon: HardHat },
    { to: "/admin/inquiries", label: "Inquiries", icon: PhoneCall },
    { to: "/admin/rfqs", label: "RFQs", icon: FileText },
  ];

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">{t("admin.title")}</h1>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <nav className="space-y-1 lg:sticky lg:top-24 lg:self-start">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to || (item.to !== "/admin" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Content */}
          <div>
            <Routes>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/applications" element={<ApplicationsTable />} />
              <Route path="/contractors" element={<ContractorsTable />} />
              <Route path="/inquiries" element={<InquiriesTable />} />
              <Route path="/rfqs" element={<RfqsTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
