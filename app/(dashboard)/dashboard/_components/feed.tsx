"use client";

import { useState } from "react";
import { PostCard } from "./post-card";
import { CommentsModal } from "./comments-modal";
import { useRouter } from "next/navigation";

export const MOCK_POSTS = [
  {
    id: "1",
    author: {
      name: "Victor",
      handle: "14h",
      avatar: "/feedava1.png",
    },
    image: "/feedimg1.png",
    description:
      "heard about the diseases it is really bad and it has a cure but the the medications prescribed are not working im so scared about this ",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately, and I feel like I can't stay silent about it anymore. I've been hearing more and more about this disease — how quickly it's spreading, how deeply it's affecting lives, and the reality of it has become so real.\n\nYes, we've been told there's a cure. But what happens when the prescribed medications don't seem to be working? What do you do when the people you care about take them and still get worse?\n\nThis is me choosing to hope — even when it's hard.",
    likes: 324,
    comments: 89,
    shares: 12,
  },

  {
    id: "2",
    author: {
      name: "Adewale99",
      handle: ".11h",
      avatar: "/feedava2.png",
    },
    image: "/feedimg2.png",
    description:
      "inter Milan are planning to raise their offer for Atalanta forward Ademola Lookman to €45m next week...",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately, and I feel like I can't stay silent about it anymore...",
    likes: 154,
    comments: 239,
    shares: 8,
  },

  {
    id: "3",
    author: {
      name: "Jamesuiux",
      handle: "jul 18",
      avatar: "/feedava3.png",
    },
    image: "/feedimg3.png",
    description:
      "Working on a big project...hmmm.... UIUX, i need 12 people on this project",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately...",
    likes: 94,
    comments: 234,
    shares: 12,
  },

  {
    id: "4",
    author: {
      name: "David",
      handle: "11h",
      avatar: "/feedava4.png",
    },
    image: "/feedimg4.png",
    description:
      "Designs I worked on this week. I focused on simplicity and clarity.",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately...",
    likes: 206,
    comments: 0,
    shares: 34,
  },

  {
    id: "5",
    author: {
      name: "David online",
      handle: "12h",
      avatar: "/feedava5.png",
    },
    image: "/feedimg5.png",
    description:
      "The Ogun State Police Command is investigating the death of a 16-year-old boy...",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately...",
    likes: 206,
    comments: 0,
    shares: 34,
  },

  {
    id: "6",
    author: {
      name: "David",
      handle: "2h",
      avatar: "/feedava6.png",
    },
    image: "/feedimg3.png",
    description:
      "Portable and VeryDarkMan continue to attack each other with songs...",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately...",
    likes: 206,
    comments: 0,
    shares: 34,
  },

  {
    id: "7",
    author: {
      name: "David",
      handle: "1h",
      avatar: "/feedava7.png",
    },
    image: "/feedimg7.png",
    description:
      "The All Progressives Congress Delta State chapter has denied the allegation...",
    fullDescription:
      "There's something that's been weighing heavily on my mind lately...",
    likes: 206,
    comments: 0,
    shares: 34,
  },
];

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
              onPostClick={() => router.push(`/posts/${post.id}`)}
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