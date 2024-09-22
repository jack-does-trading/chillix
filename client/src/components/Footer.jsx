import logo from "../assets/images/logo1.png";

const Footer = () => {
    return (<>
        <div className="footer mt-5">
            <div className="container pt-4">
                <div className="col-md-2">
                    <ul>
                        <a><li>FAQ</li></a>
                        <a><li>Privacy</li></a>
                        <a><li>Terms of Service</li></a>
                    </ul>
                </div>
                <div className="col-md-2">
                    <ul>
                        <a><li>Help Center</li></a>
                        <a><li>Jobs</li></a>
                        <a><li>Legal Notices</li></a>
                    </ul>
                </div>
                <div className="col-md-2">
                    <ul>
                        <a><li>Account</li></a>
                        <a><li>My List</li></a>
                        <a><li>Contact Us</li></a>

                    </ul>
                </div>
                <div className="imgWrapper logo ml-3 col-md-5">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <p className="pt-4">All rights reserved Chill.tv©2024 </p>
        </div>
    </>)
}

export default Footer;