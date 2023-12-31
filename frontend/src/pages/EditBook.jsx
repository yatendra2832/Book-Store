import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/books/${id}`, data)
      .then(() => {
        setLoading(false);
        toast.success("Book updated successfully");
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
      <h1 className="text-3xl my-4 text-center font-bold">Edit Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-blue-600 rounded-xl max-w-screen-sm mx-auto p-4">
        <div className="my-4">
          <label className="text-gray-600 text-lg font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label className="text-gray-600 text-lg font-semibold">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label className="text-gray-600 text-lg font-semibold">
            Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
