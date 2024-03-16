import React from "react";

import styled from "styled-components";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CarouselImage = styled.img`
    content: '';
    width: auto;
    height: 400px;
`;

const CarouselWrapper = styled.div`
    width: 50%;
    height: 50%;
    justify-content: center;
    margin: 0 auto;
    align-items: center;
`;

const Carousel = ({ images }) => {

    const renderButtons = () => {
        return images.map((_, index) => {
            return (
                <button
                    key={`button-${index}`}
                    className={`${index === 0 ? 'active' : ''}`}
                    aria-current={index === 0 ? 'true' : 'false'}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    aria-label={`Slide ${index}`} />
            );
        });
    };

    const renderImgs = () => {
        return images.map((image, index) => {
            return (
                <div key={`${image}-${index + 1}`} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <CarouselImage className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                </div>
            );
        });
    }

    return (
        <CarouselWrapper>
            <div id="carouselExampleCaptions" className="carousel slide pb-28 pt-14 px-14" data-bs-ride="carousel">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators mt-15">
                        {renderButtons()}
                    </div>
                    <div className="carousel-inner">
                        {renderImgs()}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </CarouselWrapper>
    );
};

export default Carousel;
