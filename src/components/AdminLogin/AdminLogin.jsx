import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AdminLogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [fetchedData, setFetchedData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/1`
      );
      console.log(response.data);
      setFetchedData(response.data);

      // Set the fetched data as default values using setValue
      setValue("name", response.data.userId);
      // Set other default values as needed
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="admin_login_wrapper">
      <div className="admin_login">
        <button onClick={fetchData}>Fetch Data</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name", {
              required: "Ismi bo'sh bo'lishi mumkin emas",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "name xatolik",
              },
            })}
            placeholder="name"
            defaultValue={fetchedData?.userId || ""} 
          />
          <p>{errors.name?.message}</p>
          {/* Rest of your input fields */}
          <button type="submit">button</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
