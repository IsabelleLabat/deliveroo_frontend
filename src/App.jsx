import { useEffect, useState } from "react";
// import Categories from "./components/Categories";

import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroobackend--7zwqb2nbgsj7.code.run/"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <h1>{data.restaurant.name}</h1>
      <p>{data.restaurant.description}</p>
      <img src={data.restaurant.picture} alt="restaurant" />

      {data.categories.map((item) => {
        console.log(item);
        return (
          <>
            <h2 key={item.name}>{item.name}</h2>
            <span key={item.meals.id}>{item.meals}</span>
          </>

          // <h2 key={item.meals}>{item.meals}</h2>
        );
      })}

      <section>
        <h2>{data.categories[0].name}</h2>
        <h2>{data.categories[1].name}</h2>
        {/* <p keys={data.categories[0].id}>{data.categories[0].meals}</p> */}
      </section>
    </>
  );
}

export default App;
