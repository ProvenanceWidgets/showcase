/**
 * The provenance button closes its temporal view on document mousedown.
 * Interactions inside the same widget card must not be treated as outside
 * clicks while that view is open.
 */
export const keepOpenProvenanceView = event => {
    const temporalButton = event.currentTarget.querySelector(
        '.provenance-button[data-provenance-state="temporal"]',
    );

    if (temporalButton) {
        event.stopPropagation();
    }
};

/*
 * PrimeReact hides a dropdown after an option is chosen. The provenance
 * widget currently mirrors that native hide into "close temporal view".
 * Remember whether the hide was caused by an option inside that same view;
 * in that case retain the footprint state and reopen the updated option list.
 * Outside clicks and Escape still close it normally.
 */
const installDropdownPersistence = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return;
    }

    const installationKey = "__showcaseDropdownPersistenceInstalled";
    if (window[installationKey]) return;
    window[installationKey] = true;

    let interactionTarget = null;

    const getTarget = eventTarget => eventTarget
        ?.closest?.("[data-provenance-chart-target]")
        ?.getAttribute?.("data-provenance-chart-target") ?? null;

    document.addEventListener("mousedown", event => {
        interactionTarget = getTarget(event.target);
    }, true);

    document.addEventListener("keydown", event => {
        interactionTarget = (
            event.key === "Enter" || event.key === " "
        ) ? getTarget(event.target) : null;
    }, true);

    window.addEventListener("provenance-dropdown-visibility", event => {
        const target = event.detail?.target;
        if (event.detail?.open !== false || interactionTarget !== target) {
            return;
        }

        interactionTarget = null;
        event.stopImmediatePropagation();
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent(
                "provenance-dropdown-toggle",
                { detail: { target, open: true } },
            ));
        }, 0);
    }, true);
};

installDropdownPersistence();
