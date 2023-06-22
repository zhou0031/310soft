import Link from "next/link";
import { Email } from "@/components/sign_up/Email";
import { Password } from "@/components/sign_in/Password";
import { Google } from "@/components/sign_in/Google";
import { Facebook } from "@/components/sign_in/Facedbook";

export default function Index() {
  return (
    <>
      <div className="flex flex-col items-center my-56 ">
        <header>
          <h1 className="text-2xl mb-2">登陆</h1>
        </header>

        <form className="flex flex-col gap-2 my-3">
          <Email />
          <Password />
          <div className="flex justify-end gap-2">
            <Link href=".." className="font-sans">
              取消
            </Link>
            <button type="submit" className="font-sans">
              登入
            </button>
          </div>
        </form>

        <Google />
        <Facebook />
      </div>
    </>
  );
}
