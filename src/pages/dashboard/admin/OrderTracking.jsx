
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt, FaUsers, FaPrint, FaCarSide } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const OrderTracking = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payments/all`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
    //   console.log(menu)
      const axiosSecure = useAxiosSecure();
    
    //   pagination
    const [currentPage, setCurrentPage] = useState(1);
    const items_Per_Page =  10;
    const indexOfLastItem = currentPage * items_Per_Page;
      const indexOfFirstItem = indexOfLastItem - items_Per_Page;
      const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    
      const handleDeleteItem = item => {
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
    
                axiosSecure.delete(`/payments/${item._id}`)
                    .then(res => {
                      console.log(res)
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                  })
                    refetch();
            }
        });
    }

    // confirm order
    const confiremedOrder = async(item) => {
      console.log(item)
    await  axiosSecure.patch(`/payments/${item._id}`)
      .then(res =>{
          console.log(res.data)
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Order Confirmed Now!",
              showConfirmButton: false,
              timer: 1500
            });
          refetch();
      })

    }

  console.log(orders)


  const dispatchedOrder = async (item) => {
    console.log(item)
    await  axiosSecure.patch(`/payments/${item._id}`)
      .then(res =>{
          console.log(res.data)
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Order Dispatched!",
              showConfirmButton: false,
              timer: 1500
            });
          refetch();
      })

    }

console.log(orders)

 // Function to handle printing
 const handlePrint = () => {
  window.print();
};


  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
       {/* Print button */}
       <div className="flex justify-end my-4 ml-auto">
        <button onClick={handlePrint} className="btn btn-sm bg-green text-white">
          Print
          <FaPrint />
        </button>
      </div>
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Orders!</span>
      </h2>

      {/* menu items table  */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>UserId</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Orders</th>
                <th>Food Items</th>
                <th>Adress</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                   {item.email}
                  </td>
                  <td>{item.transitionId}</td>
                  <td>₹{item.price}</td>
                  <td>
                    {item.quantity}
                  </td>
                  <td>
                    {item.itemsName} 
                  </td>
                  <td>
                    {item.address}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red"></FaTrashAlt>
                    </button>
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
            disabled={indexOfLastItem >= orders.length}
            className="btn btn-sm bg-green text-white"
          >
            Next  <FaArrowRight/>
          </button>
        </div>
    </div>
  )
}

export default OrderTracking;
      