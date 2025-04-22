import React from 'react';

const Card = ({ image, title, info }) => {
    return (
        <div>
            <div className="h-[270px] w-[17vw] border-[1px] rounded-lg border-gray-600 shadow-lg m-[5px]">
                <div className="h-[200px] w-full bg-cover rounded-t-lg" style={{ backgroundImage: `url(${image})` }}>
                </div>
                <div className="p-1 h-full ">
                    <h1 className="font-black">{title}</h1>
                    <p className="truncate overflow-hidden whitespace-nowrap">{info}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
