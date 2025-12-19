"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PostProps {
  post: {
    author: {
      avatar: string;
      name: string;
      handle: string;
    };
    image: string;
    description: string;
    fullDescription?: string;
    likes: number;
    comments: number;
    shares: number;
    engagedUsers?: string[];
  };
}

const Posts = ({ post }: PostProps) => {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8"
        >
          ←
        </Button>
        <h1 className="text-lg font-semibold text-gray-900">Post</h1>
      </div>

      <div className="max-w-2xl mx-auto bg-white border-x border-gray-200">
        {/* Post Header with Author Info */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
              />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.author.handle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-900"
          >
            ⋯
          </Button>
        </div>

        {/* Post Image */}
        <div className="bg-gray-100 w-full">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.description}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Engagement Stats */}
        <div className="px-4 py-3 flex justify-between text-sm text-gray-500 border-b border-gray-200">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>

        {/* Engagement Avatars */}
        {/* {post.engagedUsers && post.engagedUsers.length > 0 && (
          <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-200">
            {post.engagedUsers.map((avatar, index) => (
              <Avatar key={index} className="h-8 w-8 border-2 border-white -ml-2">
                <AvatarImage src={avatar || "/placeholder.svg"} alt={`User ${index}`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )} */}

        {/* Post Full Description */}
        <div className="px-4 py-6">
          <p className="text-base text-gray-900 leading-relaxed whitespace-pre-wrap">
            {post.fullDescription || post.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Posts;
