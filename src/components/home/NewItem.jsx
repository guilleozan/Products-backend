
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // For image upload
import { db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const NewItem = () => {
  const navigate = useNavigate();
  const storage = getStorage();

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };
  

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    availability: true,
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    switch (fieldName) {
      case "name":
        newErrors.name = value.trim() === "" ? "Name is required" : "";
        break;
      case "description":
        newErrors.description = value.trim() === "" ? "Description is required" : "";
        break;
      case "price":
        newErrors.price =
          value.trim() === "" || isNaN(value) || parseFloat(value) <= 0
            ? "Price must be a valid number greater than 0"
            : "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    validateField("name", formData.name);
    validateField("description", formData.description);
    validateField("price", formData.price);
    setErrors(newErrors);
    setFormSubmitted(true);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // If there's an image, upload it to Firebase Storage
        let imageUrl = null;
        if (formData.image) {
          const storageRef = ref(storage, `images/${formData.image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, formData.image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Image upload failed:", error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              submitForm(imageUrl); // Call function to submit data
            }
          );
        } else {
          // If no image is uploaded, just submit form without an image URL
          submitForm(null);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form is invalid");
    }
  };

  const submitForm = async (imageUrl) => {
    try {
      const productData = {
        ...formData,
        image: imageUrl, 
      };
      await addDoc(collection(db, "Products"), productData);
      navigate("/menu");
    } catch (error) {
      console.error("Error adding document:", error);
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
                placeholder="Product Name"
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
                <option value="bread">Breads</option>
                <option value="pastries">Pastries</option>
                <option value="buns">Buns</option>
                <option value="cakes">Cakes</option>

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
              {uploadProgress > 0 && <p>Upload progress: {uploadProgress}%</p>}
            </div>
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





