import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { FaTrashAlt } from "react-icons/fa";

const CommentsManage = () => {
  const [comments, setComments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);
  
  const fetchComments = async (pageNumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/comments?page=${pageNumber}`);
      setComments(response.data.comments);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${id}`);
      fetchComments(); // Refresh comments after deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="container mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Manage <span className='text-green'>Comments</span></h2>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">User Name</th>
          <th className="px-4 py-2">Food Name</th>
          <th className="px-4 py-2">Rating</th>
          <th className="px-4 py-2">Comment</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(comments) && comments.map((comment) => (
          <tr key={comment._id}>
            <td className="border px-4 py-2">{comment.userName}</td>
            <td className="border px-4 py-2">{comment.foodName}</td>
            <td className="border px-4 py-2">{comment.ratingEmoji}</td>
            <td className="border px-4 py-2">{comment.comment}</td>
            <td className="border px-4 py-2">
            <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn bg-orange-500 btn-xs"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <br/>
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={null} // Hide the ellipsis (...) button
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      containerClassName={'pagination flex justify-center'}
      activeClassName={'active'}
      previousClassName={'px-4 py-2 bg-green text-white rounded-md mr-2 transition-colors duration-300 ease-in-out hover:bg-grey'}
      nextClassName={'px-4 py-2 bg-green text-white rounded-md ml-2 transition-colors duration-300 ease-in-out hover:bg-grey'}
      disabledClassName={'px-4 py-2 bg-gray-200 text-white rounded-md mr-2'}
    />
  </div>
  );
};

export default CommentsManage;
