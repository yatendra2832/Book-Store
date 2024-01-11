import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { toast } from "react-toastify";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`book-store-backend-1u1drkpmo-yatendra-singhs-projects.vercel.app/api/books/${id}`)
      .then(() => {
        setLoading(false);
        toast.success("Book deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center font-bold">Delete Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col items-center border-2 border-blue-400 rounded-xl max-w-screen-md mx-auto p-8 my-auto">
        <h3 className="text-2xl mb-4">
          Are you sure you want to delete this book?
        </h3>
        <button
          className="p-4 bg-red-600 text-white w-50 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleDeleteBook}
          type="button"
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
