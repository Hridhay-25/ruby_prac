import Card from "./Card";
const Gallery = ({list}) => {
    return (
        <div className="flex flex-wrap">
            {list.data.map((ele)=>(<Card key={ele.objectid} image={ele.imageurl} title={ele.title} info={ele.info} />))} 
        </div>
    )
}
export default Gallery;