import { md5 } from "js-md5";
import { Icard } from "../Types/Types";

interface IfilterParams {
  price?: number;
  brand?: string;
  product?: string;
}

function api(action: string, params: object) {
  const date = new Date()
    .toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .split(".")
    .reverse()
    .join("");
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "X-Auth": md5(`Valantis_${date}`),
    },
    body: JSON.stringify({
      action: action,
      params: params,
    }),
  };
  function onError(err: object): Promise<void> {
    console.log(typeof err);
    return new Promise((resolve) => setTimeout(resolve, 500)).then(() =>
      api(action, params)
    );
  }
  return fetch("http://api.valantis.store:40000", fetchOptions)
    .then((resp) => resp.json())
    .then((res) => res.result)
    .catch(onError);
}

export const getCards = async () => {
  try {
    const ids = await api("get_ids", { offset: 0 });
    const cards = await api("get_items", { ids: [...new Set(ids)] });
    const buffer: { [key: string]: string } = {};
    const result = cards.filter((i: Icard) => {
      if (i.id in buffer) {
        return false;
      } else {
        buffer[i.id] = i.id;
        return true;
      }
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const filterCards = async (filterBy: IfilterParams) => {
  try {
    const filteredCard = await api("filter", filterBy);
    const cards = await api("get_items", { ids: [...new Set(filteredCard)] });
    return cards;
  } catch (error) {
    console.log(error);
  }
};
