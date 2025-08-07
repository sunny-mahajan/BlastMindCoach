import React from "react";
import "../../pages/Browse/browse.scss";
function HeaderWrapper({ children, ...restProps }) {
  return <header {...restProps}>{children}</header>;
}

export default HeaderWrapper;
