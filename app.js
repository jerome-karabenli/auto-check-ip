require("dotenv").config();
const fs = require('fs');
const publicIp = require("public-ip");
const ionosChange = require("./services/ionos");
const bot = require("./services/telegram_bot")



const app = async () => {

	try {
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

		if(actualIPv4 === recordedIPv4) return
		if(!ipv4Regex.test(actualIPv4)) {
			bot.launch()
			await bot.telegram.sendMessage(process.env.CHAT_ID, `found ip not matching => ${actualIPv4}`)
			bot.stop()
			return
		}

			
		const update = await ionosChange(actualIPv4)
			
		if(!update) return
			
		fs.writeFileSync(__dirname +'/ipv4.json', JSON.stringify({recordedIPv4:actualIPv4}, null, 2))

		bot.launch()

		await bot.telegram.sendMessage(process.env.CHAT_ID, `IPv4 changed, new IP: ${actualIPv4}\nIonos DNS records updating, please wait...`)
			
		await bot.telegram.sendMessage(process.env.CHAT_ID, `Ionos account informations updated !`)

		bot.stop()
					
		

	} catch (error) {
		
		console.log(error.message)
		
	}
	

}

app()

