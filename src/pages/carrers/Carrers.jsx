import React from "react";
import { useTheme } from "../../hooks/ThemeContext"
import { useEffect, useState } from 'react';
import Beyonist from "../../../public/images/Bey.webp"
import { FaInstagram, FaYoutube, FaShoppingCart } from 'react-icons/fa';
import {Link} from "react-router-dom"
import charity from "../../../public/images/charity.png";
import { BsBrowserChrome } from "react-icons/bs";
import Finance from "../../../public/images/finanace.png";


const Careers = () => {
const { isDarkMode } = useTheme()
const [jobs, setJobs] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch("https://royalties-buffet-server.onrender.com/jobs");
      const data = await response.json();
      setJobs(data);
      setFilteredItems(data); // Initially, display all items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

const handleNext = () => {
  setCurrentIndex(prevIndex => Math.min(prevIndex + 3, jobs.length - 3));
};

const handlePrev = () => {
  setCurrentIndex(prevIndex => Math.max(prevIndex - 3, 0));
};

return(
    <>
     {/* menu banner */}
     <div className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? "dark" : ""}`}>
        <div className="py-48 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Careers <span className="text-green">Page</span>
            </h2>
            <p className="text-[#4A4A4A]  text-xl md:w-4/5 mx-auto">
            The Royalties Buffet Careers page offers an exciting glimpse into the vibrant world of hospitality and culinary excellence. Aspiring individuals seeking rewarding opportunities in the food and beverage industry will find a wealth of options and possibilities awaiting them.
            </p>
            <button href="/menu" className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
           <a href="/menu">Order Now</a>  
          </button>
          </div>
        </div>
      </div>

      { /* Beyonist */ }
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center">
      {/* Left side: Career Image */}
      <div className="lg:w-1/2 lg:pr-8 mb-4 lg:mb-0" style={{ filter: 'drop-shadow(0px 4px 4px rgba(1, 1, 1, 1.1))' }}>
  <img src={Beyonist} alt="Beyonist" className="rounded-lg" />
</div>



      {/* Right side: Career Content */}
      <div className="lg:w-1/2 lg:pl-8">
      <h2 className="text-3xl lg:text-4xl text-pink-500 font-bold">Beyonist</h2>
      <br/>
     <p>
     We champion the extraordinary in every person. Our mission is not just to enhance your appearance but to empower, uplift, and celebrate the unique beauty within you. We believe that true beauty is not confined to external features; it radiates from confidence, kindness, and the authenticity that makes you, you.
     </p>
     <br/>
     <p>
     Beyonist is a beauty and skincare brand, collaborated to create a stunning lifestyle. At Beyonist, we believe real beauty is the root of holistic well-being. Our brand is dedicated to craft premium skincare products. Our products not only enhance the outlooks, but also nourishes the skin. Beyonist assures your investment, as this brand is aligned with transformative growth. We are composed to enamour the beauty and health market. Our perfectly formulated products serve the consumers evolving their needs. We also ensure long lasting satisfaction for our consumers. As an investor, rest assured that Beyonist is not just a brand, it is a flourishing venture with promising returns. Hence join us in our journey to redefine health and beauty.
     <div className="flex items-center mt-4">
        {/* Instagram Icon */}
        <Link to="https://www.instagram.com/beyonist.in/">
        <FaInstagram className="text-3xl mr-4 text-pink-600" />
        </Link>

        {/* YouTube Icon */}
        <Link to="https://www.youtube.com/@Beyonistt">
        <FaYoutube className="text-3xl mr-4 text-red-600" />
        </Link>
   
        {/* Order Icon */}
        <Link to="https://beyonist.com/">
        <FaShoppingCart className="text-3xl text-green-600" />
        </Link>
      </div>
     </p>
      </div>
      </div>
      <br/>
      <br/>

      { /* RB Charity */ }
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center">
      {/* Left side: Career Image */}
      <div className="lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
      <h2 className="text-3xl lg:text-4xl text-green font-bold ">RB Charity Foundations</h2>
      <br />
      <p>
      RB Corp's charitable initiative is dedicated to uplifting and empowering marginalized communities across India. Through a multifaceted approach, this initiative aims to address the fundamental needs of individuals who are less educated or illiterate, as well as housewives and widows facing societal constraints. 
      </p>
      <br />
      <p>
      RB Corp's Charity is a compassionate initiative aimed at empowering individuals in need through education and support. Through our partnership with "Service Connect," we offer tailored training programs to individuals who may be less educated, illiterate, housewives, widows facing societal restrictions, and others seeking a more secure future. Those who successfully complete these training programs receive certificates,
      <div className="flex items-center mt-4">
        {/* Instagram Icon */}
        <Link to="https://www.instagram.com/charityfoundationrb?igsh=MTA3ZXBpaTFrbzI1cA==">
        <FaInstagram className="text-3xl mr-4 text-green" />
        </Link>

        {/* YouTube Icon */}
        <Link to="https://www.youtube.com/@Beyonistt">
        <FaYoutube className="text-3xl mr-4 text-red-600" />
        </Link>
   
        {/* Order Icon */}
        <Link to="https://www.rbcharityfoundation.org/charity.html">
        <BsBrowserChrome className="text-3xl mr-4 text-red-600" />
        </Link>
      </div>
      </p>
      </div>

      {/* Right side: Career Content */}
      <div className="lg:w-1/2 lg:pl-8">
        <img src={charity} />
      </div>
    </div>
    <br/>
    <br/>

    { /* RB Finance */ }
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center">
      {/* Left side: Career Image */}
      <div className="lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
        <img src={Finance} className="rounded-full w-106 h-96"/>
      </div>

      {/* Right side: Career Content */}
      <div className="lg:w-1/2 lg:pl-8">
      <h2 className="text-3xl lg:text-4xl text-pink-500 font-bold">RB <span className="text-white">Finance</span></h2>
      <br/>
     <p>
       At RB Finance, we're dedicated to empowering individuals worldwide to achieve financial success through secure and rewarding investments. With years of experience in the financial industry, we pride ourselves on offering transparent, tailored investment solutions designed to meet the diverse needs of our clients.
     </p>
     <br/>
     <p>
       RB Finance app endeavors to solve the challenges faced by the residents of the whole world in the field of investment and financial management. Promoting financial literacy and providing a secure platform for investments are important steps toward fostering a culture of responsible financial planning.
 
       Highlighting secure and encrypted bank-to-bank transactions is important to ensure users the security of their financial transactions. This not only builds trust but also aligns with the growing importance of cyber security in the digital age.
     </p>
     <br/>
     <p>
       How does the RB Finance app work?
 
      RB Finance App boasts a user-friendly interface, making it easy for users to navigate and access various features. Users can choose from a variety of investment plans tailored to meet their financial goals. RB Finance stands out by offering an impressive 40% return on investments, surpassing traditional banks.
     <div className="flex items-center mt-4">
        {/* Instagram Icon */}
        <Link to="https://www.instagram.com/rbfinanceapp?igsh=MTc1ODNhbGVhY2xmNg==">
        <FaInstagram className="text-3xl mr-4 text-pink-600" />
        </Link>

        {/* YouTube Icon */}
        <Link to="https://www.youtube.com/@Beyonistt">
        <FaYoutube className="text-3xl mr-4 text-red-600" />
        </Link>
   
        {/* Order Icon */}
        <Link to="https://rbfinanceapp.com/">
        <BsBrowserChrome className="text-3xl text-green-600" />
        </Link>
      </div>
     </p>
      </div>
      </div>
      <br/>
      <br/>

      <div className="container mx-auto">
  <h2 className="md:text-3xl text-4xl text-center font-bold leading-snug py-5">
    Job <span className="text-green">Vacancy</span>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {jobs.slice(currentIndex, currentIndex + 3).map(job => (
      <div key={job._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <img src={job.logoUrl} alt={job.title} className="mx-auto" />
        <h3 className="text-green font-bold text-center py-5">{job.title}</h3>
        <p className="text-center">{job.description}</p>
        <div className="flex justify-center">
          <div className="mt-5">
            <Link to="/apply">
              <button className="btn me-2 w-24 bg-grey text-white">Apply</button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className="mt-4">
    <div className="flex justify-center">
      <button className="btn me-2 bg-green text-white" onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
      <button className="btn me-2 w-24 bg-green text-white" onClick={handleNext} disabled={currentIndex >= jobs.length - 3}>Next</button>
    </div>
  </div>
</div>
<br/>
<br/>
    </>
    
   )
}
export default Careers;
