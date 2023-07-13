import Logout from "./logout";
import Help from "./help";
import Ad_Admin from "./ad_admin";

export default function Sidebar() {
  return (
    <>
      <div className="flex flex-col items-start gap-2 text-slate-500 text-sm">
        <div>Logo</div>
        <div>Nav</div>
        <Ad_Admin />
        <Help />
        <Logout />
      </div>
    </>
  );
}
