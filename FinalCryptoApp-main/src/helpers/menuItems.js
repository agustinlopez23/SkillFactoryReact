import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  IdcardOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export const menuItems = (status, displayName, handleLogout) => {
  if (status === "checking") {
    return [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        "2",
        <FundOutlined />
      ),
      getItem(
        <Link to="/exchanges">Exchanges</Link>,
        "3",
        <MoneyCollectOutlined />
      ),
      getItem(<Link to="/news">News</Link>, "4", <BulbOutlined />),
      getItem(<Link to="/login">Login</Link>, "5", <LoginOutlined />),
    ];
  }
  if (status === "not-authenticated") {
    return [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        "2",
        <FundOutlined />
      ),
      getItem(
        <Link to="/exchanges">Exchanges</Link>,
        "3",
        <MoneyCollectOutlined />
      ),
      getItem(<Link to="/news">News</Link>, "4", <BulbOutlined />),
      getItem(<Link to="/login">Login</Link>, "5", <LoginOutlined />),
    ];
  }
  if (status === "authenticated") {
    return [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
        "2",
        <FundOutlined />
      ),
      getItem(
        <Link to="/exchanges">Exchanges</Link>,
        "3",
        <MoneyCollectOutlined />
      ),
      getItem(<Link to="/news">News</Link>, "4", <BulbOutlined />),
      getItem(
        <Link to="/profile">{displayName}</Link>,
        "5",
        <IdcardOutlined />
      ),
      getItem(
        <Link onClick={handleLogout}>Logout</Link>,
        "6",
        <LogoutOutlined />
      ),
    ];
  }
};
