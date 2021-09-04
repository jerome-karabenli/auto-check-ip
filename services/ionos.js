const puppeteer = require('puppeteer');
const bot = require("./telegram_bot")
const {NODE_ENV, BROWSER_PATH, CHAT_ID, LOGIN, PASSWORD, TARGET_URL} = require("../env")

let headless;
if(NODE_ENV === "dev") headless = false

let executablePath;
BROWSER_PATH ? executablePath = BROWSER_PATH : null


module.exports = async(newIP) => {
    try {
        
        const browser = await puppeteer.launch({headless , executablePath, args: [
            "--no-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
            "--disable-setuid-sandbox"
        ]});

        const page = await browser.newPage();
        await page.goto('https://login.ionos.fr/?ac=OM.FR.FRo41K356241T7073a&shoplogin=enabled&linkId=hd.nav.login&ucuoId=PUAC:sy476-variant.WH.FR-20210902160736-1CDB8E120B932A93DE72191B5BBCC77E.TCbap2a');
        await page.type("#login-form-user", LOGIN)
        await page.type("#login-form-password", PASSWORD)
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await page.goto(TARGET_URL);
        await page.evaluate( () => document.getElementById("recordValue").value = "")
        await page.type("#recordValue", newIP)
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await browser.close();
        return true
        
    } catch (error) {
        bot.launch()
        await bot.telegram.sendMessage(CHAT_ID, error.message)
        bot.stop()
    }  
}