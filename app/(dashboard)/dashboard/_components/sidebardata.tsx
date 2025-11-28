"use client";

// NEWS DATA
export const news = [
  {
    id: 1,
    title: "Martínez Moves to Al Nassr from Barcelona",
    image: ["/newsimg1.png", "/newsimg2.png"],
    time: "2 hours ago",
    category: "Sport",
    posts: "33.4K posts",
  },
  {
    id: 2,
    title: "KWAM1 Faces Flight Ban After Airport Breach",
    time: "18 hours ago",
    category: "News",
    posts: "38.4K posts",
    image: ["/newsimg3.png", "/newsimg4.png", "/newsimg5.png"],
  },
  {
    id: 3,
    title: "United Honors De Gea in Old Trafford Return",
    time: "3 hours ago",
    category: "Sports",
    posts: "16.4K posts",
    image: ["/newsimg6.png", "/newsimg7.png", "/newsimg8.png"],
  },
];

// PEOPLE DATA
export const peopleToFollow = [
  {
    id: 1,
    name: "Precious",
    followers: "345 followers",
    avatar: "/user1.png",
  },
  {
    id: 2,
    name: "OmopeluoIami",
    followers: "345 followers",
    avatar: "/user2.png",
  },
  {
    id: 3,
    name: "Miggi from figgi",
    followers: "34.5K followers",
    avatar: "/user3.png",
  },
];

// MAIN COMPONENT
export default function SideBarData() {
  return (
    <div>
      {/* News Section */}
      <div className="bg-white shadow-sm rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Today's News</h2>
        <ul className="space-y-4">
          {news.map((item) => (
            <li
              key={item.id}
              className="flex flex-col hover:bg-gray-50 p-2 rounded-md transition"
            >
              <p className="font-medium text-gray-800 leading-tight mb-1">
                {item.title}
              </p>

              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  {item.image.slice(0, 3).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={item.title}
                      className="w-8 h-8 rounded-md object-cover border border-white"
                      loading="lazy"
                    />
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  {item.time} · {item.category} · {item.posts}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Who to Follow */}
      <div className="bg-white shadow-sm rounded-xl p-4 mt-4">
        <h2 className="text-lg font-semibold mb-3">Who to follow</h2>
        <ul className="space-y-3">
          {peopleToFollow.map((person) => (
            <li
              key={person.id}
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-medium text-gray-800">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.followers}</p>
                </div>
              </div>

              <button className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm hover:bg-teal-800">
                Follow
              </button>
            </li>
          ))}
        </ul>

        <p className="text-sm text-teal-700 mt-3 cursor-pointer hover:underline">
          See more
        </p>
      </div>
    </div>
  );
}
