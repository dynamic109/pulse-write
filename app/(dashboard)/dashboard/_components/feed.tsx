"use client";

import { useState } from "react";
import { PostCard } from "./post-card";
import { CommentsModal } from "./comments-modal";
import { useRouter } from "next/navigation";
import { MOCK_POSTS } from "@/data/data";



export function Feed() {
  const [commentsPostId, setCommentsPostId] = useState<string | null>(null);
  const commentsPost = MOCK_POSTS.find((p) => p.id === commentsPostId);
  const router = useRouter();

  return (
    <div className="bg-background py-6  border-r border-[#198989]">
      <div className="max-w-full mx-0"> 
        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="w-full">
            <PostCard
              post={post}
              onPostClick={() => router.push(`/post/${post.id}`)}
              onCommentClick={() => setCommentsPostId(post.id)}
            />
          </div>
        ))}
      </div>

      {commentsPost && (
        <CommentsModal post={commentsPost} onClose={() => setCommentsPostId(null)} />
      )}
    </div>
  );
}