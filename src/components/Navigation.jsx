import { Link } from "react-router-dom";

export const demos = [
    {
        title: "Playground",
        image: "playground.png",
        path: "/playground",
    },
    {
        title: "Scented Widgets",
        image: "scented-widgets.png",
        path: "/scented-widgets",
    },
    {
        title: "Phosphor Objects",
        image: "phosphor-objects.png",
        path: "/phosphor-objects",
    },
    {
        title: "Data Distribution",
        image: "data-distribution.png",
        path: "/data-distribution",
    },
    {
        title: "Vega Integration",
        image: "vega-example.png",
        path: "/vega-example",
    },
    {
        title: "Dynamic Query Widgets",
        image: "dynamic-query-widgets-homefinder.png",
        path: "/dynamic-query-widgets-homefinder",
    },
    {
        title: "Widgets to Visualization one-way",
        image: "widgets-to-vis-one-way.png",
        path: "/widgets-to-vis-one-way",
    },
    {
        title: "Visualization to Widgets one-way",
        image: "vis-to-widgets-one-way.png",
        path: "/vis-to-widgets-one-way",
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
