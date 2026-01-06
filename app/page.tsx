"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchAllSites, getRandomTag } from "@/lib/api";
import { BooruPost } from "@/lib/types";
import { PostGrid } from "@/components/post-grid";
import { PostDialog } from "@/components/post-dialog";
import { TagList } from "@/components/tag-list";
import { Header } from "@/components/header";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [posts, setPosts] = useState<BooruPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BooruPost | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const observerTarget = useRef(null);

  const handleRandom = useCallback(() => {
    const tag = getRandomTag();
    setSearchQuery(tag);
    setPage(1);
    toast.success(`Discovery: ${tag.replace(/_/g, " ")}`);
  }, []);

  const loadPosts = useCallback(
    async (query: string = "", pageNum: number = 1) => {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const results = await fetchAllSites({
        tags: query,
        limit: 50,
        page: pageNum,
      });

      setPosts((prev) => (pageNum === 1 ? results : [...prev, ...results]));

      if (pageNum === 1) {
        const tags = Array.from(new Set(results.flatMap((p) => p.tags))).slice(
          0,
          50
        );
        setAllTags(tags);
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    },
    []
  );

  // Initial random tag search on mount
  useEffect(() => {
    handleRandom();
  }, [handleRandom]);

  useEffect(() => {
    if (searchQuery) {
      loadPosts(searchQuery, 1);
    }
  }, [searchQuery, loadPosts]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          !loadingMore &&
          posts.length > 0
        ) {
          setPage((prev) => {
            const next = prev + 1;
            loadPosts(searchQuery, next);
            return next;
          });
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, loadingMore, posts.length, searchQuery, loadPosts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    toast.info(`Searching for: ${query}`);
  };

  const handlePostClick = (post: BooruPost) => {
    setSelectedPost(post);
  };

  const handleNextPost = () => {
    if (!selectedPost) return;
    const currentIndex = posts.findIndex(
      (p) => p.id === selectedPost.id && p.site === selectedPost.site
    );
    if (currentIndex < posts.length - 1) {
      setSelectedPost(posts[currentIndex + 1]);
    }
  };

  const handlePrevPost = () => {
    if (!selectedPost) return;
    const currentIndex = posts.findIndex(
      (p) => p.id === selectedPost.id && p.site === selectedPost.site
    );
    if (currentIndex > 0) {
      setSelectedPost(posts[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-500 font-sans">
      <Header
        onSearch={handleSearch}
        onRandom={handleRandom}
        currentQuery={searchQuery}
      />

      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* WELCOME SECTION */}
        <section className="text-center space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">
            Welcome to <span className="text-yellow-500">DANHUB</span>
          </h1>
          <p className="text-yellow-500/40 uppercase tracking-[0.4em] text-[10px] font-black">
            Home to all booru's
          </p>
        </section>

        {/* TAGS CONTAINER */}
        <section className="bg-zinc-900/40 border border-yellow-500/20 rounded-[2rem] shadow-2xl overflow-hidden">
          <Collapsible open={isTagsOpen} onOpenChange={setIsTagsOpen}>
            <CollapsibleTrigger className="w-full p-8 flex items-center justify-center gap-4 hover:bg-yellow-500/5 transition-colors group">
              <span className="h-px w-8 bg-yellow-500/20 group-hover:bg-yellow-500/40 transition-colors" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500/50 flex items-center gap-2">
                TAGS SHOWN HERE
                {isTagsOpen ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </h3>
              <span className="h-px w-8 bg-yellow-500/20 group-hover:bg-yellow-500/40 transition-colors" />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-8 pb-8">
              <TagList tags={allTags} onTagClick={handleSearch} />
            </CollapsibleContent>
          </Collapsible>
        </section>

        <PostGrid
          posts={posts}
          loading={loading}
          onPostClick={handlePostClick}
        />

        {/* INFINITE SCROLL TARGET */}
        <div
          ref={observerTarget}
          className="h-20 flex items-center justify-center"
        >
          {loadingMore && (
            <div className="text-yellow-500/50 text-[10px] font-black uppercase tracking-widest animate-pulse">
              Loading more masterpieces...
            </div>
          )}
        </div>
      </main>

      <ProgressiveBlur height="100px" position="bottom" />

      {selectedPost && (
        <PostDialog
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onNext={handleNextPost}
          onPrev={handlePrevPost}
          hasPrev={
            posts.findIndex(
              (p) => p.id === selectedPost.id && p.site === selectedPost.site
            ) > 0
          }
          hasNext={
            posts.findIndex(
              (p) => p.id === selectedPost.id && p.site === selectedPost.site
            ) <
            posts.length - 1
          }
        />
      )}
    </div>
  );
}
