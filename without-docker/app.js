require("dotenv").config();
const fs = require('fs');
const publicIp = require("public-ip");
const puppeteer = require("./puppeteer");




const app = async () => {

	// creation du fichier json si non existant avec pour valeur l'ip public actuel
	const firstIPCapture = await publicIp.v4({onlyHttps:true, timeout:2000})
	if(!fs.existsSync(__dirname +'/ipv4.json')) {
		fs.writeFileSync(__dirname +'/ipv4.json', JSON.stringify({recordedIPv4:firstIPCapture}, null, 2))
		console.log("ipv4.json file created")
	}

	const data = fs.readFileSync(__dirname +'/ipv4.json', 'utf8')

	let {recordedIPv4} = JSON.parse(data)

	const ipv4Regex = new RegExp("^(?:[0-9]{2,3}\.){3}[0-9]{2,3}$")

	const actualIPv4 = await publicIp.v4({onlyHttps:true, timeout:2000})

	if(actualIPv4 !== recordedIPv4 && ipv4Regex.test(actualIPv4)) {

		fs.writeFileSync(__dirname +'/ipv4.json', JSON.stringify({recordedIPv4:actualIPv4}, null, 2))

		console.log(`IPv4 changed, new IP: ${actualIPv4}\nIonos DNS records updating, please wait...`)

		await puppeteer(actualIPv4)

		console.log(`Ionos account informations updated !`)
				
	}else {

		console.log("IP not changed")
	}

}

app()