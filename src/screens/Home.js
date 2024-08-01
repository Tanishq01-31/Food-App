import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
// import Carousel from '../components/Carousel'

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/dispdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: "1" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit" style={{ marginLeft: "10px" }}>Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://picsum.photos/900/700?random=1"
                className="d-block w-100 h-100"
                alt="random"
                style={{ maxHeight: "475px", objectFit: "cover" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://picsum.photos/900/700?random=2"
                className="d-block w-100 h-100"
                alt="random"
                style={{ maxHeight: "475px", objectFit: "cover" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://picsum.photos/900/700?random=3"
                className="d-block w-100 h-100"
                alt="random"
                style={{ maxHeight: "475px", objectFit: "cover" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row">
                <div key={data._id} className="fs-1 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterData) => {
                      return (
                        <div key={filterData._id} className="col-md-4 mb-3">
                          <Card
                            foodItem={filterData}
                            foodOptions={filterData.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>Empty</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Empty</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
