"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onRandom: () => void;
  currentQuery?: string;
}

export function Header({ onSearch, onRandom, currentQuery }: HeaderProps) {
  const [value, setValue] = useState(currentQuery || "");

  useEffect(() => {
    if (currentQuery !== undefined) {
      setValue(currentQuery);
    }
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-black/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <a
            href="/"
            className="text-2xl font-black italic tracking-tighter text-yellow-500 hover:text-white transition-colors"
          >
            DANHUB
          </a>
        </div>

        {/* SEARCH BAR - CENTERED */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSubmit} className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500/40 group-focus-within:text-yellow-500 transition-colors" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search all boorus..."
              className="pl-10 h-10 bg-zinc-900 border-yellow-500/20 text-yellow-500 placeholder:text-yellow-500/30 rounded-full focus-visible:ring-yellow-500 focus-visible:border-yellow-500 focus-visible:bg-black transition-all"
            />
          </form>
        </div>

        {/* LINKS - RIGHT */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-yellow-500/60 transition-all">
            <button
              onClick={onRandom}
              className="hover:text-yellow-500 transition-all uppercase cursor-pointer outline-none"
            >
              Random
            </button>
            <a
              href="https://danbooru.donmai.us/wiki_pages/help:api"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500 transition-all"
            >
              API Docs
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
