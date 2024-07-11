import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="bg-gray-300 border border-slate-600 rounded-md font-bold p-2">No</th>
          <th className="bg-gray-300 border border-slate-600 rounded-md font-bold p-2">
            Title
          </th>
          <th className="bg-gray-300 border border-slate-600 rounded-md font-bold p-2 hidden md:table-cell">
            Author
          </th>
          <th className="bg-gray-300 border border-slate-600 rounded-md font-bold p-2 hidden md:table-cell">
            Publish Year
          </th>
          <th className="bg-gray-300 border border-slate-600 rounded-md font-bold p-2">
            Operations
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-12">
            <td className="bg-gray-300 border border-slate-700 rounded-md text-center font-bold p-2">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center p-2">
              {book.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center p-2 hidden md:table-cell">
              {book.author}
            </td>
            <td className="border border-slate-700 rounded-md text-center p-2 hidden md:table-cell">
              {book.publishYear}
            </td>
            <td className="border border-slate-700 rounded-md text-center p-2">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-700" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-amber-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-700" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

BooksTable.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishYear: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BooksTable;
