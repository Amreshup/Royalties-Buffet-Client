import React from "react";
import{ useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null
    });

    const [selectedPosition, setSelectedPosition] = useState(''); // State for selected position

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // If the target is a file input, store the file
        const updatedValue = name === 'resume' ? files[0] : value;
        setFormData({ ...formData, [name]: updatedValue });
      };
    
      const handlePositionChange = (e) => {
        setSelectedPosition(e.target.value);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object to send files with Axios
       // const formDataToSend = new FormData();
        // formDataToSend.append('name', formData.name);
        // formDataToSend.append('email', formData.email);
        // formDataToSend.append('phone', formData.phone);
        // formDataToSend.append('position', formData.position); // Append selected position
        // formDataToSend.append('resume', formData.resume);
       let obj = {
        name:formData.name,
        email:formData.email,
        phone:formData.phone,
        position:formData.position
       }
    
        try {
          // Send form data to backend
          const response = await axios.post('http://localhost:5000/apply', obj);
          console.log('Application submitted:', response.data);
          alert("Thankyou for apply we will text you on whatsapp soon :)")
            // Clear the form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        resume: null
      });
        } catch (error) {
          console.error('Error submitting application:', error);
        }
      };

    return(
        <>
         <div className="container mx-auto mt-56">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center">Apply for <span className="text-green">Job</span></h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="form-control w-full border rounded-md px-3 py-2"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="form-control w-full border rounded-md px-3 py-2"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
            <input
              className="form-control w-full border rounded-md px-3 py-2"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
<label class="block text-gray-700 text-sm font-bold mb-2">Position:</label>
<select
  class="form-select block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
  name="position"
  value={formData.position}
  onChange={handleChange}
  required
>
  <option value="">Select Position</option>
  <option value="Junior Developer">Junior Developer</option>
  <option value="Graphic Designer">Graphic Designer</option>
  <option value="Chef">Chef</option>
  <option value="Delivery Man">Delivery Man</option>
  <option value="Waiter">Waiter</option>
  <option value="Receptionist">Receptionist</option>
  {/* Add more options as needed */}
</select>

</div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume">Resume</label>
            <input
              className="form-control w-full border rounded-md px-3 py-2"
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required  
            />
          </div>
          <button
            type="submit"
            className=" btn-primary bg-grey hover:bg-green text-white px-4 py-2 rounded-md w-full"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
        </>
    )
}
export default Apply;