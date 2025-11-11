"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import BaseLayout from "../views/components/layout/base-layout";
import { LoaderFour } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { fetchData } from "@/lib/firebase/service";
import { OutputWithPrompt } from "@/types/data";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, ImageIcon, Search, X, Video } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import Link from "next/link";

// Type definitions for better type safety
type FilterType = "all" | "image" | "text" | "video";

interface FilterState {
  search: string;
  type: FilterType;
  model: string;
}

// Custom hook for managing filters
const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    model: "all",
  });

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: "", type: "all", model: "all" });
  }, []);

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== "" ||
      filters.type !== "all" ||
      filters.model !== "all",
    [filters]
  );

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  };
};

// Memoized components for better performance
const LoadingState = () => (
  <BaseLayout>
    <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      <div className="flex justify-center items-center min-h-[400px] text-5xl">
        <LoaderFour />
      </div>
    </div>
  </BaseLayout>
);

const ErrorState = () => (
  <BaseLayout>
    <div className="relative flex flex-1 w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      <h2 className="relative z-20 text-2xl md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
        Something{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
          glitched
        </span>
        . The prompt ran off to find{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
          inspiration 🧠
        </span>
      </h2>
    </div>
  </BaseLayout>
);

// Memoized filter badge component
const FilterBadge = ({
  label,
  value,
  onRemove,
}: {
  label: string;
  value: string;
  onRemove: () => void;
}) => (
  <Badge variant="secondary" className="flex items-center gap-1">
    {label}: {value}
    <X
      className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
      onClick={onRemove}
      aria-label={`Remove ${label} filter`}
    />
  </Badge>
);

// Memoized item card component
const ItemCard = ({ item }: { item: OutputWithPrompt }) => {
  const handleCopyPrompt = useCallback(async () => {
    try {
      const promptText = item.prompt_id?.prompt || "";
      await navigator.clipboard.writeText(promptText);
      toast.success("Prompt copied successfully!", {
        description: "Success copied prompt to clipboard",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Failed to copy prompt", {
        description: "Please try again or copy manually",
      });
    }
  }, [item.prompt_id?.prompt]);

  if (!item.prompt_id) {
    return (
      <div className="shadow hover:shadow-lg transition bg-white dark:bg-zinc-800 h-72 flex items-center justify-center rounded-md">
        <p className="text-sm text-red-500">Prompt not found</p>
      </div>
    );
  }

  const isImageType = item.type === "image";

  const DialogContentComponent = () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b">
        <div className="flex-1">
          <DialogTitle className="text-xl font-semibold text-left">
            {item.prompt_id?.title}
          </DialogTitle>
        </div>
        <DialogClose asChild></DialogClose>
      </DialogHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
        {/* Left Column - Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Prompt</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed max-h-80 overflow-auto border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
              {item.prompt_id?.prompt || "No prompt available"}
            </p>
          </div>

          {item.prompt_id?.tags && item.prompt_id.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {item.prompt_id.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.ai_model && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">AI Model:</span>
              <Badge className="text-sm">{item.ai_model}</Badge>
            </div>
          )}

          <div className="pt-4">
            <Button
              onClick={handleCopyPrompt}
              variant="outline"
              className="w-fit"
            >
              Copy Prompt
            </Button>
          </div>
        </div>

        {/* Right Column - Output */}
        <div>
          <h3 className="text-sm font-medium mb-2">Generated Content</h3>
          {isImageType ? (
            <div className="rounded-lg overflow-hidden border">
              <Image
                src={item.result}
                alt={`Generated image: ${item.prompt_id?.title}`}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto"
                priority={false}
              />
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-3">
                {item.type === "video" ? (
                  <Video className="w-5 h-5 text-gray-500" />
                ) : (
                  <FileText className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.type === "video" ? "Video Content" : "Text Content"}
                </span>
              </div>
              {item.type === "text" ? (
                <div className="max-h-80 overflow-auto text-sm text-gray-700 dark:text-gray-300">
                  {item.result}
                </div>
              ) : (
                <Link
                  href={item.result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
                >
                  View Video →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="shadow hover:shadow-lg transition group">
      <Dialog>
        <DialogTrigger asChild>
          {isImageType ? (
            <div className="relative cursor-pointer rounded-md overflow-hidden">
              <Image
                src={item.result}
                alt={`Generated image: ${item.prompt_id.title}`}
                width={400}
                height={300}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white line-clamp-2 drop-shadow-lg">
                    {item.prompt_id.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        item.created_by.photoURL ||
                        "https://github.com/shadcn.png"
                      }
                      alt={item.created_by.displayName || "User"}
                    />
                    <AvatarFallback className="text-xs">
                      {item.created_by.displayName?.slice(0, 2).toUpperCase() ||
                        "US"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium text-white drop-shadow-md">
                    {item.prompt_id.created_by.displayName}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-800 h-72 flex flex-col items-center justify-center group cursor-pointer rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
              <div className="flex flex-col items-center gap-4 p-4">
                <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                  {item.type === "video" ? (
                    <Video className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  ) : (
                    <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  )}
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-black dark:text-white mb-1 line-clamp-2">
                    {item.prompt_id.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {item.prompt_id.created_by.displayName}
                  </p>
                  {item.ai_model && (
                    <Badge variant="outline" className="text-xs">
                      {item.ai_model}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogTrigger>
        <DialogContentComponent />
      </Dialog>
    </div>
  );
};

export default function ExplorePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OutputWithPrompt[]>([]);

  const { filters, updateFilter, clearFilters, hasActiveFilters } =
    useFilters();

  // Fetch data with error handling
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchData("outputs");

        if (isMounted) {
          setData(Array.isArray(result) ? result : []);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        if (isMounted) {
          setError("Failed to load data. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get unique AI models with memoization
  const availableModels = useMemo(() => {
    const models = new Set<string>();
    data.forEach((item) => {
      if (item.ai_model) {
        models.add(item.ai_model);
      }
    });
    return Array.from(models).sort();
  }, [data]);

  // Optimized filter and search logic
  const filteredData = useMemo(() => {
    if (!data.length) return [];

    return data.filter((item) => {
      // Early return if item doesn't have prompt_id
      if (!item.prompt_id) return false;

      // Search filter - case insensitive
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          item.prompt_id.title?.toLowerCase().includes(searchLower) ||
          item.prompt_id.created_by?.displayName
            ?.toLowerCase()
            .includes(searchLower) ||
          item.created_by?.displayName?.toLowerCase().includes(searchLower) ||
          item.prompt_id.prompt?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type !== "all" && item.type !== filters.type) {
        return false;
      }

      // Model filter
      if (filters.model !== "all" && item.ai_model !== filters.model) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  // Early returns for loading and error states
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <BaseLayout>
      <div className="relative flex flex-col w-full items-center justify-start bg-white dark:bg-black px-6 py-8 gap-6 md:pt-24">
        <Toaster />
        <div className="w-full max-w-7xl">
          <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Explore Creations
          </h1>

          {/* Search and Filter Controls */}
          <div className="space-y-4 mb-8">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by title, keyword, or creator..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10 pr-4 py-2 w-full h-14"
                aria-label="Search creations"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4">
              {/* Type Filter */}
              <Select
                value={filters.type}
                onValueChange={(value) => updateFilter("type", value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Images
                    </div>
                  </SelectItem>
                  <SelectItem value="text">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Text
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Video
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* AI Model Filter */}
              <Select
                value={filters.model}
                onValueChange={(value) => updateFilter("model", value)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {availableModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                  Clear filters
                </Button>
              )}
            </div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <FilterBadge
                    label="Search"
                    value={
                      filters.search.length > 20
                        ? `"${filters.search.substring(0, 20)}..."`
                        : `"${filters.search}"`
                    }
                    onRemove={() => updateFilter("search", "")}
                  />
                )}
                {filters.type !== "all" && (
                  <FilterBadge
                    label="Type"
                    value={filters.type}
                    onRemove={() => updateFilter("type", "all")}
                  />
                )}
                {filters.model !== "all" && (
                  <FilterBadge
                    label="Model"
                    value={filters.model}
                    onRemove={() => updateFilter("model", "all")}
                  />
                )}
              </div>
            )}
          </div>

          {/* Results Container */}
          <div className="w-full min-h-[400px]">
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                {data.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-300 text-lg">
                    No creations found.
                  </p>
                ) : (
                  <div className="space-y-4 text-center">
                    <p className="text-gray-500 dark:text-gray-300 text-lg">
                      No results match your search criteria.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
