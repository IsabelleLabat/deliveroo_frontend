import { useEffect, useState } from "react";
// import Categories from "./components/Categories";
import LogoDeliveroo from "./assets/images/logo-teal.svg";

import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [AddedToCart, SetAddedToCart] = useState(false);

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevCount) => prevCount - 1);
  };
  let subTotal = 0;
  let delivery = 0;
  let Total = 0;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroobackend--7zwqb2nbgsj7.code.run/"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      <header>
        <div className="topbar container">
          <img src={LogoDeliveroo} alt="" />
        </div>
      </header>
      <section className="hero">
        <div className="inner-hero container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>

          <img src={data.restaurant.picture} alt="restaurant" />
        </div>
      </section>
      <main>
        <div className="container inner-main">
          <div className="categories">
            {data.categories.map((item) => {
              if (item.meals.length !== 0) {
                // console.log(item);
                return (
                  <section key={item.name}>
                    <h2>{item.name}</h2>
                    <div className="meal-container">
                      {item.meals.map((meal) => {
                        //console.log(meal);
                        return (
                          <div
                            className="plate"
                            key={meal.id}
                            onClick={() => {
                              const basketCopy = [...basket];
                              basketCopy.push(meal);
                              console.log(meal);
                              setBasket(basketCopy);
                              SetAddedToCart(true);
                            }}
                          >
                            <div>
                              <h3>{meal.title}</h3>
                              <p className="description">{meal.description}</p>
                              <div className="price-popular">
                                <p>{meal.price} €</p>
                                {meal.popular && <p>Populaire</p>}
                              </div>
                            </div>

                            {meal.picture && <img src={meal.picture} alt="" />}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              } else {
                return null;
              }
            })}
          </div>

          <aside>
            {AddedToCart === true ? (
              <section>
                <input
                  className="submit "
                  type="submit"
                  value="Valider mon panier"
                  onClick={() => alert("Merci pour votre commande")}
                />
                <div className="cart">
                  {basket.map((item) => {
                    subTotal = subTotal + parseInt(item.price);
                    delivery = 2.5;
                    Total = subTotal + delivery;

                    return (
                      <div key={item.title} className="items-basket">
                        <div className="quantity">
                          <button
                            className="quantitybutton"
                            onClick={handleDecrement}
                          >
                            -
                          </button>

                          <div>{quantity}</div>
                          <button
                            className="quantitybutton"
                            onClick={handleIncrement}
                          >
                            +
                          </button>
                        </div>

                        <p>{item.title}</p>
                        <p>{item.price} €</p>
                      </div>
                    );
                  })}
                </div>
                <div className="subtotal">
                  <p>Sous total</p>
                  <p>{subTotal} €</p>
                </div>

                <div className="delivery">
                  <p>Livraison</p>
                  <p>{delivery} €</p>
                </div>

                <div className="subtotal">
                  <p>Total</p>
                  <p>{Total} €</p>
                </div>
              </section>
            ) : (
              <section>
                <input
                  className="submit-before "
                  type="submit"
                  value="Valider mon panier"
                />
                <div className="basket">
                  <div className="empty-cart">Votre panier est vide</div>
                </div>
              </section>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
