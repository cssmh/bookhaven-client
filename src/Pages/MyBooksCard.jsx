import swal from "sweetalert";
import { Link } from "react-router-dom";
import { deleteBook } from "../Api/Delete";

const MyBooksCard = ({ getBook, refetch }) => {
  const {
    _id,
    book_name,
    book_image,
    provider_phone,
    provider_email,
    book_status,
    provider_location,
  } = getBook;

  const handleDelete = async (idx, name) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteBook(idx, provider_email);
      if (res.deletedCount > 0) {
        swal(`${name} Deleted!`, {
          icon: "success",
          timer: 2000,
        });
        refetch();
      }
    }
  };

  return (
    <div
      data-aos="zoom-in"
      className="group card shadow-xl flex flex-col items-center text-center space-y-3 mb-5"
    >
      <div className="flex-grow">
        <figure className="pt-4 mb-2">
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[100px] h-[135px]"
          />
        </figure>
        <div className="space-y-1 group-hover:scale-105 group-hover:transition-all group-hover:duration-300">
          <h2 className="text-xl font-bold text-blue-900 px-4">{book_name}</h2>
          <p className="text-base">Phone: {provider_phone}</p>
          <p className="text-base">Location: {provider_location}</p>
          <p>
            Book Status:{" "}
            <span
              className={`text-base ${
                book_status === "available" ? "text-green-500" : "text-red-600"
              }`}
            >
              {book_status}
            </span>
          </p>
        </div>
      </div>
      <div className="pb-5">
        <div className="space-x-1">
          <Link
            to={`/book/${book_name
              .toLowerCase()
              .replaceAll(/\s+/g, "_")}/${_id}`}
          >
            <button className="bg-primary text-white py-1 px-3 rounded-xl">
              Details
            </button>
          </Link>
          {book_status === "available" && (
            <>
              <Link to={`/update-book/${_id}`}>
                <button className="bg-green-400 text-white py-1 px-3 rounded-xl">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id, book_name)}
                className="bg-red-500 text-white py-1 px-3 rounded-xl"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
