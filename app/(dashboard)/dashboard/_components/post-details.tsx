"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostDetailProps {
  isOpen: boolean;
  onClose: () => void;
  onCommentClick?: () => void;
  post: {
    avatar: string;
    name: string;
    handle: string;
    image?: string;
    fullDescription: string;
    comments: number;
    shares: number;
    likes: number;
  } | null;
}

export default function PostDetail({
 
  onCommentClick,
  post,
}: PostDetailProps) {
 if (!post) return null;


  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(() =>  + (liked ? -1 : 1));
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowComments(!showComments);
    onCommentClick?.();
  };

  return (
   <div className="w-full min-h-screen bg-white">
  <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
       <div className="flex items-center gap-3">
  <img src={post.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
  <div>
    <h3 className="font-semibold text-lg">{post.name}</h3>
    <p className="text-sm text-gray-500">{post.handle}</p>
  </div>
        </div>

       {post.image && (
  <div className="w-full rounded-xl overflow-hidden">
    <img src={post.image} className="w-full h-auto object-cover" />
  </div>
)}


        {/* Actions */}
        <div className="flex justify-around py-2 px-4 border-t text-gray-700 text-sm">
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

          <button
            onClick={handleComment}
            className="flex items-center gap-1 hover:text-foreground transition"
          >
            <MessageCircle className="h-4 w-4" />
            {post.comments}
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 hover:text-foreground transition"
          >
            <Share2 className="h-4 w-4" />
            {post.shares}
          </button>
        </div>

        {/* Description */}
      <div className="text-gray-900 leading-relaxed text-[15px]">
  {post.fullDescription}
</div>

      </div>
      </div>
    </div>
  );
}


