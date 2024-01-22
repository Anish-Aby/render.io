import React, { useEffect } from "react";

type ScrollToTopProps = {
  children: React.ReactNode;
};

export default function ScrollToTop({ children }: ScrollToTopProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
