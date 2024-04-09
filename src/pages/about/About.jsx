import React from "react";
import { useTheme } from "../../hooks/ThemeContext"
import ChefContent from '../../../public/images/home/testimonials/chefff.png'; 
import Food from "../../../public/images/food2.png"
import { FaInstagram, FaYoutube, FaShoppingCart } from 'react-icons/fa';
import {Link} from "react-router-dom"
import  { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const About = () => {
const { isDarkMode } = useTheme();
const [comment, setComment] = useState('');
const [comments, setComments] = useState([]);
const [foodName, setFoodName] = useState('');
const [rating, setRating] = useState('');
const [userName, setUserName] = useState('');
const [pageCount, setPageCount] = useState(0);
const [currentPage, setCurrentPage] = useState(0);


const handleUserNameChange = (e) => {
  setUserName(e.target.value);
};

const handleFoodNameChange = (e) => {
  setFoodName(e.target.value);
};

const handleRatingChange = (e) => {
  setRating(e.target.value);
};

useEffect(() => {
  fetchComments(currentPage);
}, [currentPage]);

const fetchComments = async (pageNumber) => {
  try {
    const response = await axios.get(`https://royalties-buffet-server.onrender.com/comments?page=${pageNumber}`);
    setComments(response.data.comments);
    setPageCount(response.data.totalPages);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const handlePageChange = (selectedPage) => {
  setCurrentPage(selectedPage.selected + 1);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('https://royalties-buffet-server.onrender.com/comments', { foodName, rating, comment, userName });
    alert('Comment Submitted');
    // Clear form fields after successful submission
    setFoodName('');
    setRating('');
    setComment('');
    setUserName('');
    // Refetch comments to update the list
    fetchComments(currentPage);
  } catch (err) {
    console.error(err);
    alert('Please fill all fields');
  }
};



   return(
    <>
     {/* about banner */}
     <div className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Some Description <span className="text-green">About Us</span>
            </h2>
            <p className="text-[#4A4A4A]  text-xl md:w-4/5 mx-auto">
            At Royalties Buffet, we believe in the art of gastronomy and strive to create a dining ambiance that celebrates food, family, and community. Whether you're craving traditional favorites or eager to explore new culinary delights, our buffet offers something for everyone.
            </p>
            <button href="/menu" className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
           <a href="/menu">Order Now</a>  
          </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center">
      {/* Left side: Chef Image */}
      <div className="lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
        <img src={ChefContent} />
      </div>

      {/* Right side: Chef Content */}
      <div className="lg:w-1/2 lg:pl-8">
      <h2 className="text-3xl font-bold mb-4 text-[#4A4A4A]">Meet Our Professional <span className="text-green">Chefs</span></h2>
        <p>
          Royalties Buffet takes immense pride in the culinary prowess and expertise of our esteemed chefs. Each chef within our culinary team brings a unique blend of passion, creativity, and dedication to the table, elevating the dining experience to unparalleled heights.
        </p>
        <br/>
        <p>
          Our chefs are not just masters of the kitchen; they are artisans of flavor, weaving together diverse ingredients and culinary techniques to craft gastronomic delights that tantalize the taste buds and captivate the senses. With a deep-rooted commitment to quality and innovation, our chefs continually push the boundaries of culinary excellence, creating unforgettable dining experiences for our patrons.
        </p>
        <br/>
        <p>
        At Royalties Buffet, we celebrate the culinary talents of our chefs, recognizing them as the heart and soul of our culinary journey. With their passion, expertise, and unwavering commitment to excellence, they continue to redefine the art of dining, setting new standards of culinary brilliance with every dish they create.
        </p>
        <div className="flex items-center mt-4">
        {/* Instagram Icon */}
        <FaInstagram className="text-3xl mr-4 text-pink-600" />

        {/* YouTube Icon */}
        <FaYoutube className="text-3xl mr-4 text-red-600" />

        {/* Order Icon */}
        <Link to="/menu" >
        <FaShoppingCart className="text-3xl text-green-600" />
        </Link>
      </div>
      </div>
    </div>
   < br />
    <br/>
    <br/>
    <br />
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center">
      {/* Left side: Chef Image */}
      <div className="lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
      <h2 className="text-3xl font-bold mb-4 text-[#4A4A4A]">Best Quality <span className="text-green">Food</span></h2>
        <p>
        At Royalties Buffet, we believe that food is more than just sustenance—it's an experience to be savored. Our commitment to excellence begins with the careful selection of ingredients, sourced from local farmers and artisans who share our dedication to quality. From farm-fresh produce bursting with flavor to premium cuts of meat expertly prepared by our skilled chefs, every dish reflects our unwavering commitment to culinary perfection.
        </p>
        <br/>
        <p>
        Whether you're sampling our signature dishes or exploring new and innovative flavors, each bite is a testament to our passion for creating memorable dining experiences. Join us at Royalties Buffet and embark on a culinary adventure where every meal is an opportunity to indulge in the finest flavors and culinary craftsmanship.
        </p>
        <br/>
        <p>
        Royalties Buffet promises a dining experience that transcends expectations and leaves a lasting impression. Join us and discover a world of culinary delight, where every meal is a feast for the senses.
        </p>
        <div className="flex items-center mt-4">
        {/* Instagram Icon */}
        <FaInstagram className="text-3xl mr-4 text-pink-600" />

        {/* YouTube Icon */}
        <FaYoutube className="text-3xl mr-4 text-red-600" />

        {/* Order Icon */}
        <Link to="/menu" >
        <FaShoppingCart className="text-3xl text-green-600" />
        </Link>
      </div>
      </div>

      {/* Right side: Chef Content */}
      <div className="lg:w-1/2 lg:pl-8 ">
      <img src={Food} />
      </div>
      </div>

   {/*Comment List */}
<div className="container mx-auto mt-8">
<h2 className="text-4xl text-center font-semibold mb-4">Comment <span className="text-green">Section</span></h2>
  <h2 className="text-2xl font-semibold mb-4">Comments <span className="text-green">List</span></h2>
  <ul className="list-none">
    {comments && comments.map(comment => (
      <li key={comment._id} className="mb-4">
        <div className="flex flex-col md:flex-row items-start justify-between mb-2">
          <div className="flex items-center">
            <h3 className="text-lg text-green font-semibold mr-2">{comment.userName}</h3>
          </div>
        </div>
        <h3 className="text-lg font-semibold">{comment.foodName} </h3>
        <span className="text-sm font-medium"> Rating: {comment.ratingEmoji}</span>
        <p className="text-gray-600">{comment.comment}</p>
      </li>
    ))}
  </ul>
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
</div><br/>

    {/*Comment Form*/}
    <div className="container mx-auto mt-5 flex justify-center items-center p-2">
  <div className="w-full max-w-md">
    <h2 className="text-lg font-semibold mb-4 text-center">
      Add a <span className="text-green">Comment</span>
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="form-control py-2 px-3 rounded-md border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none w-full bg-gray-100 text-gray-800" // Added text-gray-800 class
        placeholder="Your Name or User ID"
        value={userName}
        onChange={handleUserNameChange}
      />
      <select
        className="form-select py-2 px-3 rounded-md border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none w-full bg-gray-100 text-gray-800" // Added text-gray-800 class
        value={foodName}
        onChange={handleFoodNameChange}
      >
        <option value="">Select Food Name</option>
        <option value="Pizza">Pizza</option>
        <option value="Burger">Burger</option>
        <option value="Pasta">Pasta</option>
        {/* Add more options as needed */}
      </select>
      <select
        className="form-select py-2 px-3 rounded-md border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none w-full bg-gray-100 text-gray-800" // Added text-gray-800 class
        value={rating}
        onChange={handleRatingChange}
      >
        <option value="">Select Rating</option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>
      <textarea
        className="form-control py-2 px-3 rounded-md border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none w-full bg-gray-100 text-gray-800" // Added text-gray-800 class
        rows="4"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="btn py-2 px-4 rounded-md bg-green text-white hover:bg-grey focus:ring focus:ring-green focus:outline-none block mx-auto"
      >
        Submit
      </button>
    </form>
  </div>
</div>

    <br/>
    </>
   )
}
export default About;
