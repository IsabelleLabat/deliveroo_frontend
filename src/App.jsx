import { useEffect, useState } from "react";
// import Categories from "./components/Categories";
import LogoDeliveroo from "./assets/images/logo-teal.svg";

import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const [AddedToCart, SetAddedToCart] = useState(false);

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

  const handleAddToCart = (meal) => {
    const cartCopy = [...cart];
    let MealInCart = cartCopy.find((elem) => elem.id === meal.id);

    if (MealInCart === undefined) {
      const mealToPush = { ...meal, quantity: 1 };
      cartCopy.push(mealToPush);
    } else {
      MealInCart.quantity++;
    }
    setCart(cartCopy);
  };

  const handleRemoveFromCart = (meal) => {
    const cartCopy = [...cart];
    const mealInCart = cartCopy.find((elem) => elem.id === meal.id);
    if (mealInCart.quantity === 1) {
      const index = cartCopy.indexOf(mealInCart);
      cartCopy.splice(index, 1);
    } else {
      mealInCart.quantity--;
    }

    setCart(cartCopy);
  };

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
                              handleAddToCart(meal);
                              // console.log(meal);
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
                  {cart.map((meal) => {
                    subTotal = subTotal + parseInt(meal.price * meal.quantity);
                    delivery = 2.5;
                    Total = subTotal + delivery;

                    return (
                      <div key={meal.title} className="items-cart">
                        <div className="quantity">
                          <button
                            className="quantitybutton"
                            onClick={() => {
                              handleRemoveFromCart(meal);
                            }}
                          >
                            -
                          </button>

                          <div>{meal.quantity}</div>
                          <button
                            className="quantitybutton"
                            onClick={() => {
                              handleAddToCart(meal);
                            }}
                          >
                            +
                          </button>
                        </div>

                        <p>{meal.title}</p>
                        <p>{(meal.price * meal.quantity).toFixed(2)} €</p>
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
                <div>
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
