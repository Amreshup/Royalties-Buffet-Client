import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/ThemeContext';

const categoryItems = [
    { id: 1, title: "Break Fast", description: "(08 breakfast)", image: "https://static.vecteezy.com/system/resources/previews/022/687/311/original/coffee-cup-3d-realistic-free-download-free-png.png" },
    { id: 3, title: "Lunch", description: "(09 lunch items)", image: "https://linguini.akamaized.net/starchef2_website/IndianStation_0004_chole_bhatura.png" },
    { id: 2, title: "Dinner", description: "(11 dishes)", image: "https://png.pngtree.com/png-clipart/20230623/original/pngtree-schezwan-fried-rice-png-image_9205434.png" },
    { id: 4, title: "Browse All", description: "(255 Items)", image: "https://www.pngkey.com/png/full/254-2544620_dalchini-veg-thali-veg-thali-images-hd.png" }
];

const Catagories = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16 ${isDarkMode ? 'dark' : ''}`}>
            <div className='text-center'>
                <p className='subtitle'>Customer Favorites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>

            {/* category cards */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
                {
                    categoryItems.map((item, i) => (
                        <Link key={i} to="/menu">
                            <div className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                                <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28' /></div>
                                <div className='mt-5 space-y-1'>
                                    <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                                    <p className='text-secondary text-sm'>{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Catagories;
