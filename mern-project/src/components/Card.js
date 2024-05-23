import React from 'react'

export default function Card(props) {
let options = props.foodOptions;
let priceOptions = Object.keys(options);


    return (
        <div className="card mt-3" style={{ "width": "18rem" }}>
            <img className="card-img-top" src={props.img} alt="Card cap" style={{"maxHeight": "360px"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.foodName}</h5>
                {/* <p className="card-text">Example Text</p> */}
                <select className='m-2 h-100 bg-succes'>
                    {Array.from(Array(6), (e, i) => {
                        return (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        )
                    })}
                </select>
                <select className='m-2 h-100 bg-succes'>
                    {
                        priceOptions.map((data)=>{
                            return <option key={data} value={data}>{data}</option>
                        })
                    }
                </select>
                <div className='d-inline h-100 fs-5'>
                    Price
                </div>
            </div>
        </div>
    )
}
