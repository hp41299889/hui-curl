import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { SiderMenuItem } from "./sider";

interface Props {
  items: SiderMenuItem[];
}

const SiderMenu = (props: Props) => {
  const { items } = props;
  return (
    <List>
      {items.map((i) => (
        <Link key={i.href} href={i.href}>
          <ListItemButton>
            <ListItemIcon>{i.icon}</ListItemIcon>
            <ListItemText primary={i.text} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};

export default SiderMenu;
