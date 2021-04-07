import React from "react";

function Conditional({ collapsed, onCollapse, onShow, children }) {
  React.useEffect(() => {
    if (collapsed) {
      onCollapse();
    } else {
      if (onShow) {
        onShow();
      }
    }
  }, [collapsed]);

  return !collapsed && children;
}

export default Conditional;