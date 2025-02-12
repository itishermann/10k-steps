import DOMPurify from "dompurify";

function createMarkup(dirty: string) {
	return {
		__html: DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } }),
	};
}

export { createMarkup };
