import { HeartOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Spin,
  Pagination,
  message,
} from "antd";
import millify from "millify";
import { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite } from "../../../helpers/addFavorite";
import { fromFirebaseToLocal } from "../../../helpers/fromFirebaseToLocal";

import { useGetCriptosQuery } from "../../../redux/api/criptoApi";
import { isSaving } from "../../../redux/favorites/favoritesSlice";
import { addFavoriteCripto, getFavoriteCripto } from "../../../redux/favorites/thunks";

export const Cryptocurrencies = ({ simplified }) => {
  const dispatch = useDispatch();
  //Pagination
  const count = simplified ? 8 : 100;
  const [pageNumber, setPageNumber] = useState(1);
  const onChange = (page) => {
    //console.log(page);
    setPageNumber(page);
  };
  //Fetch API
  const cryptoData = useGetCriptosQuery({ count, pageNumber });

  const [cryptos, setCryptos] = useState(cryptoData?.data);

  //Favorites
  
  const cripto =useSelector(state=>state.favorites)
  const {isSaved} =useSelector(state=>state.favorites)
  const criptos = cripto.cryptos
  const favorites = fromFirebaseToLocal(criptos);
  const onAddFavorite = (id) => {
    const newFavorite = addFavorite(id, cryptos, favorites);
    if (!newFavorite)
      return message.error("Cannot add two times the same item to favorites");
    dispatch(addFavoriteCripto(newFavorite));
    dispatch(getFavoriteCripto())
  };
  //console.log(favorites);
  //Input Search
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    setCryptos(cryptoData?.data?.name);
    const filterData = cryptoData?.data?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterData);
  }, [cryptoData, searchTerm]);
  //Loader
  if (cryptoData.isFetching)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>{" "}
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Card
              title={`${currency.market_data.market_cap_rank}. ${currency.name}`}
              extra={
                <img
                  className="crypto-image"
                  src={currency.image.thumb}
                  alt={currency.name}
                />
              }
            >
              <p>Price: {currency.market_data.current_price.usd} USD </p>
              <p>Market Cap: {millify(currency.market_data.market_cap.usd)}</p>
              <p>
                Daily Change:
                {millify(currency.market_data.price_change_percentage_24h)} %
              </p>
              <Row justify="space-around">
                <Link to={`/crypto/${currency.id}`}>Details</Link>
                {simplified ? (
                  ""
                ) : (
                  <Button
                  disabled={isSaved}
                    shape="circle"
                    icon={<HeartOutlined />}
                    onClick={() => onAddFavorite(currency.id)}
                  />
                )}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      {simplified ? (
        ""
      ) : (
        <Row justify="center" gutter={[32, 16]} style={{ marginTop: "2rem" }}>
          <Pagination
            current={pageNumber}
            onChange={onChange}
            total={400}
            simple
          />
        </Row>
      )}
    </>
  );
};
