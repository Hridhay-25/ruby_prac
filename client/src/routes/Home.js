import { useEffect, useState } from "react";
import Gallery from "../components/Gallery";
import Form from "../components/Form";
const Home = () => {
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const payload = await fetch("http://localhost:5000/places");
                if (!payload.ok) {
                    throw new Error("Issue in fetch request");
                }
                const data = await payload.json();
                setCardList(data);
                setLoading(false);
            }
            catch (error) {
                setError(true);
                setLoading(false);
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
                <a href="/update" className="text-white m-auto bg-green-900 h-[50px] w-[6vw] px-[1vw] py-[12px] rounded-lg">Update</a>
            </div>
            <div className="min-h-[700px]  flex p-[20px]">
                <div className="w-[60vw]  min-h-[100px]">
                    <Gallery list={cardList}/>
                </div>
                <div className="w-[40vw] h-[200px]">
                    <Form setCardList={setCardList} />
                </div>
            </div>
        </div>
    );
};
export default Home;
