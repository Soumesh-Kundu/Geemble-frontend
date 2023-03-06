import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({children}) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector('.App').scrollTop=0
  }, [pathname]);

  return <div>
    {children}
  </div>;
}