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
  const meals = data.categories.meals.map((meal) => (
    <div key={meal.id}>
      <p>{meal.title}</p>
      <p>{meal.description}</p>
    </div>
  ));

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <h1>{data.restaurant.name}</h1>
      <p>{data.restaurant.description}</p>
      <img src={data.restaurant.picture} alt="restaurant" />

      {data.categories.map((item) => {
        // console.log(item);
        return <h2 key={item.name}>{item.name}</h2>;
      })}
      <div>{meals}</div>
    </>
  );
}

export default App;
