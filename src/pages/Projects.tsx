import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/providers/LanguageProvider";
import { trpc } from "@/providers/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  ArrowRight,
  Building2,
  Loader2,
} from "lucide-react";

export default function Projects() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === "rtl";

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: categoriesData } = trpc.category.list.useQuery();
  const { data, isLoading } = trpc.project.list.useQuery({
    search: debouncedSearch || undefined,
    categoryId: categoryId !== "all" ? Number(categoryId) : undefined,
    status: status !== "all" ? (status as "completed" | "ongoing" | "upcoming") : undefined,
    sortBy,
    limit: 24,
  });

  const handleSearch = () => setDebouncedSearch(search);
  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategoryId("all");
    setStatus("all");
    setSortBy("newest");
  };

  const projects = data?.items ?? [];

  return (
    <div className={isRTL ? "text-right" : ""} dir={direction}>
      <section className="bg-muted/50 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Building2 className="w-4 h-4" />
            <span>{t("nav.projects")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t("projects.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("projects.subtitle")}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b bg-background sticky top-16 lg:top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 items-center flex-1 w-full lg:w-auto">
              <div className="flex gap-2 flex-1 max-w-md">
                <Input
                  placeholder={t("projects.search")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSearch} variant="secondary">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t("projects.allCategories")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("projects.allCategories")}</SelectItem>
                  {(categoriesData ?? []).map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("projects.allStatuses")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("projects.allStatuses")}</SelectItem>
                  <SelectItem value="completed">{t("projects.completed")}</SelectItem>
                  <SelectItem value="ongoing">{t("projects.ongoing")}</SelectItem>
                  <SelectItem value="upcoming">{t("projects.upcoming")}</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as "newest" | "oldest" | "title")}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder={t("projects.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("projects.newest")}</SelectItem>
                  <SelectItem value="oldest">{t("projects.oldest")}</SelectItem>
                  <SelectItem value="title">{t("projects.sortBy")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(search || categoryId !== "all" || status !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
          {data && (
            <p className="text-sm text-muted-foreground mt-3">
              {data.total} project{data.total !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground">
                {t("projects.noResults")}
              </h3>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group bg-background rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.featuredImage ?? `https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80`}
                      alt={project.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs px-2.5 py-1 rounded-full capitalize">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {project.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {project.shortDescriptionEn || project.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {project.locationEn}
                      </span>
                      <span className="text-xs text-primary font-medium flex items-center gap-1">
                        {t("projects.viewProject")}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
