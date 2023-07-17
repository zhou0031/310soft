import Admin from "./admin";
import Ad from "./ad";
import { useSession } from "next-auth/react";

export default function Ad_Admin() {
  const { data: session, status } = useSession();
  // @ts-ignore
  return session?.user?.role == "ADMIN" ? <Admin /> : <Ad />;
}
