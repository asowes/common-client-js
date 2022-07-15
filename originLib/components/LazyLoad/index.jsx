import { useState, useEffect, useRef } from "react";
import Proptypes from "prop-types";

/**
 * @description: Observer lazy load component, currently create a new observer for each component, not recommended for mass use
 * @param {ReactNode} children The react child elements
 * @return {ReactNode}
 */
function ObserverLazy({ children, ...reset }) {
  const [childVisible, setChildVisible] = useState(false); // Show empty or real elements
  const emptyDiv = useRef(null); // Get the empty element

  useEffect(() => {
    const observer = new IntersectionObserver( // New Observer
      (changes) => {
        if (changes[0].intersectionRatio > 0.3 && !childVisible) {
          setChildVisible(true);
          observer.disconnect(); // Close observer
        }
      },
      { threshold: 0.3, rootMargin: "200px 0px" }
    );
    observer.observe(emptyDiv.current); // Observing empty elements
  }, []);

  return childVisible ? children : <div ref={emptyDiv} {...reset} />;
}

ObserverLazy.propTypes = {
  children: Proptypes.element,
};

export default ObserverLazy;
