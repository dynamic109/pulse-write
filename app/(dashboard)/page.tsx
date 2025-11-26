// "use client"

// import { useState } from "react"
// import { Feed } from "../dashboard/_components/Feed"
// import { CommentsModal } from "../dashboard/_components/comments-modal"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// const MOCK_POSTS = [
//   {
//     id: "1",
//     author: {
//       name: "Victor",
//       handle: "@victor",
//       avatar: "/placeholder-user.jpg",
//     },
//     image: "/abstract-design-art.jpg",
//     description: "Just launched my new design system! Check it out",
//     fullDescription:
//       "There's something that's been weighing heavily on my mind lately, and I feel like I can't stay silent about it anymore. I've been hearing more and more about this disease — how quickly it's spreading, how deeply it's affecting lives, and the reality of it has become so real. At first, I tried to stay calm. I told myself there was no need to panic. But the more I listen, the more I read, the more I see — the less comfort I feel.\n\nYes, we've been told there's a cure. But what happens when the prescribed medications don't seem to be working? What do you do when the people you care about take them and still get worse? What do you do when the heat starts creeping quietly — then louder — until it's the only thing you can hear?\n\nI won't lie — I'm scared. Not just for myself, but for everyone who's facing this, for those silently suffering, for those whose hope is wearing thin. There's so much we still don't know. So many unanswered questions.\n\nIf you're reading this and you feel the same way — confused, overwhelmed, uncertain — please know that you're not alone. Sometimes, just acknowledging the fear is the first step toward facing it.\n\nThis is me choosing to speak. This is me choosing to feel. This is me choosing to hope — even when it's hard.",
//     likes: 324,
//     comments: 89,
//     shares: 12,
//   },
//   {
//     id: "2",
//     author: {
//       name: "AdnanaFTv",
//       handle: "@adnana_ftv",
//       avatar: "/placeholder-user.jpg",
//     },
//     image: "/soccer-player-kick-ball.jpg",
//     description: "Amazing match today! The team showed incredible skill and determination",
//     likes: 154,
//     comments: 239,
//     shares: 8,
//   },
//   {
//     id: "3",
//     author: {
//       name: "JamesDuck",
//       handle: "@jamesduck",
//       avatar: "/placeholder-user.jpg",
//     },
//     image: "/wireframe-design-mockup.jpg",
//     description: "Working on a new project. Here's a sneak peek at the wireframes",
//     likes: 94,
//     comments: 234,
//     shares: 12,
//   },
//   {
//     id: "4",
//     author: {
//       name: "David",
//       handle: "@david_designs",
//       avatar: "/placeholder-user.jpg",
//     },
//     image: "/digital-art-graphic-design.jpg",
//     description: "Color theory is everything. The right palette can completely transform your work",
//     likes: 206,
//     comments: 0,
//     shares: 34,
//   },
// ]

// export default function Page() {
//   const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
//   const [viewMode, setViewMode] = useState<"feed" | "detail">("feed")
//   const [commentsPostId, setCommentsPostId] = useState<string | null>(null)

//   const selectedPost = MOCK_POSTS.find((p) => p.id === selectedPostId)
//   const commentsPost = MOCK_POSTS.find((p) => p.id === commentsPostId)

//   const handlePostClick = (postId: string) => {
//     setSelectedPostId(postId)
//     setViewMode("detail")
//   }

//   const handleBack = () => {
//     setViewMode("feed")
//     setSelectedPostId(null)
//   }

//   if (viewMode === "feed") {
//     return <Feed onPostClick={handlePostClick} />
//   }

//   if (viewMode === "detail" && selectedPost) {
//     return (
//       <div className="min-h-screen bg-background">
//         <div className="sticky top-0 bg-background border-b border-border z-10">
//           <div className="flex items-center px-4 py-3">
//             <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
//               ←
//             </Button>
//             <span className="ml-4 font-semibold text-foreground">PulseWrite</span>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row max-w-6xl mx-auto">
//           {/* Main content - Left side on desktop */}
//           <div className="flex-1 border-r border-border">
//             {/* Author info */}
//             <div className="px-4 py-4 flex items-center justify-between border-b border-border">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-12 w-12">
//                   <AvatarImage src={selectedPost.author.avatar || "/placeholder.svg"} alt={selectedPost.author.name} />
//                   <AvatarFallback>{selectedPost.author.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-semibold text-foreground">{selectedPost.author.name}</p>
//                   <p className="text-sm text-muted-foreground">{selectedPost.author.handle}</p>
//                 </div>
//               </div>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 ⋯
//               </Button>
//             </div>

//             {/* Post image */}
//             <div className="bg-muted aspect-square lg:aspect-auto lg:h-96">
//               <img
//                 src={selectedPost.image || "/placeholder.svg"}
//                 alt={selectedPost.description}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Engagement stats */}
//             <div className="px-4 py-3 flex gap-6 text-sm text-muted-foreground border-b border-border">
//               <span className="flex items-center gap-1">❤️ {selectedPost.likes}</span>
//               <span className="flex items-center gap-1">💬 {selectedPost.comments}</span>
//               <span className="flex items-center gap-1">↗️ {selectedPost.shares}</span>
//             </div>

//             {/* Action buttons */}
//             <div className="px-4 py-3 flex items-center gap-2 border-b border-border">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="flex-1 justify-center gap-2 text-muted-foreground hover:text-foreground"
//               >
//                 ♥️ Like
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="flex-1 justify-center gap-2 text-muted-foreground hover:text-foreground"
//                 onClick={() => setCommentsPostId(selectedPost.id)}
//               >
//                 💬 Comment
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="flex-1 justify-center gap-2 text-muted-foreground hover:text-foreground"
//               >
//                 ↗️ Share
//               </Button>
//             </div>

//             {/* Post caption */}
//             <div className="px-4 py-4">
//               <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
//                 {selectedPost.fullDescription || selectedPost.description}
//               </p>
//             </div>
//           </div>

//           {/* Right sidebar - User suggestions */}
//           <div className="hidden lg:flex flex-col w-64 px-4 py-4 gap-4">
//             <div className="text-sm font-semibold text-foreground">Related Users</div>
//             <div className="space-y-3">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex items-center justify-between">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage src={`/placeholder-user.jpg`} />
//                     <AvatarFallback>U{i}</AvatarFallback>
//                   </Avatar>
//                   <Button size="sm" variant="outline">
//                     Follow
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {commentsPost && <CommentsModal post={commentsPost} onClose={() => setCommentsPostId(null)} />}
//       </div>
//     )
//   }
// }

"use client";

import { Feed } from "./dashboard/_components/Feed"
import ProfileHeader from "./dashboard/_components/profile-header";
import Sidebar from "./dashboard/_components/sidebar";
import Tabs from "./dashboard/_components/tabs";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div>
        <ProfileHeader />
      </div>
      <div className="flex flex-col md:flex-row max-w-full">
        <div className="w-full md:w-[70%] flex flex-col">
          <Tabs />
          <Feed />
        </div>
        <div className="w-full md:w-[30%]">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
