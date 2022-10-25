//UpgradeNavBar

import { MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Menu, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { menuItems } from "../helpers/menuItems";
import icon from "../images/icon6.png";
import { startLogout } from "../redux/auth/thunks";


const { Title } = Typography;
export const NavBar2 = () => {
  const { displayName, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //Responsive menu
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  //Logout Funcion
  const handleLogout = () => {
    dispatch(startLogout());
  };
  //Menu Items Array
  const items = useMemo(
    () => menuItems(status, displayName, handleLogout),
    [status]
  );
  return (
    <div
      style={{
        width: 256,
      }}
      className="nav-container"
    >
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Title level={2} className="logo">
          <Link to="/">CriptoApp</Link>
        </Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && (
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      )}
    </div>
  );
};
