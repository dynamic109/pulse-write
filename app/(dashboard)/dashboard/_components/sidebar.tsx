import SideBarData from "./sidebardata";

export default function Sidebar() {
  return (
    <section className="w-full   p-4">
      <div className="flex items-center border-b border-[#198989] mb-4 p-2.5 space-x-3">
        <img
          src="/profileimg/prfimg.png"
          alt="Banuso Tobi profile"
          className="rounded-full w-9 h-9"
        />
        <input
          type="text"
          placeholder="What's on your mind, Banuso?"
          className="p-2 w-[300px] rounded-full border focus:outline-none focus:ring-2 focus:ring-cyan-800"
        />
      </div>
      <SideBarData />
    </section>
  );
}
