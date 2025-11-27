import ProfileHeader from "./dashboard/_components/profile-header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <>
       <ProfileHeader />
        {children}
     </>
  );
}
