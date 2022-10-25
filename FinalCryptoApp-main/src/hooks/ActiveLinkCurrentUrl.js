import { useEffect, useState } from "react";

export const ActiveLinkCurrentUrl = ({ pathname }) => {
  const [current, setCurrent] = useState(pathname);

  const click = (e) => {
    setCurrent(e.key);
  };
  useEffect(() => {
    if (pathname) {
      if (current !== pathname) {
        setCurrent(pathname);
      }
    }
    click();
  }, [pathname, current]);

  return current;
};
