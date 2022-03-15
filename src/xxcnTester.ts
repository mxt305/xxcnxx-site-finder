import axios from "axios";
import { TestResult } from "./types";
import xxcnAnalyzer from "./xxcnAnalyzer";

async function xxcnTester(url: string): Promise<TestResult | null> {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const domainArr = domain.split(".");
    const tld = domainArr[domainArr.length - 1];
    console.log(`test: ${url}`);
    return await axios
        .get(url, {
            headers: {
                Referer: "https://www.google.com/",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36",
                Accept: "*/*",
            },
        })
        .then((response) => {
            if (response.status === 200) {
                //console.log(response.data);
                const redirection = xxcnAnalyzer(response.data);
                return {
                    domain,
                    redirection,
                    tld,
                };
                //xxcnAnalyzer;
            }
            console.log(`error: ${domain} code:${response.status}`);
            return null;
        })
        .catch((error) => {
            //console.log(error);
            console.log(`error: ${domain}`);
            return null;
        });
}

export default xxcnTester;
