import React from "react";
import './footer.css';
const Footer = () => (
    <div className="footer">
        <p>&copy; {new Date().getFullYear()} Copyright: Alain Schaerer & Archit Aggarwal. Powered by  <a href="https://reactjs.org/">ReactJS</a> and <a href="https://react-bootstrap.github.io/">React-Bootstrap</a>.</p>
    </div>
);

export default Footer;