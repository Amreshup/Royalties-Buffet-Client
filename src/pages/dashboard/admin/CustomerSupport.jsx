import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomerSupport = () => {
  // Define state to hold the fetched data
  const [messages, setMessages] = useState([]);
  const axiosSecure = useAxiosSecure();

   //   pagination
   const [currentPage, setCurrentPage] = useState(1);
   const items_Per_Page =  10;
   const indexOfLastItem = currentPage * items_Per_Page;
     const indexOfFirstItem = indexOfLastItem - items_Per_Page;
     const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);
 

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('http://localhost:5000/message');
        // Update state with the fetched data
        setMessages(response.data);
      } catch (error) {
        // Log any errors
        console.error('Error fetching messages:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const handleDeleteMessage = item => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`message/${item._id}`)
                .then(res => {
                    console.log(res);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch(); // Using refetch here
                });
                
        }
    });
};


  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Customer <span className="text-green">Support!</span>
      </h2>

      {/* menu items table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {messages.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>
                  <button
                      onClick={() => handleDeleteMessage(item)}
                      className="btn bg-orange-500 btn-xs"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </td>
                  <td>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
  </div>
   {/* Pagination */}
   <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm mr-2 btn-warning"
          >
            <FaArrowLeft/> Previous 
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= messages.length}
            className="btn btn-sm bg-green text-white"
          >
            Next  <FaArrowRight/>
          </button>
        </div>
    </div>

  );
}

export default CustomerSupport;
