import { Link } from "react-router-dom";

const demos = [
    {
        title: "Playground",
        description: "Explore the complete set of provenance-aware UI controls.",
        image: "playground.png",
        path: "/playground",
        available: true,
    },
    {
        title: "Widgets to Visualization",
        description: "See widget interactions update a visualization.",
        image: "widgets-to-vis-one-way.png",
        path: "/widgets-to-vis",
    },
    {
        title: "Visualization to Widgets",
        description: "Drive widget state directly from visualization interactions.",
        image: "vis-to-widgets-one-way.png",
        path: "/vis-to-widgets",
    },
    {
        title: "Vega Integration",
        description: "Connect provenance-aware controls to a Vega visualization.",
        image: "vega-example.png",
        path: "/vega-example",
    },
    {
        title: "Dynamic Query Widgets",
        description: "Find homes using coordinated dynamic query controls.",
        image: "dynamic-query-widgets-homefinder.png",
        path: "/homefinder",
    },
    {
        title: "Phosphor Objects",
        description: "Inspect provenance embedded in interactive visual objects.",
        image: "phosphor-objects.png",
        path: "/phosphor-objects",
    },
    {
        title: "Scented Widgets",
        description: "Augment controls with visual cues about the underlying data.",
        image: "scented-widgets.png",
        path: "/scented-widgets",
    },
    {
        title: "Data Distribution",
        description: "Explore coordinated provenance across a rich analytic view.",
        image: "data-distribution.png",
        path: "/data-distribution",
    },
];

function DemoCard({ demo }) {
    const imageUrl = `${import.meta.env.BASE_URL}assets/images/${demo.image}`;
    const content = (
        <>
            <div className="demo-card__image-wrap">
                <img
                    className="demo-card__image"
                    src={imageUrl}
                    alt=""
                />
            </div>
            <div className="demo-card__content">
                <div className="demo-card__heading">
                    <h3>{demo.title}</h3>
                    <span
                        className={`status-badge${
                            demo.available ? " status-badge--ready" : ""
                        }`}
                    >
                        {demo.available ? "Available" : "Coming soon"}
                    </span>
                </div>
                <p>{demo.description}</p>
            </div>
        </>
    );

    if (demo.available) {
        return (
            <Link
                className="demo-card demo-card--link"
                to={demo.path}
                aria-label={`Open ${demo.title}`}
            >
                {content}
            </Link>
        );
    }

    return (
        <article className="demo-card demo-card--disabled" aria-disabled="true">
            {content}
        </article>
    );
}

export default function HomePage() {
    const logoUrl = `${import.meta.env.BASE_URL}assets/images/logo-dark.png`;

    return (
        <div className="home-page">
            <section className="hero" aria-labelledby="showcase-title">
                <div className="hero__eyebrow">Interactive demo collection</div>
                <h1 id="showcase-title">
                    <img src={logoUrl} alt="" />
                    ProvenanceWidgets
                    <span>Showcase</span>
                </h1>
                <p className="hero__summary">
                    A JavaScript library of UI controls for tracking and
                    dynamically overlaying analytic provenance.
                </p>
                <p className="hero__authors">
                    Arpit Narechania, Kaustubh Odak, Mennatallah El-Assady,
                    and Alex Endert
                </p>
                <p className="hero__institutions">
                    Georgia Institute of Technology and ETH Zürich
                </p>
                <div className="hero__actions">
                    <a
                        className="button button--secondary"
                        href="https://github.com/ProvenanceWidgets/showcase"
                        target="_blank"
                        rel="noreferrer"
                    >
                        View on GitHub
                    </a>
                    <a
                        className="button button--primary"
                        href="https://provenancewidgets.github.io"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Homepage and documentation
                    </a>
                </div>
            </section>

            <section className="showcase-section" aria-labelledby="demos-title">
                <div className="section-heading">
                    <div>
                        <p className="section-heading__eyebrow">Examples</p>
                        <h2 id="demos-title">Explore the showcase</h2>
                    </div>
                    <p>
                        Demos are being migrated to the ProvenanceWidgets V2
                        component library.
                    </p>
                </div>
                <div className="demo-grid">
                    {demos.map((demo) => (
                        <DemoCard demo={demo} key={demo.path} />
                    ))}
                </div>
            </section>
        </div>
    );
}
