import logo from "../../../assets/logo.png"

const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-black text-white">
                <div>
                    <img className="w-24 h-24" src={logo} alt="" />
                    <p>GameChamp Academy Ltd.<br />Providing nice teaching since 2014</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Fitness and Conditioning</a>
                    <a className="link link-hover">Sports Specific Clinics</a>
                    <a className="link link-hover">Summer Sports Camps</a>
                    <a className="link link-hover">Tournament Organization
                    </a>
                </div>
                <div>
                    <span className="footer-title">Contact</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Summer Sports Camps</a>
                    <a className="link link-hover">Press kit</a>
                </div>
                <div>
                    <span className="footer-title">Address</span>
                    <p>2500 W Memorial Rd, <br /> Oklahoma City, <br /> OK 73134, USA</p>
                </div>
            </footer>
            <footer className="footer footer-center p-4 bg-black text-gray-400">
                <div>
                    <p>Copyright © 2023 - All right reserved by GameChamp Academy Ltd</p>
                </div>
            </footer>
        </div>

    );
};

export default Footer;