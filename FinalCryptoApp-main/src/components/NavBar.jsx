import { Avatar, Button, Divider, Menu, Typography } from "antd";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import icon from "../images/icon6.png";
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  IdcardOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../redux/auth/thunks";
const { Item } = Menu;
const { Title } = Typography;
export const NavBar = () => {
  const dispatch = useDispatch();

  const { displayName, status } = useSelector((state) => state.auth);
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
  //Logout
  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="nav-container">
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
        <Menu theme="dark">
          <Item icon={<HomeOutlined />} key="1">
            <Link to="/">Home</Link>
          </Item>

          <Item icon={<FundOutlined />} key="2">
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Item>
          <Item icon={<MoneyCollectOutlined />} key="3">
            <Link to="/exchanges">Exchanges</Link>
          </Item>
          <Item icon={<BulbOutlined />} key="4">
            <Link to="/news">News</Link>
          </Item>
          <Divider />
          {displayName && activeMenu && (
            <Item icon={<IdcardOutlined />} key="5">
              <Link to="/profile">{displayName}</Link>
            </Item>
          )}
          <Divider />
          {status === "authenticated" ? (
            <Item icon={<LogoutOutlined />} key="6">
              <Link onClick={handleLogout}>Logout</Link>
            </Item>
          ) : (
            <Item icon={<LoginOutlined />} key="7">
              <Link to="/login">Login</Link>
            </Item>
          )}
        </Menu>
      )}
    </div>
  );
};
