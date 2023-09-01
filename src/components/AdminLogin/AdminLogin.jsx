import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import "./AdminLogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setFetchedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);

    // Set default values for the form fields when opening the modal
    setValue("id", data.id);
    setValue("body", data.body);
    setValue("title", data.title);
  };

  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    // Handle form submission here, e.g., update data
    console.log(data);
    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="admin_login_wrapper">
      <div className="admin_login">
        <button onClick={fetchData}>Fetch Data</button>

        <div className="cards">
          {fetchedData.map((data) => (
            <div className="card" key={data.id}>
              <h1>
                {data.id}. {data.title}
              </h1>
              <p>{data.body}</p>
              <small>Foydalanuvchi ID: {data.userId}</small>
              <button type="button" onClick={() => openModal(data)}>
                Open
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Fetched Data Modal"
      >
        {selectedData && (
          <>
            <h2>Fetched Data</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                defaultValue={selectedData.id}
                type="text"
                {...register("id", {
                  required: "ID is required",
                })}
                placeholder="id"
              />
              <input
                type="text"
                {...register("body", {
                  required: "Body is required",
                })}
                placeholder="body"
                defaultValue={selectedData.body}
              />
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
                placeholder="title"
                defaultValue={selectedData.title}
              />
              <button type="submit" disabled={!isDirty}>
                Submit
              </button>
              <button type="button" onClick={() => reset()}>
                Reset
              </button>
            </form>
            <button onClick={closeModal}>Close Modal</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminLogin;
