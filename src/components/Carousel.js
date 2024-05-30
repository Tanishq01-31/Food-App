import React from 'react'
// import { Carousel } from 'bootstrap';

export default function Carousel() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className='carousel-caption' style={{zIndex:"1",display: "flex", alignItems: "center", justifyContent: "center" }}>
          <form className="form-inline">
            <input className="form-control mr-sm-2 d-inline flex-grow-1" type="search" placeholder="Search" aria-label="Search" style={{ width: "53rem" }}/>
            <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit" style={{marginLeft : "10px"}}>Search</button>
          </form>
        </div>
        <div className="carousel-item active">
          <img src="https://source.unsplash.com/random/900x700" className="d-block w-100 h-100" alt="random" style={{ maxHeight: "475px", objectFit: "cover" }} />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700" className="d-block w-100 h-100" alt="random" style={{ maxHeight: "475px", objectFit: "cover" }} />
        </div>
        <div className="carousel-item">
          <img src="https://source.unsplash.com/random/900x700" className="d-block w-100 h-100" alt="random" style={{ maxHeight: "475px", objectFit: "cover" }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
