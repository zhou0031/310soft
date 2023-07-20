import Logout from "./logout";
import Help from "./help";
import Ad_Admin from "./ad_admin";
import Setting from "./setting";
import Logo from "./logo";
import Home from "./home";
import Dashboard from "./dashboard";

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col items-start gap-6 text-gray-400 text-sm font-medium">
        <Logo />
        <Home />
        <Dashboard />
        <Setting />
        <Help />
        <div className="grow h-80"></div>
        <Ad_Admin />
        <Logout />
      </div>
    </>
  );
}
