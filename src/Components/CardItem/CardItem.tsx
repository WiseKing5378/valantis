import { Icard } from "../../Types/Types";
import { Card } from "antd";

const CardItem: React.FC<Icard> = ({ brand, price, id, product }) => {
  return (
    <Card title={id} bordered={false} style={{ width: 400 }}>
      <p>
        <b>Цена:</b> {price}
      </p>
      <p>
        <b>Бренд:</b> {brand ? brand : "не указан"}
      </p>
      <p>
        <b>Описание:</b> {product}
      </p>
    </Card>
  );
};

export default CardItem;
