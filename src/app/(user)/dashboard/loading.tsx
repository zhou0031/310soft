export default function Loading() {
  return (
    <>
      <span>数据加载 ...</span>
      <div role="status" className="space-y-2.5 animate-pulse w-full">
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-slate-300 w-32"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-24"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-full"></div>
        </div>
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-slate-300 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-24"></div>
        </div>
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-300 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-slate-400 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-grslateay-400 w-full"></div>
        </div>
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-slate-300 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-full"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-500 w-24"></div>
        </div>
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-300 w-32"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-400 w-24"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-slate-100 w-full"></div>
        </div>
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-100 w-full"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-slate-200 w-80"></div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-slate-300 w-full"></div>
        </div>
      </div>
    </>
  );
}
