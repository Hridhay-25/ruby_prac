import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UpdateGallery from "../components/UpdateGalary";
import UpdateForm from "../components/UpdateForm";
const Update = () => {
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        info: '',
        imageUrl: '',
        objectid:''
      });
    const getToken = () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("There is no token");
            }
            const decoded = jwtDecode(token);
            return decoded;
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const payload = await fetch("http://localhost:5000/places");
                if (!payload.ok) {
                    throw new Error("Issue in fetch request");
                }
                const data = await payload.json();
                const user_data = getToken();
                const new_data = data.data.filter(ele=>ele.user_id===user_data.user_id);
                setCardList({data:new_data});
                setLoading(false);
            }
            catch (error) {
                setError(true);
                setLoading(false);
                console.log(error);
            }
        }
        fetchdata();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <div className="h-[100px] bg-blue-500 flex justify-between">
                <h1 className="text-white m-auto text-6xl">Gallery</h1>
                <a href="/home" className="text-white m-auto bg-green-900 h-[50px] w-[6vw] px-[1vw] py-[12px] rounded-lg">Home</a>
            </div>
            <div className="min-h-[700px] flex p-[20px]">
                <div className="w-[60vw]  min-h-[100px]">
                    <UpdateGallery list={cardList} setCardList={setCardList} setFormData={setFormData} />
                </div>
                <div className="w-[40vw] h-[200px]">
                    <UpdateForm setCardList={setCardList} formData={formData} setFormData={setFormData} />
                </div>
            </div>
        </div>
    );
};
export default Update;