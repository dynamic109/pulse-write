"use client"

import { useState } from "react"
import { X, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Post {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  image: string
  description: string
  likes: number
  comments: number
  shares: number
}

interface Comment {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  text: string
  timestamp: string
  likes: number
  replies: number
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    author: {
      name: "Difficulty",
      handle: "@difficulty",
      avatar: "/placeholder-user.jpg",
    },
    text: "Amazing work! Thank you for putting into words what so many of us are feeling. You're not alone.",
    timestamp: "1 hour ago",
    likes: 112,
    replies: 1,
  },
  {
    id: "2",
    author: {
      name: "Shaira",
      handle: "@shaira_design",
      avatar: "/placeholder-user.jpg",
    },
    text: "This post made me cry so much. I didn't know how much I needed to read this today. Thank you for being this honest.",
    timestamp: "55 minutes ago",
    likes: 24,
    replies: 2,
  },
  {
    id: "3",
    author: {
      name: "Shaira",
      handle: "@shaira_design",
      avatar: "/placeholder-user.jpg",
    },
    text: "I'm holding space for you in my heart. And for everyone who is going through this silently. You're incredibly strong for sharing this.",
    timestamp: "38 minutes ago",
    likes: 47,
    replies: 0,
  },
  {
    id: "4",
    author: {
      name: "Danny Mist",
      handle: "@danny_mist",
      avatar: "/placeholder-user.jpg",
    },
    text: "Thank so much pain in the world right now, and sometimes words feel small. But this post was a reminder that words can heal. Thank you for using yours so well.",
    timestamp: "2 ago",
    likes: 89,
    replies: 3,
  },
  {
    id: "5",
    author: {
      name: "Aisha",
      handle: "@aisha_art",
      avatar: "/placeholder-user.jpg",
    },
    text: "This is so raw and honest. It's comforting to know I'm not the only one struggling to make sense of everything happening. Your voice is powerful – thank you for this.",
    timestamp: "1 hour ago",
    likes: 10,
    replies: 5,
  },
]

interface CommentsModalProps {
  post: Post
  onClose: () => void
}

export function CommentsModal({ post, onClose }: CommentsModalProps) {
  const [newComment, setNewComment] = useState("")

  const handleSubmit = () => {
    if (newComment.trim()) {
      setNewComment("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Comments</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Original post preview */}
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.handle}</p>
              </div>
            </div>
            <p className="text-foreground mb-4">{post.description}</p>
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.description}
              className="w-full rounded-lg mb-4 max-h-64 object-cover"
            />
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
            </div>
          </div>

          {/* Comments list */}
          <div className="divide-y divide-border">
            {MOCK_COMMENTS.map((comment) => (
              <div key={comment.id} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm text-foreground">{comment.author.name}</p>
                      <p className="text-xs text-muted-foreground">{comment.author.handle}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-foreground mb-3">{comment.text}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <MessageCircle className="h-3 w-3" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment input footer */}
        <div className="border-t border-border px-6 py-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="You" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                className="bg-background"
              />
              <Button
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6"
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
