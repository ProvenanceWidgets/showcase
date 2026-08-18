import { useEffect, useState } from "react";

export default function useJsonData(filename) {
    const [state, setState] = useState({
        data: null,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();
        const url = `${import.meta.env.BASE_URL}assets/data/${filename}`;

        fetch(url, { signal: controller.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => setState({ data, error: null }))
            .catch(error => {
                if (error.name !== "AbortError") {
                    setState({ data: null, error });
                }
            });

        return () => controller.abort();
    }, [filename]);

    return state;
}
