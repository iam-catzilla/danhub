"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TagListProps {
  tags: string[];
  onTagClick: (tag: string) => void;
}

export function TagList({ tags, onTagClick }: TagListProps) {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<"alpha" | "length">("alpha");

  const filteredTags = tags
    .filter((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === "alpha") return a.localeCompare(b);
      return b.length - a.length;
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-black/20 p-2 rounded-full border border-yellow-500/5">
        <div className="relative flex-1 max-w-xs">
          <Input
            placeholder="Filter tags..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-9 bg-transparent border-none text-[10px] text-yellow-500 placeholder:text-yellow-500/20 uppercase tracking-widest pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Select value={sort} onValueChange={(v: any) => setSort(v)}>
          <SelectTrigger className="h-9 w-40 bg-transparent border-none text-[10px] text-yellow-500 uppercase tracking-widest focus:ring-0 focus:ring-offset-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-yellow-500/20 text-yellow-500 min-w-[200px]">
            <SelectItem
              value="alpha"
              className="text-[10px] uppercase tracking-widest focus:bg-yellow-500 focus:text-black"
            >
              Alphabetical
            </SelectItem>
            <SelectItem
              value="length"
              className="text-[10px] uppercase tracking-widest focus:bg-yellow-500 focus:text-black"
            >
              Tag Length
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center">
        {filteredTags.map((tag) => (
          <button
            key={tag}
            className="group relative px-2 py-1 transition-all outline-none"
            onClick={() => onTagClick(tag)}
          >
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-yellow-500/40 group-hover:text-yellow-500 transition-colors">
              {tag.replace(/_/g, " ")}
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-yellow-500/0 group-hover:bg-yellow-500/30 transition-all origin-left scale-x-0 group-hover:scale-x-100" />
          </button>
        ))}
        {filteredTags.length === 0 && (
          <p className="text-yellow-500/30 text-xs italic">
            No tags found matching "{filter}"
          </p>
        )}
      </div>
    </div>
  );
}
