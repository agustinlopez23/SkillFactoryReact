import React, { useState } from "react";
import millify from "millify";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Avatar,
  Spin,
  Anchor,
  Pagination,
  Rate,
  message,
  Button,
} from "antd";
import HTMLReactParser from "html-react-parser";
import { useGetExchangesQuery } from "../../../redux/api/criptoApi";
import { HeartOutlined } from "@ant-design/icons";
import { addFavorite } from "../../../helpers/addFavorite";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteExchanges, getFavoriteExchange } from "../../../redux/favorites/thunks";
import { fromFirebaseToLocal } from "../../../helpers/fromFirebaseToLocal";


const { Text } = Typography;
const { Panel } = Collapse;
const { Link } = Anchor;
export const Exchanges = () => {
  const dispatch = useDispatch();
  
  //Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const onChange = (page) => {
    setPageNumber(page);
  };
  //Fetch API
  const exchange = useGetExchangesQuery(pageNumber);
  const exchangesList = exchange?.data;
  //Favorites
  const {exchanges,isSaved}=useSelector(state=>state.favorites)
  const favorites = fromFirebaseToLocal(exchanges);
  const onAddFavorite = (id) => {
    const newFavorite = addFavorite(id, exchangesList, favorites);
    if (!newFavorite)
      return message.error("Cannot add two times the same item to favorites");
    dispatch(addFavoriteExchanges(newFavorite));
    
    dispatch(getFavoriteExchange())
  };
  //console.log(favorites);

  //Loader
  if (exchange.isFetching)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );

  return (
    <>
      <Row style={{ textAlign: "center" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Country</Col>
        <Col span={6}>Trust Score</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                style={{ textAlign: "center" }}
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>

                    <Col span={6}>
                      ${millify(exchange.trade_volume_24h_btc_normalized)}
                    </Col>
                    <Col span={6}>
                      {exchange.country === null
                        ? "unknown information"
                        : exchange.country}
                    </Col>
                    <Col span={6}>
                      {exchange.trust_score === null
                        ? ""
                        : exchange.trust_score}
                    </Col>
                  </Row>
                }
              >
                <Row justify="center">
                  <Button
                  disabled={isSaved}
                    shape="circle"
                    icon={<HeartOutlined />}
                    onClick={() => onAddFavorite(exchange.id)}
                  />
                  <Anchor>
                    <Link href={exchange.url} title={exchange.url} target="_blank" rel="noreferrer"/>
                  </Anchor>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
      <Row justify="center" gutter={[32, 16]} style={{ marginTop: "2rem" }}>
        <Pagination
          current={pageNumber}
          onChange={onChange}
          total={50}
          simple
        />
      </Row>
    </>
  );
};
