const download = async (req, res) => {
    const puppeteer = require("puppeteer");
    const chromium = require('chrome-aws-lambda');
    const url =req.body.url;
    const browser = await puppeteer.launch({
        args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto('https://en.savefrom.net/1-youtube-video-downloader-533nN/',{waitUntil: 'networkidle2'});
    await page.waitForSelector("#sf_url");
    const search = await page.$("#sf_url");
    await search.type(url);
    await page.click(".r-box button");
    await page.waitForSelector(".result-box");
    const download = await page.$('.def-btn-box a[href]');
    const downloadLink = await page.evaluate(download => download.href, download);
    // await console.log(downloadLink);
    // await console.log("downloadLink founded");
    await browser.close();
    res.render('download',{url:downloadLink});
}
module.exports = download;