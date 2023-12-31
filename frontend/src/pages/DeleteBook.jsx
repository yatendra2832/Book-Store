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
      .delete(`http://localhost:5000/api/books/${id}`)
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
      <h1 className="text-3xl my-4"> Delete Books</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 my-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full rounded-lg"
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
