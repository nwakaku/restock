/* eslint-disable react/prop-types */
// src/context/MyContext.jsx
import { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [session, setSession] = useState(null);
  
  const [cartItems, setCartItems] = useState([
    {
      id: "Pasta",
      image:
        "https://www.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_7aaf24e6-dcdd-4eac-b7f3-248efde80c8f.jpeg",
      name: "Pasta",
      quantity: 2,
      unit: "boxes",
      price: 3.99,
    },
    {
      id: "Tomatoes",
      image:
        "https://www.instacart.com/image-server/394x394/filters:fill(FFF,true):format(jpg)/d2lnr5mha7bycj.cloudfront.net/product-image/file/large_9ce9e4a9-0ceb-4bbb-8813-eda8d677fcd5.jpeg",
      name: "Tomatoes",
      quantity: 6,
      unit: "pieces",
      price: 0.99,
    },
  ]);


  return (
    <MyContext.Provider
      value={{ user, setUser, session, setSession, cartItems, setCartItems }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
