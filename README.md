# xxcnxx-site-finder
The web tester to the xxcnxx phishing site

## 用法
將`souce.example`資料夾改名為`souce`，裡面有三個清單

- `excludeList` 例外清單 (非釣魚網站)
- `existedList` 已知清單 (已知釣魚網站)
- `testList` 測試清單

程式會將`testList`網址列表先過濾掉例外清單及已知清單中的域名，並將其餘的網址做測試。測試完成後會把結果已csv的格式印出來。

執行腳本前需要安裝 ts-node

```shell
npm install -g typescript
npm install -g ts-node
```

## 備註
目前只是簡單的測試腳本，仍有許多不足的地方需要改善。目前只能針對.co這一類的釣魚網站做測試。
