export default function NewsLayout({ children }) {
  return (
    <>
      <div className="bg-white h-fit  flex flex-wrap justify-between min-w-[100rem] max-w-[100rem] gap-2 p-5 max-md:h-full">
        {children}
      </div>
    </>
  );
}
