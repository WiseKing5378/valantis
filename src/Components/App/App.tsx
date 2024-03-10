import { useEffect, useState } from "react";
import "./App.css";
import CardList from "../CardList/CardList";
import { Icard } from "../../Types/Types";
import { getCards } from "../../Api/Api";
import Filter from "../Filter/Filter";
import { Pagination } from "antd";

function App() {
  const [cards, setCards] = useState<Icard[] | null>(null);
  const [page, setPage] = useState(1);
  const [curCard, setCurCard] = useState<Icard[] | null>(null);

  useEffect(() => {
    async function updateCards() {
      const result = await getCards();
      setCards(result);
    }
    updateCards();
  }, []);

  useEffect(() => {
    setCurCard(cards ? cards?.slice(0, 50) : null);
    setPage(1);
  }, [cards]);

  function changePage(page: number) {
    setCurCard(cards ? cards.slice(page * 50 - 50, page * 50) : null);
    setPage(page);
  }
  return (
    <>
      <Filter fn={setCards}></Filter>
      <div className="cards_section">
        <CardList cards={curCard}></CardList>
        <Pagination
          showSizeChanger={false}
          hideOnSinglePage
          pageSize={50}
          onChange={changePage}
          current={page}
          total={cards ? cards.length : 1}
        ></Pagination>
      </div>
    </>
  );
}

export default App;
