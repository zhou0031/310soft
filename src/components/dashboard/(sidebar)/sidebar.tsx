import { useContext } from "react";
import { Context } from "../../../app/(user)/dashboard/layout";
import Logout from "./logout";
import Help from "./help";
import Ad_Admin from "./ad_admin";
import Setting from "./setting";
import Password from "./password";
import Logo from "./logo";
import Home from "./home";
import Dashboard from "./dashboard";

export default function Sidebar() {
  const { session } = useContext(Context);
  return (
    <>
      <div className="flex flex-col items-start gap-6 text-gray-400 text-sm font-medium">
        <Logo />
        <Home />
        <Dashboard />
        <Setting />
        {session?.user.provider == "credentials" && <Password />}
        <Help />
        <div className="grow h-[25rem]"></div>
        <Ad_Admin />
        <Logout />
      </div>
    </>
  );
}
