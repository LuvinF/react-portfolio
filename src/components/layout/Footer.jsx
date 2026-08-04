import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-white/10 px-6 py-8 sm:px-16">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-secondary sm:flex-row">
      <p>© {new Date().getFullYear()} Luvin Fernandes. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <Link to="/" className="transition hover:text-white">
          Portfolio
        </Link>
        <Link to="/services" className="transition hover:text-white">
          Services
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
