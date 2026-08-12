import Navigation from "../components/Navigation";

export default function HomePage() {
    const logoUrl = `${import.meta.env.BASE_URL}assets/images/logo-dark.png`;

    return (
        <div className="home-page">
            <header className="showcase-intro">
            </header>

            <section className="showcase-demos" aria-labelledby="demos-title">
                <Navigation />
            </section>
        </div>
    );
}
