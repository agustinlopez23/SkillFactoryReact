import { Space, Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
export const Footer = () => {
  return (
    <>
      <Title level={5} style={{ color: "white", textAlign: "center" }}>
        CriptoApp <br /> All Rights Reserved
      </Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Space>
    </>
  );
};
