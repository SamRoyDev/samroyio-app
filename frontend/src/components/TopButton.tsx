import { useState, useEffect } from "react";
import {ReactComponent as TopButtonSvg} from "../graphics/topbutton.svg";

function TopButton() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showTopBtn && (
        <button className="top-btn" onClick={goToTop}>
          < TopButtonSvg />
        </button>
      )}
    </>
  );
}

export default TopButton;
