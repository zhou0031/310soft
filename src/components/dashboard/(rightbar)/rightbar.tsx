import ProfileCard from "./profile_card";
import Activity from "./activity";

export default function Rightbar() {
  return (
    <div className="flex flex-col gap-5">
      <ProfileCard />
      <Activity />
    </div>
  );
}
