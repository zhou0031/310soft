import Logout from "./logout";
import Help from "./help";
import Ad_Admin from "./ad_admin";
import Nav from "./navgation/nav";
import Logo from "./logo";
import { usePathname } from "next/navigation";

export default function Sidebar({ session }) {
  const pathName = usePathname();

  return (
    <>
      <div className="flex flex-col items-start gap-6 text-gray-400 text-sm">
        <Logo />

        <Nav />
        <Ad_Admin session={session} />
        <Help />

        <Logout />
      </div>
    </>
  );
}
