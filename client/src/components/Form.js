import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const Form = ({setCardList}) => {
  const [formData, setFormData] = useState({
    title: '',
    info: '',
    objectId: '',
    imageUrl: '',
    user_id:'',
  });

  const addPhoto = async ()=>{
    try{
      const token = localStorage.getItem('token');
      if(!token){
        throw new Error("There is no token");
      }
      const decoded = jwtDecode(token);
      const payload = await fetch("http://localhost:5000/places",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({place:{objectid:formData.objectId,
          title:formData.title,
          info:formData.info,
          imageurl:formData.imageUrl,
          user_id:decoded.user_id
        }})
      });
      if(payload.ok){
        setFormData(prev=>({...prev,user_id:decoded.user_id}))
        setCardList((prev)=>[...prev,formData]);
        setFormData({
          title: '',
          info: '',
          objectId: '',
          imageUrl: '',
          user_id: '',
        });
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    addPhoto();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Create Item</h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Info</label>
        <textarea
          name="info"
          value={formData.info}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Object ID</label>
        <input
          name="objectId"
          type="text"
          value={formData.objectId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Image URL</label>
        <input
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
