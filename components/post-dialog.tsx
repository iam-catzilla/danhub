"use client";

import { BooruPost } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  ExternalLink,
  X,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";
import { isVideo, isAudio } from "@/lib/utils";

interface PostDialogProps {
  post: BooruPost;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function PostDialog({
  post,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: PostDialogProps) {
  const handleCopyLink = () => {
    if (!post.file_url) return;
    navigator.clipboard.writeText(post.file_url);
    toast.success("Link copied to clipboard!");
  };

  const handleDownload = async () => {
    if (!post.file_url) return;
    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(post.file_url)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const extension = post.file_url.split(".").pop()?.split("?")[0] || "jpg";
      a.download = `danhub-${post.site}-${post.id}.${extension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started");
    } catch (err) {
      toast.error("Failed to download image.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-7xl w-full h-[95vh] bg-black border-yellow-500/30 p-0 overflow-hidden flex flex-col md:flex-row rounded-none gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Post View</DialogTitle>
        </DialogHeader>

        {/* Media Side */}
        <div className="flex-1 relative bg-zinc-950 flex items-center justify-center min-h-[50vh] md:min-h-0">
          {isVideo(post.file_url) ? (
            <video
              src={post.file_url}
              controls
              autoPlay
              loop
              className="max-h-full max-w-full p-4"
            />
          ) : isAudio(post.file_url) ? (
            <div className="flex flex-col items-center gap-8 w-full max-w-md px-8 py-12 bg-zinc-900/50 border border-yellow-500/10 rounded-2xl backdrop-blur-xl">
              <div className="relative group">
                <div className="absolute -inset-4 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-700" />
                <div className="w-48 h-48 bg-black flex items-center justify-center border-4 border-yellow-500/20 relative rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-linear-to-tr from-yellow-500/10 to-transparent" />
                  <Play className="h-16 w-16 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                </div>
              </div>
              <div className="w-full space-y-4">
                <div className="h-1 w-full bg-yellow-500/10 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-yellow-500 animate-[pulse_2s_infinite]" />
                </div>
                <audio
                  src={post.file_url}
                  controls
                  className="w-full h-10 [filter:invert(1)_hue-rotate(180deg)_brightness(1.5)]"
                />
              </div>
            </div>
          ) : (
            <img
              src={post.file_url}
              alt={post.id.toString()}
              className="max-h-full max-w-full object-contain p-4"
            />
          )}

          {/* Navigation Controls */}
          {hasPrev && (
            <Button
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={onPrev}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}
          {hasNext && (
            <Button
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={onNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 md:hidden text-yellow-500"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-yellow-500/20 p-6 flex flex-col gap-6 bg-black overflow-y-auto">
          <div className="space-y-4">
            <h2 className="text-2xl font-black italic text-yellow-500 tracking-tighter uppercase">
              POST DETAILS
            </h2>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-yellow-500/50">
              <div>
                <p>Site</p>
                <p className="text-white text-xs">{post.site}</p>
              </div>
              <div>
                <p>Uploader</p>
                <p className="text-white text-xs">{post.author}</p>
              </div>
              <div>
                <p>Dimensions</p>
                <p className="text-white text-xs">
                  {post.width} x {post.height}
                </p>
              </div>
              <div>
                <p>Rating</p>
                <p className="text-white text-xs">
                  {post.rating.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              {isVideo(post.file_url) ? "Download Video" : "Download Image"}
            </Button>
            <div className="flex gap-2">
              <Button onClick={handleCopyLink} className="flex-1">
                <Copy className="mr-2 h-3 w-3" /> Copy URL
              </Button>
              <Link
                href={post.file_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="flex-1">
                  <ExternalLink className="mr-2 h-3 w-3" /> <span>Source</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-yellow-500">
                Tags
              </h3>
              <span className="text-[10px] text-yellow-500/50">
                {post.tags.length} total
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
