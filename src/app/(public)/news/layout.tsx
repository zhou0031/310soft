export default function NewsLayout({ children }) {
  return (
    <>
      <div className="bg-white flex justify-center w-5/6 max-lg:w-full">
        {children}
      </div>
    </>
  );
}
