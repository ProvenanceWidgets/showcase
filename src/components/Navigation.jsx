import { Link, NavLink } from "react-router-dom";

const navigationItems = [
    { label: "Home", to: "/", end: true },
    { label: "Playground", to: "/playground" },
];

export default function Navigation() {
    const logoUrl = `${import.meta.env.BASE_URL}assets/images/logo-dark.png`;

    return (
        <header className="site-header">
            <div className="site-header__content">
                <Link className="site-brand" to="/" aria-label="Showcase home">
                    <img
                        className="site-brand__logo"
                        src={logoUrl}
                        alt=""
                    />
                    <span>ProvenanceWidgets</span>
                    <span className="site-brand__section">Showcase</span>
                </Link>
                <nav className="site-navigation" aria-label="Main navigation">
                    {navigationItems.map((item) => (
                        <NavLink
                            className={({ isActive }) =>
                                `site-navigation__link${isActive ? " is-active" : ""}`
                            }
                            end={item.end}
                            key={item.to}
                            to={item.to}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
