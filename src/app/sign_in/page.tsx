import Link from "next/link";
import { Email } from "@/components/sign_in/Email";
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
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-3">
            <Email />
            <Password />
            <div className="flex justify-end gap-3 items-center">
              <button
                type="submit"
                className="w-full font-sans bg-slate-500 hover:bg-slate-400 text-white font-thin py-1 px-4 rounded"
              >
                登入
              </button>
            </div>
          </form>
          <hr className="h-px border-0 dark:bg-gray-400"></hr>
          <Google />
          <Facebook />
        </div>
      </div>
    </>
  );
}
