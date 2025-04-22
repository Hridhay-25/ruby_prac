import React from 'react';

const UpdateCard = ({ image, title, info, objectid, onEdit, setCardList, setFormData }) => {
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
    const delete_card = async () => {
        try {
            const token = getToken();
            const payload = await fetch(`http://localhost:5000/places/${objectid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (payload.ok) {
                setCardList((state) => {
                    let new_array = state.data;
                    const new_state = { data: new_array.filter(ele => ele.objectid !== objectid) }
                    return (new_state)
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const edit_card = () => {
        try {
            setFormData({ title: title, objectid: objectid, info: info, imageUrl: image });
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="h-[300px] w-[17vw] border rounded-lg border-gray-300 shadow-lg m-2 flex flex-col justify-between overflow-hidden">
            <div
                className="h-[200px] w-full bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="p-2 flex flex-col justify-between h-full">
                <div>
                    <h1 className="font-bold text-lg">{title}</h1>
                    <p className=" text-sm text-gray-600">{info}</p>
                </div>

                <div className="flex justify-end space-x-2 mt-3">
                    <button
                        onClick={edit_card}
                        className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={delete_card}
                        className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCard;