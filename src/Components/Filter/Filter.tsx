import "./Filter.css";
import { filterCards } from "../../Api/Api";
import { useState } from "react";
import { Icard } from "../../Types/Types";
interface IfilterProps {
  fn: React.Dispatch<React.SetStateAction<Icard[] | null>>;
}

const Filter: React.FC<IfilterProps> = ({ fn }) => {
  const [filterValue, setfilterValue] = useState<string | number>("");
  const [currentFilter, setCurentFilter] = useState("price");

  function changeFilterOption(e: React.ChangeEvent<HTMLSelectElement>) {
    setfilterValue("");
    setCurentFilter(e.target.value);
  }
  function changeFilterValue(e: React.ChangeEvent<HTMLInputElement>) {
    let curentValue: string | number = e.target.value.trim();
    if (currentFilter === "price" && typeof curentValue === "string") {
      curentValue = +curentValue
        .split("")
        .filter((i: any) => !isNaN(i))
        .join("");
    }
    setfilterValue(curentValue);
  }

  return (
    <div className="filter">
      <p>Сортировать по: </p>
      <select name="filter" onChange={changeFilterOption}>
        <option value="price">Цене</option>
        <option value="product">Продукту</option>
        <option value="brand">Бренду</option>
      </select>

      <input
        type="text"
        placeholder={currentFilter}
        onChange={changeFilterValue}
        value={filterValue}
      />
      <button
        onClick={() => {
          fn(null);
          filterCards({ [currentFilter]: filterValue }).then((r) => fn(r));
        }}
      >
        Отсортировать
      </button>
    </div>
  );
};

export default Filter;
