import Sider from "@/app/_component/layout/sider";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box className="flex h-screen">
      <Sider />
      {children}
    </Box>
  );
};

export default Layout;
