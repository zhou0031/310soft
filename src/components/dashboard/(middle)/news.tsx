"use client";
import { useState, useEffect } from "react";

export default function News({ setNewsLocation }) {
  const newsLocations = [
    { position: [31.2323437, 121.4691024], country: "China P.R" },
    { position: [43.285203, 268.43397], country: "USA" },
    { position: [27.945886, 40.469359], country: "Africa" },
  ];

  const [i, setI] = useState(0);

  useEffect(() => {
    /*
    newsLocations.map((location) => {
      setNewsLocation((prev) => ({ ...prev, ...location }));
    });
    */
    const interval = setInterval(() => {
      setNewsLocation((prev) => ({ ...prev, ...newsLocations[i] }));
      if (i > 2) setI((prev) => (prev = 0));
      else setI((prev) => prev + 1);
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  return (
    <>
      <div className="flex gap-2 ">
        <div className="flex-none">新闻:</div>
        <div className="whitespace-nowrap font-thin text-ellipsis overflow-hidden">
          对于接下来的形势必须有一个共识，”拜登总统上周在谈到以色列与哈马斯之间的战争时表示。们的言论乍看上去像是一种倒退，
        </div>
      </div>
    </>
  );
}
