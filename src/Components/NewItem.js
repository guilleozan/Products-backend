import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const NewItem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    availability: true, // Default availability set to true
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    // Validate the field when the user is typing
    validateField(name, value);
  };

  const handleBlur = (e) => {
    // Validate the field when the user clicks out of it
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required" : "";
        break;
      case "description":
        newErrors.description =
          value.trim() === "" ? "Description is required" : "";
        break;
      case "price":
        newErrors.price =
          value.trim() === ""
            ? "Price is required"
            : isNaN(value) || parseFloat(value) <= 0
            ? "Price must be a valid number greater than 0"
            : "";
        break;
      // Add more cases for other fields if needed
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate all fields
    validateField("name", formData.name);
    validateField("description", formData.description);
    validateField("price", formData.price);

    setErrors(newErrors);
    setFormSubmitted(true);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with form submission
      try {
        // Add a new document with the form data to the "products" collection
        const docRef = await addDoc(collection(db, "Products"), formData);

        navigate('/menu');

        console.log("Document written with ID: ", docRef.id);

        // Optionally, you can reset the form data after successful submission
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: null,
          availability: true,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      // Form is invalid, display errors or take other actions
      console.log("Form is invalid");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Add a new product to the list</h1>

      <div className="flex justify-center mt-10">
        <div className="bg-gray-200 w-full p-3 rounded-md max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-700 text-sm mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Toy name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="text-gray-700 text-sm mb-2" htmlFor="price">
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                name="price"
                placeholder="$10"
                min="0"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="text-gray-700 text-sm mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-10"
                id="description"
                type="text"
                name="description"
                placeholder="Information related"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-700 text-sm mb-2" htmlFor="category">
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">--Select one--</option>
                <option value="childrens">Children Toys</option>
                <option value="board-games">Board Games</option>
                <option value="adult-games">Adult Games</option>

              </select>
            </div>

            <div className="mb-4">
              <label className="text-gray-700 text-sm mb-2" htmlFor="availability">
                Available
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="availability"
                name="availability"
                value={formData.availability.toString()} // Convert boolean to string
                onChange={handleChange}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="text-gray-700 text-sm mb-2" htmlFor="image">
                Image
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
              />
            </div>

            {/* Display general error message */}
            {Object.values(errors).some((error) => error !== "") && (
              <p className="text-red-500">
                Please complete and validate all fields before submitting.
              </p>
            )}

            <div className="flex justify-center items-center">
              <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 mt-5 p-2 text-white rounded-3xl w-1/3"
                value="Add new product"
                disabled={formSubmitted && Object.values(errors).some((error) => error !== "")}
              />
            </div>

          </form>
        </div>
      </div>
    </>
  );
};
