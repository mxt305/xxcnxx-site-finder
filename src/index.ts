#!/usr/bin/env ts-node
import testList from "./source/testList.json";
import excludeList from "./source/excludeList.json";
import existedList from "./source/existedList.json";
import { TestResult } from "./types";
import xxcnTester from "./xxcnTester";

const mTestList = testList as string[];
const mExcludeList = [...excludeList, ...existedList] as string[];
const resultList: TestResult[] = [];

const testAsync = mTestList
    .filter((url) => {
        return mExcludeList.reduce<boolean>((previousValue, currentValue) => {
            return !url.includes(currentValue) && previousValue;
        }, true);
    })
    .map(
        (url) =>
            new Promise((resolve, reject) => {
                xxcnTester(url)
                    .then((testResult) => {
                        if (testResult) {
                            resultList.push(testResult);
                        }
                        resolve(resultList);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
    );

Promise.all(testAsync)
    .then(() => {
        const csvRow = resultList.map(
            (result) => `${result.domain},,${result.redirection},${result.tld}`
        );
        const csv = csvRow.join("\n");
        console.log(csv);
    })
    .catch((err) => {
        console.log(err);
    });
