import { Col, Row, Spin, Statistic, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import {
  useGetCriptosQuery,
  useGetGobalStatsQuery,
} from "../../../redux/api/criptoApi";
import { Cryptocurrencies, News } from "../../pages";
const { Title } = Typography;

export const HomePage = () => {
  const coins = useGetCriptosQuery(8);
  const globalStats = useGetGobalStatsQuery();

  if (coins?.isFetching)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats.data?.data.active_cryptocurrencies}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.data?.data.markets)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total MarketCap"
            value={millify(globalStats.data?.data.total_market_cap.usd)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24hs Volume Change"
            value={`${millify(
              globalStats.data?.data.market_cap_change_percentage_24h_usd
            )}%`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.data?.data.total_volume.usd)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2}>Top 10 Crypto Currencies in the world</Title>
        <Title level={3}>
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2}>Latest Criptos News</Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};
