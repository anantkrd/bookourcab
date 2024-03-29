import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class Footer extends Component {
    state = {  }
    render() { 
        return(<footer id="footer">

        <div className="footer-top">
          <div className="container">
            <div className="row">
    
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>Address</h3>
                <p>
                  BookOurCar <br/>
                  Shree Vishal Chs Ltd. PlotNo 17<br/>
                  Sector -18 Koperkhairane New Mumbai. <br/><br/>
                  <strong>Mobile:</strong> +919821224861,+918424927193<br/>
                  <strong>Landline:</strong>02249784787 <br/>
                  <strong>Email :</strong> bookourcar7193@gmail.com<br/>
                </p>
              </div>
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <a href="/Home">Home</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="/Servises">Services</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="/privacyPolicy">Pravacy Policy</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="/Aboutus">About Us</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="/termCondition">Term & Condition</a></li>
                </ul>
              </div>
    
            </div>
          </div>
        </div>
    
        <div className="container d-md-flex py-4">
    
          <div className="mr-md-auto text-center text-md-left">
            <div className="copyright">
              &copy; Copyright <strong><span>BookOurCar</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="#">Ellipse Software Technology</a>
            </div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
            <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
            <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
            <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
            <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
            <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
          </div>
        </div>
      </footer>
      );
    }
}
 
export default withRouter(Footer);