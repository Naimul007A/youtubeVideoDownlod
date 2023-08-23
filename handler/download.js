const puppeteer = require("puppeteer");
const chromium = require('chrome-aws-lambda');
const download = async (req, res) => {
    const url =req.body.url;
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        args:chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.EXCEUTABLE_PATH || await chromium.executablePath,
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
    const image =await page.$('img.thumb');
    const imageLink = await page.evaluate(image => image.src, image);
    const titleHandel = await page.$('.info-box .title');
    const title = await page.evaluate(titleHandel => titleHandel.textContent, titleHandel);
    const durationHandel = await page.$('.info-box .duration');
    const duration = await page.evaluate(durationHandel => durationHandel.textContent, durationHandel);
    const download = await page.$('.def-btn-box a[href]');
    const downloadLink = await page.evaluate(download => download.href, download);
    // await console.log(downloadLink);
    // await console.log("downloadLink founded");
    await browser.close();
    const result = {
        imageLink: imageLink,
        url: downloadLink,
        title: title,
        duration: duration
    }
    res.json(result);
}
module.exports = download;