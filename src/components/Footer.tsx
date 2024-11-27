import Toggle from "../components/Toggle";
import "../styles/Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="github">
        <a href="https://github.com/kaanguru/emirler-app" target="_blank">
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
      </div>
      <Toggle />
    </footer>
  );
};

export default Footer;
