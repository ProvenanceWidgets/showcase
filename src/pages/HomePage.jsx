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
            </header>

            <hr />

            <section className="showcase-demos" aria-labelledby="demos-title">
                <h2 id="demos-title">Showcase</h2>
                <Navigation />
            </section>
        </div>
    );
}
