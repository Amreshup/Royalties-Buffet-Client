
import React, { useState } from 'react';
import axios from 'axios';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://royalties-buffet-server.onrender.com/message", { name, email, message });
      alert('Message sent successfully');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name" required  value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="message">
                Message
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Enter your message" required  value={message} onChange={(e) => setMessage(e.target.value)}/>
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Send
            </button>
        </div>
    </form>
</div>
</>
  );
  }
export default Contact;
