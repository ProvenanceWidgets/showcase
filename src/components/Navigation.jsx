import { Link } from "react-router-dom";

const demos = [
    {
        title: "Playground",
        image: "playground.png",
        path: "/playground",
    },
    {
        title: "Scented Widgets",
        image: "scented-widgets.png",
    },
    {
        title: "Phosphor Objects",
        image: "phosphor-objects.png",
    },
    {
        title: "Data Distribution",
        image: "data-distribution.png",
    },
    {
        title: "Vega Integration",
        image: "vega-example.png",
    },
    {
        title: "Dynamic Query Widgets",
        image: "dynamic-query-widgets-homefinder.png",
    },
    {
        title: "Widgets to Visualization one-way",
        image: "widgets-to-vis-one-way.png",
    },
    {
        title: "Visualization to Widgets one-way",
        image: "vis-to-widgets-one-way.png",
    },
];

function DemoCard({ demo }) {
    const imageUrl = `${import.meta.env.BASE_URL}assets/images/${demo.image}`;
    const content = (
        <>
            <h3>{demo.title}</h3>
            <img src={imageUrl} alt={`${demo.title} demo`} />
        </>
    );

    if (demo.path) {
        return (
            <Link className="demo-card" to={demo.path}>
                {content}
            </Link>
        );
    }

    return <div className="demo-card">{content}</div>;
}

export default function Navigation() {
    return (
        <nav className="demo-grid" aria-label="Showcase demos">
            {demos.map((demo) => (
                <DemoCard demo={demo} key={demo.title} />
            ))}
        </nav>
    );
}
