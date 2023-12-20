export default function NewsLayout({ children }) {
  return (
    <>
      <div className="flex justify-col rounded-lg w-5/6 h-[53rem] max-lg:w-full max-lg:h-full p-5 overflow-hidden bg-white gap-2">
        {children}
      </div>
    </>
  );
}
