// src/components/JobForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddJob = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    logoUrl: ''
  });

  const [managejobs, setManagejobs] = useState([]);

  useEffect(() => {
    // Fetch job data from MongoDB API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://royalties-buffet-server.onrender.com/jobs');
        setManagejobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from MongoDB API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://royalties-buffet-server.onrender.com/apply');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`https://royalties-buffet-server.onrender.com/jobs`, formData);
      // Reset form data
      setFormData({ title: '', description: '', logoUrl: '' });
      alert("Job Added Sucessfully!")
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = item => {
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
        // Call deleteApply function
        axiosSecure.delete(`jobs/${item._id}`)
          .then(res => {
            console.log(res);
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            // Optionally trigger refetch here if needed
          })
          .catch(error => {
            console.error('Error deleting job application:', error);
            // Show error message
            Swal.fire({
              title: "Error!",
              text: "Failed to delete job application.",
              icon: "error"
            });
          });
      }
    });
  };

 // Adjusted handleDeleteMessage function to call deleteApply and handle success/failure
const handleDeleteApply = item => {
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
      // Call deleteApply function
      axiosSecure.delete(`apply/${item._id}`)
        .then(res => {
          console.log(res);
          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          // Optionally trigger refetch here if needed
        })
        .catch(error => {
          console.error('Error deleting job application:', error);
          // Show error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete job application.",
            icon: "error"
          });
        });
    }
  });
};

  return (
    <>
    <div class="overflow-x-auto mb-8 py-5">
       <div class="bg-white p-8 rounded-lg shadow-md w-96">
    <h2 class="text-xl font-bold mb-4">Add New <span className='text-green'>Job</span></h2>
    <form onSubmit={handleSubmit} class="mt-4">
      <div class="mb-4">
        <input type="text" id="title" name="title" placeholder=" Title" value={formData.title} onChange={handleChange} class="form-input w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm h-10" required/>
      </div>
      <div class="mb-4">
        <input type="text" id="description" name="description" placeholder=" Description" value={formData.description} onChange={handleChange} class="form-input w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm h-10" required/>
      </div>
      <div class="mb-4">
        <input type="text" id="logoUrl" name="logoUrl" placeholder=" Logo URL" value={formData.logoUrl} onChange={handleChange} class="form-input w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm h-10" required/>
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit</button>
    </form>
    </div>
    <div className="overflow-x-auto mb-8 py-5"> {/* Add margin bottom */}
    <h2 class="text-xl font-bold mb-4">Manage <span className='text-green'> Jobs</span></h2>
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managejobs.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td> <button
                      onClick={() => handleDeleteJob(item)}
                      className="btn bg-orange-500 btn-xs"
                    >
                      <FaTrashAlt className="text-white" />
                    </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    <div className="overflow-x-auto mb-8 "> {/* Add margin bottom */}
    <h2 class="text-xl font-bold mb-4">Applicant <span className='text-green'> List</span></h2>
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.position}</td>
                <td> <button
                      onClick={() => handleDeleteApply(item)}
                      className="btn bg-orange-500 btn-xs"
                    >
                      <FaTrashAlt className="text-white" />
                    </button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
</div>
    </div> 
 </>
  );
};

export default AddJob;
