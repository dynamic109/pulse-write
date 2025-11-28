
"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  image: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
  onPostClick?: () => void;
  onCommentClick?: () => void;
}

export function PostCard({ post, onPostClick, onCommentClick }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : +1));
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(!showComments);
    onCommentClick?.();
  };
  const openDetail = () => {
    router.push(`/post/${post.id}`);
  };


  return (
    <div
      className="bg-card rounded-xl border w-[100%] border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onPostClick}
    >
      {/* MAIN LAYOUT */}
      <div className="flex w-[100%] gap-9 p-7">
        {/* LEFT — IMAGE */}
        <div className="w-48 h-32 px-3 overflow-hidden rounded-md shrink-0">
          <img
            src={post.image}
            alt={post.description}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 justify-between">
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar >
                <AvatarImage className="items-center"  src={post.author.avatar} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

            <div className="flex flex-col leading-tight">
  <p className="font-semibold text-sm">{post.author.name}</p>
  <p className="text-xs text-muted-foreground -mt-1">{post.author.handle}</p>
</div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm mt-2">{post.description}</p>

          {/* FOOTER */}
          
            {/* LIKE */}
            <div className="flex  items-center justify-between text-sm text-muted-foreground mt-3">
             <div className="flex items-center pl-6  gap-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-foreground transition"
            >
              <Heart
                className={`h-4 w-4 transition ${
                  liked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {likeCount}
            </button>

            {/* COMMENT */}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(false); // <-- closes the comment section
              }}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition"
            >
              ✕
            </button>

            <button
              onClick={handleComment}
              className="flex items-center gap-1 hover:text-foreground transition"
            >
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </button>
              </div>

            {/* SHARE */}
            <div>
            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 hover:text-foreground transition"
            >
              <Share2 className="h-4 w-4" />
              {post.shares}
            </button>
            </div>
            </div>
          </div>
        
      </div>

      {/* COMMENT SECTION (TOGGLED) */}
      {showComments && (
        <div className="border-t border-border p-3 bg-muted/30 relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(false);
            }}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition"
          >
            ✕
          </button>

          
        </div>
      )}
    </div>
  );
}



