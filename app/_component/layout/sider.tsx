import { ReactNode } from "react";

import SiderMenu from "./siderMenu";
import { Box } from "@mui/material";

export interface SiderMenuItem {
  href: string;
  icon: ReactNode;
  text: string;
}

const menuItems: SiderMenuItem[] = [
  { href: "/back", icon: <></>, text: "home" },
  { href: "/back/product", icon: <></>, text: "product" },
  { href: "/back/attribute", icon: <></>, text: "Attribute" },
];

const Sider = () => {
  return (
    <Box className="bg-black text-white">
      <SiderMenu items={menuItems} />
    </Box>
  );
};

export default Sider;
