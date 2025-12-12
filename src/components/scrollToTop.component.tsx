import { useRef } from "react";

const ScrollToTop = () => {
  const topRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <div ref={topRef} onClick={handleScroll}></div>;
};

export default ScrollToTop;
