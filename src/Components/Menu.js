import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const refreshAvailability = async (productId) => {
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      const product = products[productIndex];
      const existBoolean = !product.availability;

      // Assuming you have a field named 'availability' in your database
      // Replace 'YourCollection' with 'Products'
      const productDocRef = doc(db, "Products", productId);

      try {
        // Update the availability field in the database
        await updateDoc(productDocRef, { availability: existBoolean });

        // Update the products state with the modified availability
        setProducts((prevProducts) => {
          const updatedProducts = [...prevProducts];
          updatedProducts[productIndex] = {
            ...product,
            availability: existBoolean,
          };
          return updatedProducts;
        });
      } catch (error) {
        console.error("Error updating availability:", error);
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-light mb-4 p-2">
          Add a new Product to the list
        </h1>
        <Link
          to="/newitem"
          className="ml-3 bg-blue-800 hover:bg-blue-600 inline-block mb-5 p-2 text-white uppercase"
        >
          Add a new toy
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="shadow-md p-6 rounded-xl bg-slate-100 flex"
          >
            <div className="w-1/3">
              <img
                src={product.image}
                className="rounded-md p-3 w-full h-32 object-cover bg-blue-400 my-5"
                alt={product.category}
              />
            </div>
            <div className="w-2/3 pl-5">
              <p className="text-xl font-semibold mb-2">{product.name}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-600 mb-4">
                <span className="text-sm font-bold">Category: </span>
                {product.category}
              </p>
              <p className="text-green-600 font-bold">
                <span className="text-sm font-bold">Price: </span>${product.price}
              </p>

              <div className="mt-2">
                <span>
                  <select
                    className="p-3 rounded-md bg-blue-700 w-fit text-white shadow-ml"
                    value={product.availability ? "true" : "false"}
                    onChange={() => refreshAvailability(product.id)}
                  >
                    <option value="true">Available</option>
                    <option value="false">Not available</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
