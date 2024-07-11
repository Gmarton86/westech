import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "../shared/interfaces";

export const useLoadData = () => {
  const [response, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://hiring.wdev.sk/fe-data")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return { response, loading };
};
