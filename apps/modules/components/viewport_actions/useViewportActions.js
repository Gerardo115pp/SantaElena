let intersectionObserver;

function ensureIntersectionObserver() {
    if (intersectionObserver) {
        return;
    }

    intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            let event_name;
            // entered the viewport
            if (entry.isIntersecting) {
                entry.target._isIntersecting = true;
                event_name = 'viewportEnter';
            } 
            // left the viewport
            else if (!entry.isIntersecting && entry.target._isIntersecting) {
                entry.target._isIntersecting = false;
                event_name = 'viewportLeave';
            }
            if (event_name) {
                const event = new CustomEvent(event_name);
                entry.target.dispatchEvent(event);
            }
        });
    })
}

const viewport = e => {
    ensureIntersectionObserver();
    e._isIntersecting = false;
    intersectionObserver.observe(e);
    
    return {
        destroy: () => {
            intersectionObserver.unobserve(e);
        }
    };
}

export default viewport;