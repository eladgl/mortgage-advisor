import React from "react";
import * as access from "@access";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import firstImage from '../assets/images/first.jpg';
import secondImage from '../assets/images/second.jpg';
import thirdImage from '../assets/images/third.jpg';

const HomePage = () => {
  return (
    <div >
    <div id="carouselExampleCaptions" className="carousel slide pb-28 pt-14 px-14" data-bs-ride="carousel" >
    <h1 className="text-4xl text-center text-black font-bold">ברוכים הבאים לאתר שלנו</h1>
    <div className='flex flex-col mt-8  '>
    <h1 className="text-4xl text-center text-black font-bold">שרון מור - 207470329</h1> 
    <h1 className="text-4xl text-center text-black font-bold">אלעד גולדנברג - 11111111</h1> 
    </div> 
  

    <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div className="carousel-inner mt-48">
        <div className="carousel-item active">
            <img src={firstImage} className="d-block w-100 h-96 scale-y-150" alt="..."/>
        </div>
        <div className="carousel-item">
            <img src={secondImage} className="d-block w-100 h-96 scale-y-150" alt="..."/>
        </div>
        <div className="carousel-item">
            <img src={thirdImage} className="d-block w-100 h-96 scale-y-150" alt="..."/>
        </div>
    </div>
    <button className="carousel-control-prev mt-72 scale-150  " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button className="carousel-control-next  mt-72 scale-150 " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    </button>
</div>

    </div>
  );
};

export default HomePage;
