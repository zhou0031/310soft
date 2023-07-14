import Admin from "./admin";
import Ad from "./ad";

export default function Ad_Admin({ session }) {
  return session?.user?.role == "ADMIN" ? <Admin /> : <Ad />;
}
