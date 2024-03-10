import CardItem from "../CardItem/CardItem";
import "./CardList.css";
import { Icard } from "../../Types/Types";
import { Spin } from "antd";

type CardListProps = {
  cards: Icard[] | null;
};

const CardList: React.FC<CardListProps> = ({ cards }) => {
  const cardlist = cards?.map((i) => <CardItem key={i.id} {...i}></CardItem>);

  return (
    <ul className="cardlist">
      {cardlist ? cardlist : <Spin size="large" />}
      {cardlist?.length === 0 && "По вашему запросу ничего не нашлось"}
    </ul>
  );
};

export default CardList;
