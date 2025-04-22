

const UpdateForm = ({ setCardList, formData, setFormData }) => {
  const getToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("There is no token");
      }
      return token;
    }
    catch (error) {
      console.log(error);
    }
  }
  const update_data = async ()=>{
    const token = getToken();
    const payload = await fetch(`http://localhost:5000/places/${formData.objectid}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body:JSON.stringify({place:{title:formData.title, objectid:formData.objectid,info:formData.info,imageurl:formData.imageUrl}})
    });
    if(payload.ok){
      setCardList((state)=>{
        let new_array = state.data;
        new_array = new_array.filter(ele => ele.objectid !== formData.objectid);
        const new_state = { data: [...new_array,{title:formData.title, objectid:formData.objectid,info:formData.info,imageurl:formData.imageUrl}]}
        return (new_state);
      })
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update_data();
    console.log('Submitted Data:', formData);
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

export default UpdateForm;
