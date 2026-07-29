import Navigation from "../components/Navigation";

export default function HomePage() {
    const logoUrl = `${import.meta.env.BASE_URL}assets/images/logo-dark.png`;

    return (
        <div className="home-page">
            <header className="showcase-intro">
                <h1>
                    <img src={logoUrl} alt="" />
                    <span>ProvenanceWidgets</span>
                    <span className="showcase-intro__divider">|</span>
                    <span className="showcase-intro__muted">Showcase</span>
                </h1>
                <p className="showcase-intro__tagline">
                    A JavaScript Library of UI Controls to Track and Dynamically
                    Overlay Analytic Provenance
                </p>
                <div className="showcase-intro__credits">
                    <p>
                        Arpit Narechania, Kaustubh Odak, Mennatallah El-Assady,
                        Alex Endert
                    </p>
                    <p>Georgia Institute of Technology and ETH Zürich</p>
                </div>
                <div className="showcase-intro__actions">
                    <a
                        className="showcase-button showcase-button--github"
                        href="https://github.com/ProvenanceWidgets/showcase"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.28-1.28-5.28-5.69 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.94 10.94 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.4-5.29 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.55A11.5 11.5 0 0 0 12 .7Z"
                            />
                        </svg>
                        View on GitHub
                    </a>
                    <a
                        className="showcase-button showcase-button--docs"
                        href="https://provenancewidgets.github.io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Homepage and Documentation
                    </a>
                </div>
            </header>

            <hr />

            <section className="showcase-demos" aria-labelledby="demos-title">
                <h2 id="demos-title">Showcase</h2>
                <Navigation />
            </section>
        </div>
    );
}
