"use client";
export function Password() {
  return (
    <>
      <div className="flex gap-3 justify-end items-center">
        <label htmlFor="password">密码:</label>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            className="h-10 p-2.5"
          />
        </div>
      </div>
    </>
  );
}
