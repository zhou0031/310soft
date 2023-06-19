"use client";
export function Password() {
  return (
    <>
      <div className="flex gap-3 justify-end">
        <label htmlFor="password">密码:</label>
        <div>
          <input type="password" id="password" name="password" />
        </div>
      </div>
    </>
  );
}
