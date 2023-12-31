import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BookTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-0 border rounded-md overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4">No</th>
          <th className="py-2 px-4">Title</th>
          <th className="py-2 px-4 max-md:hidden">Author</th>
          <th className="py-2 px-4 max-md:hidden">Publish Year</th>
          <th className="py-2 px-4">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-12 hover:bg-gray-100 transition duration-300">
            <td className="py-2 px-4 text-center">{index + 1}</td>
            <td className="py-2 px-4">{book.title}</td>
            <td className="py-2 px-4 max-md:hidden">{book.author}</td>
            <td className="py-2 px-4 max-md:hidden">{book.publishYear}</td>
            <td className="py-2 px-4">
              <div className="flex justify-center items-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-600 hover:text-green-700 transition duration-300" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-700 transition duration-300" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-700 transition duration-300" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
