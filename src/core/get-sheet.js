let GOOBER_ID = '_goober';
let ssr = {
    data: ''
};

/**
 * Returns the _commit_ target
 * @param {Object} [target]
 * @returns {HTMLStyleElement|{data: ''}}
 */
export let getSheet = (target) => {
    if (typeof window === 'object') {
        // Querying the existing target for a previously defined <style> tag
        // We're doing a querySelector because the <head> element doesn't implemented the getElementById api
        let el = target ? target.querySelector('#' + GOOBER_ID) : window[GOOBER_ID];

        if (!el) {
            const host = target || document.head;
            el = document.createElement('style');
            el.id = GOOBER_ID;

            if (window.__nonce__) {
                el.setAttribute('nonce', window.__nonce__);
            }

            el.appendChild(document.createTextNode(' '));
            host.appendChild(el);

            if (!target) {
                window[GOOBER_ID] = el;
            }
        } else if (window.__nonce__ && el.getAttribute('nonce') !== window.__nonce__) {
            el.setAttribute('nonce', window.__nonce__);
        }

        return el.firstChild || el.appendChild(document.createTextNode(' '));
    }

    return target || ssr;
};
