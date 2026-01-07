// "use client";

// import PostDetail from "../../dashboard/_components/post-details";
// import { MOCK_POSTS } from "../../dashboard/_components/Feed";

// export default async function PostPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const post = MOCK_POSTS.find((p) => p.id === id);

//   if (!post)
//     return <p className="p-4">Post not found</p>;

//   return <PostDetail post={post} />;
// }

import { Button } from "@/components/ui/button";
import { MOCK_POSTS } from "@/data/data";
import Posts from "../_components/posts";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = MOCK_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900 mb-4">
            Post not found
          </p>
          <Link href="/dashboard">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <Posts post={post} />;
}
