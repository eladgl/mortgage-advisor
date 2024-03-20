import React from "react";

import styled from 'styled-components';
import { LeftArrow } from "../components/arrows";
import { TailWindLink } from "../components/link";

const Wrapper = styled.div`
  padding: 1.5rem;
  height: 100%;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    padding: 0 2rem;
    margin-top:  0 2rem;;
    margin-bottom:  0 2rem;;
  }
`;

const ChosenTitles = styled.h1`
    font-size: 25px;
    font-weight: 700;
    color: green;
`;

const AlertLabel = styled.h1`
    font-size: 16px;
    font-weight: 700;
    color: red;
    margin-top: 3rem;
`;

const TitleBorderDiv = styled.div`
    border-bottom: 5px solid grey;

`


const FewLoans = () => {
    return (
        <Wrapper>
            <TitleBorderDiv>
            <h3 className="pt-4">מעוניין לקחת הלוואה רגילה</h3>
            <h3>מעוניין לקחת הלוואה עד 100 אלף ש"ח</h3>
            <ChosenTitles>אני מעוניין לקחת כמה הלוואות</ChosenTitles>
            </TitleBorderDiv>
            <div>
                <AlertLabel>אין לך אפשרות לקחת כמה הלוואות עבור סכום הקטן מ100 אלף ש"ח</AlertLabel>
                <p style={{fontWeight: '700', fontSize:'1.6rem'}} >אופציות אחרות</p>
                <div className="grid grid-cols-4 grid-rows-1 gap-4" style={{ margin: '3rem 0 -3rem 0'}}>
                    <p>הגשת בקשה <br />פרטנית בבנק</p>
                    <p>הבנק בודק את<br />הבקשה</p>
                    <p>החלטה של הבנק<br />האם לאשר<br />הלוואה פרטנית</p>
                </div>
                <LeftArrow />
                <p>מחפש עזרה בתהליך? <TailWindLink href="/contact">פנה אלינו לפרטים</TailWindLink></p>
                <p style={{fontWeight: '700', fontSize:'1.6rem'}} >עלויות משוערות</p>
                <p>פתיחת בקשה פרטנית: 500 ש"ח</p>
            </div>
        </Wrapper>
    )
};

export default FewLoans;