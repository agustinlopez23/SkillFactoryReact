import { Row, Spin, Typography } from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getFavoriteCripto,
  getFavoriteExchange,
  getFavoriteNew,
} from "../../../redux/favorites/thunks";
import { CryptoProfiles } from "./CryptoProfiles";
import { ExchangesProfile } from "./ExchangesProfile";
import { NewsProfile } from "./NewsProfile";

const { Title } = Typography;

export const Profile = () => {
  const { displayName } = useSelector((state) => state.auth);
  const { news, cryptos, exchanges } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavoriteNew());
    dispatch(getFavoriteCripto());
    dispatch(getFavoriteExchange());
  }, []);



  return (
    <>
      <Title level={2} style={{marginTop:"2rem"}}>Hi {displayName}! Welcome to your Profile</Title>

      <div
        className="home-heading-container"
        style={{ flexDirection: "column" }}
      >
        <Title level={3}>My favorites Crypto Currencies</Title>

        <Title level={4}>
          <Link to="/cryptocurrencies">All CryptoCurrencies</Link>
        </Title>
        { (cryptos.length === 0)
    ? (
      <Row justify="center">
        <Spin />
      </Row>
    ):( <CryptoProfiles cryptos={cryptos} />
        )}
       
      </div>

      <div
        className="home-heading-container"
        style={{ flexDirection: "column" }}
      >
        <Title level={3}>My favorites Exchanges</Title>
        <Title level={4}>
          <Link to="/exchanges">All Exchanges</Link>
        </Title>
        { (exchanges.length === 0)
    ? (
      <Row justify="center">
        <Spin />
      </Row>
    ):(<ExchangesProfile exchanges={exchanges} />
        )}
        
      </div>
     
      <div
        className="home-heading-container"
        style={{ flexDirection: "column" }}
      >
        <Title level={3}>My favorites Criptos News</Title>
        <Title level={4}>
          <Link to="/news">All news</Link>
        </Title>
        { (news.length === 0)
    ? (
      <Row justify="center">
        <Spin />
      </Row>
    ):(
        <NewsProfile news={news} />)}
      </div>
    </>
  );
};
