import jsdom from "jsdom";

const pattern = /(www\.\w+\.xyz)/gm;

function xxcnAnalyzer(html: string): string | null {
    const document = new jsdom.JSDOM(html).window.document;
    const scriptTags = document.getElementsByTagName("script");
    const found: string[] = [];
    for (let i = 0; i < scriptTags.length; i++) {
        const scriptText = scriptTags[i].innerHTML;
        const mFound = scriptText.match(pattern);
        if (mFound && mFound.length > 0) {
            found.push(...mFound);
        }
    }
    if (found.length > 0) {
        return found[0];
    }
    return null;
}

export default xxcnAnalyzer;
