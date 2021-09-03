const puppeteer = require('puppeteer');

let headless;
if(process.env.NODE_ENV === "dev") headless = false

let executablePath;
process.env.BROWSER_PATH ? executablePath = process.env.BROWSER_PATH : null

module.exports = async(ip) => {
    try {
        
            browser = await puppeteer.launch({headless , executablePath, args: [
                "--no-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox"
            ]});
        
        
        

        const page = await browser.newPage();
        await page.goto('https://login.ionos.fr/?ac=OM.FR.FRo41K356241T7073a&shoplogin=enabled&linkId=hd.nav.login&ucuoId=PUAC:sy476-variant.WH.FR-20210902160736-1CDB8E120B932A93DE72191B5BBCC77E.TCbap2a');
        await page.type("#login-form-user", process.env.LOGIN)
        await page.type("#login-form-password", process.env.PASSWORD)
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await page.goto(process.env.TARGET_URL);
        await page.evaluate( () => document.getElementById("recordValue").value = "")
        await page.type("#recordValue", ip)
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await browser.close();
    } catch (error) {
        console.log(error.message)
    }  
}