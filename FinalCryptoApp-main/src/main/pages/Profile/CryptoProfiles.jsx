import { DeleteOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import millify from 'millify'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteFavoriteCryptos } from '../../../redux/favorites/thunks'

export const CryptoProfiles = ({cryptos}) => {
    const dispatch =useDispatch()
    const onRemoveFavorite=(id)=>{
            dispatch(deleteFavoriteCryptos(id))
    }
  return (
    <Row gutter={[32, 32]} className="">
    {cryptos?.map((currency) => (
      <Col
        xs={24}
        sm={12}
        lg={6}
        className="crypto-card"
        key={currency.id}
      >
        <Card
          title={`${currency?.market_data?.market_cap_rank}. ${currency?.name}`}
          extra={
            <img
              className="crypto-image"
              src={currency?.image?.thumb}
              alt={currency.name}
            />
          }
        >
          <p>Price: {currency.market_data.current_price.usd} USD </p>
          <p>
            Market Cap: {millify(currency.market_data.market_cap.usd)}
          </p>
          <p>
            Daily Change:
            {millify(currency.market_data.price_change_percentage_24h)} %
          </p>
          <Row justify="space-around">
            <Link to={`/crypto/${currency.id}`}>Details</Link>

            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => onRemoveFavorite(currency.id)}
            />
          </Row>
        </Card>
      </Col>
    ))}
  </Row>
  )
}
