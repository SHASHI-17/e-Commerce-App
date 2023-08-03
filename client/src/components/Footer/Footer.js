import React from 'react'
import {BsInstagram ,BsFacebook,BsTwitter} from 'react-icons/bs'
import {HiOutlineMail} from "react-icons/hi";
import credit from "../../assets/creditcardicons.png"

import "./Footer.scss"
function Footer() {
  return (
    <div className='Footer'>
        <div className="container">
          <div className="content">
          <div className="footer-left">
            <h3 className="title">FOLLOW US</h3>
            <ul className="follow">
              <li className="hover-link center"><BsInstagram/></li>
              <li className="hover-link center"><BsFacebook/></li>
              <li className="hover-link center"><BsTwitter/></li>
              <li className="hover-link center"><HiOutlineMail/></li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">Company</h3>
            <ul className="company">
              <li className="hover-link">Contact Us</li>
              <li className="hover-link">Privacy Policy</li>
              <li className="hover-link">Returns And Exchange Policy</li>
              <li className="hover-link">Terms & Conditions</li>
            </ul>
          </div>
          </div>

          <div className="subfooter center">
            <div className="credit-card-img">
              <img src={credit} alt="" />
            </div>
            <p>Copyright {new Date().getFullYear()} © <strong>Posterz.</strong></p>
          </div>
        </div>
    </div>
  )
}

export default Footer