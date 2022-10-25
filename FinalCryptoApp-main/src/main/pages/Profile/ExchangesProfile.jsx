import { DeleteOutlined } from "@ant-design/icons";
import { Anchor, Avatar, Button, Col, Collapse, Row, Typography } from "antd";
import millify from "millify";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteFavoriteExchange } from "../../../redux/favorites/thunks";

const { Text } = Typography;
const { Panel } = Collapse;
const { Link } = Anchor;
export const ExchangesProfile = ({ exchanges }) => {
    const dispatch =useDispatch()
    const onRemoveFavorite=(id)=>{
            dispatch(deleteFavoriteExchange(id))
    }
  return (
    <Row>
      {exchanges?.map((exchange) => (
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
                    {exchange.trust_score === null ? "" : exchange.trust_score}
                  </Col>
                </Row>
              }
            >
              <Row justify="center">
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => onRemoveFavorite(exchange.id)}
                />
                <Anchor>
                  <Link href={exchange.url} title={exchange.url} />
                </Anchor>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      ))}
    </Row>
  );
};
