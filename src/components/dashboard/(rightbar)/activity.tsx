export default function Activity() {
  return (
    <div className="flex flex-col w-full gap-2">
      <h3 className="w-full relative inline-flex items-center justify-center text-sm font-serif font-medium">
        <hr className="w-full  my-4" />
        <span className="absolute px-3 font-medium -translate-x-1/2 bg-white left-1/2">
          近期事件
        </span>
      </h3>

      <div className="text-sm flex flex-col gap-5 items-center">
        <p className="w-full text-center whitespace-nowrap font-sans text-ellipsis overflow-hidden ...">
          Russia is introducing a notification procedure for movement through
          the territory of Russia for employees of British diplomatic missions,
          the Russian Foreign Ministry said in a statement on Thursday.
        </p>
        <p className="w-full text-center whitespace-nowrap font-sans text-ellipsis overflow-hidden ...">
          周一早晨的一句“早上坏”，短短三字便浓缩了对过去周五的无限怀念，没有好好享受周末时光的懊恼与悔恨，以及一种“我不是自愿去上学”的鲜明态度
        </p>
      </div>
    </div>
  );
}
