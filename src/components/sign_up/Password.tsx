"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";

function Password(props: any, passwordRef: any) {
  const [input, setInput] = useState({
    password_1: "",
    password_2: "",
  });
  const [alert, setAlert] = useState({
    password_1: "输入密码",
    password_2: "再次确认密码",
  });
  const thisPassword_1Ref = useRef<HTMLInputElement | null>(null);
  const thisPassword_2Ref = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(passwordRef, () => {
    return {
      isValid() {
        if (
          thisPassword_1Ref.current != null &&
          thisPassword_2Ref.current != null &&
          thisPassword_1Ref.current.value.trim().length != 0 &&
          thisPassword_2Ref.current.value.trim().length != 0
        )
          return validatePasswords(
            thisPassword_1Ref.current.value,
            thisPassword_2Ref.current.value
          );
        return false;
      },
    };
  });

  function validatePasswords(password_1: string, password_2: string) {
    return password_1 === password_2 ? true : false;
  }

  function checkPassword(e: React.FormEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setAlert((prevAlert) => {
      const alertObj = { ...prevAlert, [name]: "" };
      switch (name) {
        case "password_1":
          if (!value) alertObj[name] = "输入密码";
          else if (input.password_2 && value !== input.password_2)
            alertObj["password_2"] = "密码不一致";
          else
            alertObj["password_2"] = input.password_2 ? "" : alert.password_2;
          break;
        case "password_2":
          if (!value) alertObj[name] = "再次确认密码";
          else if (input.password_1 && value !== input.password_1)
            alertObj[name] = "密码不一致";
          break;
        default:
          break;
      }
      return alertObj;
    });
  }

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="password_1">密码</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiLockPasswordLine />
          </div>
          <input
            value={props.password1}
            onChange={props.onChange_password1}
            ref={thisPassword_1Ref}
            type="password"
            id="password_1"
            name="password_1"
            onInput={(e) => checkPassword(e)}
            className="h-10 p-2.5 pl-10 focus:outline-sky-500"
          />
        </div>
        <div id="alert-password_1" className="text-red-700 font-medium">
          {alert.password_1}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="password_2">确认密码</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <RiLockPasswordFill />
          </div>
          <input
            ref={thisPassword_2Ref}
            value={props.password2}
            onChange={props.onChange_password2}
            type="password"
            id="password_2"
            name="password_2"
            onInput={(e) => checkPassword(e)}
            className="h-10 p-2.5 pl-10 focus:outline-sky-500"
          />
        </div>
        <div id="alert-password_2" className="text-red-700 font-medium">
          {alert.password_2}
        </div>
      </div>
    </>
  );
}
export default forwardRef(Password);
