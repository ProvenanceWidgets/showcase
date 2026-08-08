import { Link } from "react-router-dom";

const githubUrl = "https://github.com/ProvenanceWidgets/showcase";
const websiteUrl = "https://provenancewidgets.github.io";

export default function SiteHeader() {
    const logoUrl =
        `${import.meta.env.BASE_URL}assets/images/logo-dark.png`;

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link className="site-header__brand" to="/">
                    <img src={logoUrl} alt="" />
                    <span className="site-header__name">ProvenanceWidgets</span>
                    <span className="site-header__section">Showcase</span>
                </Link>
                <nav className="site-header__actions" aria-label="External links">
                    <a
                        className="site-header__button site-header__button--website"
                        href={websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Website
                    </a>
                    <a
                        className="site-header__button site-header__button--github"
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.28-1.28-5.28-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.94 10.94 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.4-5.29 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .7Z"
                            />
                        </svg>
                        GitHub
                    </a>
                </nav>
            </div>
        </header>
    );
}
