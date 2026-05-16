(function () {
    const allowedTags = [
        'a', 'p', 'em', 'strong', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'code', 'pre', 'hr', 'br', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span', 'section'
    ];
    const allowedAttrs = ['href', 'title', 'src', 'alt', 'class', 'lang', 'dir'];

    function assertSameOrigin(input) {
        const url = new URL(input, window.location.href);
        if (url.origin !== window.location.origin) {
            throw new Error(`Blocked cross-origin request: ${url.href}`);
        }
        return url;
    }

    async function sha256Hex(text) {
        // Deployment may normalize CRLF to LF, so hash canonical text content instead of platform line endings.
        const canonicalText = text.replace(/\r\n/g, '\n');
        const bytes = new TextEncoder().encode(canonicalText);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
    }

    async function secureFetchText(input, expectedHash) {
        const url = assertSameOrigin(input);
        const response = await fetch(url, {
            mode: 'same-origin',
            credentials: 'same-origin',
            cache: 'no-store'
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const text = await response.text();
        if (expectedHash && await sha256Hex(text) !== expectedHash) {
            throw new Error(`Integrity check failed: ${url.pathname}`);
        }
        return text;
    }

    async function secureFetchJson(input, expectedHash) {
        return JSON.parse(await secureFetchText(input, expectedHash));
    }

    function sanitizeHtml(html, extraConfig = {}) {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: allowedTags,
            ALLOWED_ATTR: allowedAttrs,
            FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
            FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
            ALLOW_DATA_ATTR: false,
            ...extraConfig
        });
    }

    function safeUrl(value, allowedProtocols = ['http:', 'https:']) {
        if (!value) return '';
        try {
            const url = new URL(value, window.location.href);
            return allowedProtocols.includes(url.protocol) ? url.href : '';
        } catch (error) {
            return '';
        }
    }

    function safeMarkdown(markdown) {
        marked.setOptions({ breaks: true, gfm: true });
        return sanitizeHtml(marked.parse(markdown || ''));
    }

    function htmlToFragment(html) {
        const template = document.createElement('template');
        template.innerHTML = sanitizeHtml(html);
        return template.content;
    }

    function setSanitizedHtml(target, html) {
        target.replaceChildren(htmlToFragment(html));
    }

    function setMarkdown(target, markdown) {
        setSanitizedHtml(target, safeMarkdown(markdown));
    }

    function appendTextMessage(target, text, className) {
        const p = document.createElement('p');
        if (className) p.className = className;
        p.textContent = text;
        target.replaceChildren(p);
    }

    window.SiteSecurity = {
        secureFetchJson,
        secureFetchText,
        safeMarkdown,
        safeUrl,
        setSanitizedHtml,
        setMarkdown,
        appendTextMessage
    };
})();
