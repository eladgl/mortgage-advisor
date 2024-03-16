import React from "react";
import { Link  } from "react-router-dom";

import styled from "styled-components";

import logo from '../assets/images/logo.png';

const FooterDiv = styled.footer`
    background-color: #333;
    padding: 5rem 0;
    font-size: 1.4rem;
    color: #f7f7f7; 
    z-index: 0;

  .footer__logo-box {
    text-align: center;
    margin-bottom: 8rem; }
  .footer__logo {
    width: 15rem;
    height: auto; }
  .footer__navigation {
    border-top: 1px solid #777;
    padding-top: 2rem;
    display: inline-block; }
  .footer__list {
    list-style: none; }
  .footer__item {
    padding-left: 1rem;
    display: inline-block; }
    .footer__item:not(:last-child) {
      margin-right: 1.5rem; }
  .footer__link:link, .footer__link:visited {
    color: #f7f7f7;
    background-color: #333;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    transition: all .2s; }
  .footer__link:hover, .footer__link:active {
    color: #55c57a;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
    transform: rotate(5deg) scale(1.3); }
  .footer__copyright {
    border-top: 1px solid #777;
    padding-top: 2rem;
    width: 80%;
    float: right; }

    .row {
  max-width: 114rem;
  margin: 0 auto; }
  .row:not(:last-child) {
    margin-bottom: 8rem; }
  .row::after {
    content: "";
    display: table;
    clear: both; }
  .row [class^="col-"] {
    float: left; }
    .row [class^="col-"]:not(:last-child) {
      margin-right: 6rem; }
  .row .col-1-of-2 {
    width: calc((100% - 6rem) / 2); }
`;

const Footer = () => {
    return (
        <FooterDiv className="footer">
            <div className="footer__logo-box justify-center flex">
                <img src={logo} alt="Full logo" className="footer__logo" />
            </div>
            <div className="row">
                <div className="col-1-of-2">
                    <div className="footer__navigation">
                        <ul className="footer__list">
                            <li className="footer__item"><a to="#" className="footer__link">עלינו</a></li>
                            <li className="footer__item"><a to="contact" className="footer__link">צרו קשר</a></li>
                            <li className="footer__item"><a href="https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" target="_blank" className="footer__link">תקנון</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-2">
                    <p className="footer__copyright">
                        נבנה על ידי <a href="#" className="footer__link">אלעד גולדנברג ושרון מור</a> לקורס שלהם <a href="#" className="footer__link">מעבדה בתכנות צד שרת צד לקוח</a>.
                        זכויות יוצרים &copy; אלעד גולדנברג & שרון מור.
                    </p>
                </div>
            </div>
        </FooterDiv>
    );
};

export default Footer;