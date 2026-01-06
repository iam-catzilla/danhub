"use client";

import { BooruPost } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Play, Music } from "lucide-react";
import { isVideo, isAudio } from "@/lib/utils";

interface PostGridProps {
  posts: BooruPost[];
  loading: boolean;
  onPostClick: (post: BooruPost) => void;
}

export function PostGrid({ posts, loading, onPostClick }: PostGridProps) {
  const [mounted, setMounted] = useState(false);
  const [skeletonHeights, setSkeletonHeights] = useState<number[]>([]);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
    setSkeletonHeights(
      Array.from({ length: 15 }).map(
        () => Math.floor(Math.random() * 200) + 200
      )
    );
  }, []);

  if (loading || !mounted) {
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full mb-4 bg-zinc-900 rounded-none border border-yellow-500/10"
            style={{
              height:
                mounted && skeletonHeights[i]
                  ? `${skeletonHeights[i]}px`
                  : "250px",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {posts
        .filter((post) => !failedImages.has(`${post.site}-${post.id}`))
        .map((post) => {
          const video = isVideo(post.file_url);
          const audio = isAudio(post.file_url);

          return (
            <Card
              key={`${post.site}-${post.id}`}
              className="break-inside-avoid mb-4 group relative overflow-hidden bg-zinc-900 border-none rounded-none cursor-pointer"
              onClick={() => onPostClick(post)}
            >
              {/* Using a placeholder div for audio as it has no valid preview image usually */}
              {audio ? (
                <div className="w-full aspect-square bg-zinc-900 flex items-center justify-center border border-yellow-500/10">
                  <Music className="h-12 w-12 text-yellow-500/20" />
                </div>
              ) : (
                <img
                  src={post.preview_url || post.file_url}
                  alt={post.tags?.slice(0, 3).join(" ") || "Post"}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={() => {
                    setFailedImages((prev) => {
                      const next = new Set(prev);
                      next.add(`${post.site}-${post.id}`);
                      return next;
                    });
                  }}
                />
              )}
              {(video || audio) && (
                <div className="absolute top-2 left-2 p-1.5 bg-black/60 border border-yellow-500/20 backdrop-blur-sm">
                  {video ? (
                    <Play className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <Music className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-[10px] font-black uppercase text-yellow-500 truncate">
                  {post.site} • {post.author}
                </p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-1.5 py-0.5 bg-black/80 border border-yellow-500/50 text-[8px] font-bold text-yellow-500 uppercase">
                  {post.rating.toUpperCase()}
                </span>
              </div>
            </Card>
          );
        })}
    </div>
  );
}
