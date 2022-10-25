import { Col, Row, Select, Typography, Spin } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCriptosDetailsQuery } from "../../../redux/api/criptoApi";
import { LineChart } from "../../../components/LineChart";
import { gS, Ss, time } from "../../../helpers/cryptodetail";
const { Option } = Select;
const { Title, Text } = Typography;

export const CryptoDetails = () => {
  const { id } = useParams();

  const [timePeriod, setTimePeriod] = useState("7");
  const cryptoDetail = useGetCriptosDetailsQuery(id);

  const { stats } = Ss(cryptoDetail);
  const { genericStats } = gS(cryptoDetail);

  if (cryptoDetail.isFetching)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <img
          src={cryptoDetail?.data?.image.small}
          alt={cryptoDetail?.data?.image.small}
        />
        <Title level={2} className="coin-name">
          {cryptoDetail?.data?.name} ({cryptoDetail?.data?.symbol}) Price:
          {cryptoDetail?.data?.market_data.current_price.usd}
        </Title>
        <p>
          {cryptoDetail?.data?.name} live price in USD dolars. View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Col>
        <Select
          defaultValue={timePeriod}
          className="select-timeperiod"
          placeholder="Select time in days"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date} value={date}>
              {date}
            </Option>
          ))}
        </Select>
        <Text disabled> days</Text>
        <LineChart id={id} timePeriod={timePeriod} />
      </Col>

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value=statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetail?.data?.name}
            </Title>
            <p>An overview showing the stats of {cryptoDetail?.data?.name}</p>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Stats Info
              </Title>
              <p>
                An overview showing the statistics of {cryptoDetail?.data?.name}
                , such as the base and quote currency, the rank, and trading
                volume.
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetail?.data?.name} Links
            </Title>
            {cryptoDetail?.data?.links.homepage?.map((link) => (
              <Row className="coin-link" key={link}>
                <Title level={5} className="link-name">
                  {link}
                </Title>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </Col>
  );
};
