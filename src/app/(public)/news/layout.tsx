export default function NewsLayout({ children }) {
  return (
    <>
      <div className="bg-white flex flex-wrap w-5/6 gap-2 justify-center h-fit max-lg:w-full p-5">
        {children}
      </div>
    </>
  );
}
