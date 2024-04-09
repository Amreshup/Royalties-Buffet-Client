import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight, FaEdit, FaTrashAlt,FaBox, FaUsers, FaCarSide } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://royalties-buffet-server.onrender.com/payments/all`,
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

  const dispatchedOrder = async(item) => {
    console.log(item)
  await  axiosSecure.patch(`/payments/dispatch/${item._id}`)
    .then(res =>{
        console.log(res.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Order Dispatched Now!",
            showConfirmButton: false,
            timer: 1500
          });
        refetch();
    })

  }

console.log(orders)


const deliverOrder = async(item) => {
  console.log(item)
await  axiosSecure.patch(`/payments/deliver/${item._id}`)
  .then(res =>{
      console.log(res.data)
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order Delivered Now!",
          showConfirmButton: false,
          timer: 1500
        });
      refetch();
  })

}

console.log(orders)




  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Bookings!</span>
      </h2>

      {/* menu items table  */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>Status🔵🟡🟢</th>
                <th>Confirm Order</th>
                <th>Dispatch Order</th>
                <th>Order Delivered</th>
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
                    {item.status}
                  </td>
                  <td className="text-center">
                  {item.status === "confirmed" ? "done" :  <button
                      className="btn bg-blue-700 text-white btn-xs text-center"
                      onClick={() => confiremedOrder(item)}
                    >
                      <GiConfirmed />
                    </button> }
                   
              </td>
                  
                  <td className="text-center">
                  {item.status2 === "dispatched" ? "done" :  <button
                      className="btn bg-green text-white btn-xs text-center"
                      onClick={() =>dispatchedOrder(item)}
                    >
                     <FaBox />

                    </button> }
                   
              </td> 
        
                  <td className="text-center">
                  {item.status3 === "deliver" ? "done" :  
                   <button
                   className="btn bg-grey text-white btn-xs text-center"
                     onClick={() => deliverOrder(item)} // Use deliverOrder here
                    >
                  <FaCarSide />
               </button>
    }
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

export default ManageBookings
