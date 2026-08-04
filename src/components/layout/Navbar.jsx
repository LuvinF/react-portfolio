import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { close, logo, menu } from "../../assets";
import { navLinks } from "../../constants";
import { styles } from "../../styles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const homeSectionLinks = navLinks.map((link) => ({
    ...link,
    to: `/#${link.id}`,
  }));

  const desktopLinkClass = ({ isActive }) =>
    `text-[18px] font-medium transition hover:text-white ${
      isActive ? "text-white" : "text-secondary"
    }`;

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-5 transition-colors ${
        isScrolled ? "bg-primary/95 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src={logo} alt="Luvin Fernandes" className="h-9 w-9 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white">
            Luvin <span className="hidden sm:block">&nbsp;| AI Product Engineer</span>
          </p>
        </Link>

        <ul className="hidden list-none items-center gap-8 sm:flex">
          {homeSectionLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.to} className="text-[18px] font-medium text-secondary transition hover:text-white">
                {link.title}
              </Link>
            </li>
          ))}
          <li>
            <NavLink to="/services" className={desktopLinkClass}>
              Services
            </NavLink>
          </li>
        </ul>

        <div className="relative flex items-center sm:hidden">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <img src={isOpen ? close : menu} alt="" className="h-7 w-7 object-contain" />
          </button>

          {isOpen && (
            <div className="black-gradient absolute right-0 top-12 min-w-[150px] rounded-xl p-6 shadow-card">
              <ul className="flex list-none flex-col gap-4">
                {homeSectionLinks.map((link) => (
                  <li key={link.id}>
                    <Link to={link.to} className="font-medium text-secondary transition hover:text-white">
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <NavLink to="/services" className="font-medium text-secondary transition hover:text-white">
                    Services
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
