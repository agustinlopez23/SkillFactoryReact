import { Button, Card, Col, message, Row, Spin, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import { useGetNewsQuery } from "../../../redux/api/criptoNewsApi";
import { limitFunction } from "../../../hooks/limit";
import imagedemo from "../../../images/icon5.png";
import { HeartOutlined } from "@ant-design/icons";
import { addFavorite } from "../../../helpers/addFavorite";
import {
  addFavoriteNew,
  getFavoriteNew,
} from "../../../redux/favorites/thunks";
import { useDispatch, useSelector } from "react-redux";

import { fromFirebaseToLocal } from "../../../helpers/fromFirebaseToLocal";


const { Text, Title } = Typography;
export const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const { news,isSaved } = useSelector((state) => state.favorites);
 
 

  //Fetch API
  const [category, setCategory] = useState("crypto");

  const newsFetch = useGetNewsQuery(category);
  //Favorites
  
  const favorites = fromFirebaseToLocal(news);

  const onAddFavorite = (id) => {
    const newFavorite = addFavorite(id, newsFetch.data, favorites);
    
    if (!newFavorite)
      return message.error("Cannot add two times the same item to favorites");

    dispatch(addFavoriteNew(newFavorite));

    dispatch(getFavoriteNew());
  };
  //Loader
  if (newsFetch.isFetching)
    return (
      <Row justify="center">
        <Spin />
      </Row>
    );
  const limitArray = limitFunction({ newsFetch, limit: 5 });

  return (
    <Row gutter={[24, 24]}>
      {simplified
        ? limitArray.map(({ headline, url, summary, source, datetime, id }) => (
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
                  {summary.length > 100
                    ? `${summary.substring(0, 100)}...`
                    : summary}
                </p>
                <div className="provider-container">
                  <Text>
                    <strong>{source}</strong>
                  </Text>
                  <Text>{moment(datetime).startOf().fromNow()}</Text>
                </div>
              </Card>
            </Col>
          ))
        : newsFetch?.data?.map(
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
                    {summary.length > 100
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
                    disabled={isSaved}
                    shape="circle"
                    icon={<HeartOutlined />}
                    onClick={() => onAddFavorite(id)}
                  />
                </Card>
              </Col>
            )
          )}
    </Row>
  );
};
