import { DeleteOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Typography } from 'antd'
import moment from 'moment'
import { useDispatch } from 'react-redux';

import imagedemo from "../../../images/icon5.png";
import { deleteFavoriteNew } from '../../../redux/favorites/thunks';
const {Title, Text} = Typography
export const NewsProfile = ({news}) => {
    const dispatch =useDispatch()
    const onRemoveFavorite = (id)=>{
        dispatch(deleteFavoriteNew(id))
    }
  return (
    <Row gutter={[24, 24]}>
      {news?.map(
            ({ headline, url, summary, source, datetime, id }) => (
              <Col xs={24} sm={12} lg={8} key={id}>
                <Card className="news-card">
                  <a href={url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                      <Title className="news-title" level={4}>
                        {headline}
                      </Title>
                      <img
                        src={imagedemo}
                        alt={headline}
                        style={{ height: "4rem" }}
                      />
                    </div>
                  </a>
                  <p>
                    {summary?.length > 100
                      ? `${summary.substring(0, 100)}...`
                      : summary}
                  </p>
                  <div className="provider-container">
                    <Text>
                      <strong>{source}</strong>
                    </Text>
                    <Text>{moment.unix(datetime).format("lll")}</Text>
                  </div>

                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => onRemoveFavorite(id)}
                  />
                </Card>
              </Col>
            )
          )}
    </Row>
  )
}
