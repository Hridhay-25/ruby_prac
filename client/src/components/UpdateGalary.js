
import UpdateCard from "./UpdateCard";
const UpdateGallery = ({list,setCardList,setFormData}) => {
    return (
        <div className="flex flex-wrap">
            {list.data.map((ele)=>(<UpdateCard key={ele.objectid}
             image={ele.imageurl} 
             title={ele.title} 
             info={ele.info} 
             setCardList={setCardList}
             objectid ={ele.objectid}
             setFormData={setFormData} />))} 
        </div>
    )
}
export default UpdateGallery;