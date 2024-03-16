import React from "react";
import * as access from "@access";

import firstImage from '../assets/images/first.jpg';
import secondImage from '../assets/images/second.jpg';
import thirdImage from '../assets/images/third.jpg';
import styled from 'styled-components';

import Carousel from "../components/carousel";

const Heading = styled.h1`
    font-weight: 700;
    display: inline-block;
    background-image: linear-gradient(to right, #7ed56f, #28b485);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    letter-spacing: .1rem;
    transition: all .2s;
    text-align: center;
    justify-content: center;
    &:hover {
    transform: skewY(2deg) skewX(15deg) scale(1.1);
    text-shadow: 0.5rem 1rem 2rem rgba(0, 0, 0, 0.2); 
    }
`;



const HomePage = () => {
    return (
        <div>
            <h1 className="text-4xl text-center text-black font-bold pt-20">ברוכים הבאים לאתר שלנו</h1>
            <div className='flex flex-co-2 mt-8 justify-center gap-5 '>
                <Heading className="text-xl lg:text-4xl md:text-2xl">שרון מור - 207470329</Heading>
                <Heading className="text-xl md:text-2xl lg:text-4xl">אלעד גולדנברג - 315040519</Heading>
            </div>
            
            <Carousel images={[firstImage, secondImage, thirdImage]} />

        </div>
    );
};

export default HomePage;
