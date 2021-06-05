const publicIp = require('public-ip');
const fs = require('fs');

// creation de l'objet 
const createList = {
    ipv4: [],
    ipv6: []
}

// si le fichier existe => null sinon création du fichier + strigify l'objet et l'ajouter au fichier
try {
    if(fs.existsSync('ip-list.json')) {
    } else {
		const strigifyedList = JSON.stringify(createList, null, 2)
		fs.writeFileSync('./ip-list.json', strigifyedList)
        console.log('The file does not exist but is created now.');
    }
} catch (err) {
    console.error(err);
}


// fonction pour lire fichier JSON + parser pour le transformer en objet JS
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}

// lire le fichier JSON + l'update + le strigifier + le remplacer

const actualIp = async () => {
	await publicIp.v4({onlyHttps:true, timeout:2000}).then(data => {
		jsonReader('./ip-list.json', (err, ipList) => {
			if (err) {
				console.log('Error reading file:',err)
				return
			}
			
			if(ipList.ipv4[ipList.ipv4.length - 1] != data){
				ipList.ipv4.push(data)
			}
			
		fs.writeFile('./ip-list.json', JSON.stringify(ipList, null, 2), (err) => {
				if (err) console.log('Error writing file:', err)
			})
		})

	})
	await publicIp.v6({onlyHttps:true, timeout:2000}).then(data => {
		jsonReader('./ip-list.json', (err, ipList) => {
			if (err) {
				console.log('Error reading file:',err)
				return
			}
			
			if(ipList.ipv6[ipList.ipv6.length - 1] != data){
				ipList.ipv6.push(data)
			}
			
		fs.writeFile('./ip-list.json', JSON.stringify(ipList, null, 2), (err) => {
				if (err) console.log('Error writing file:', err)
			})
		})

	})
}

actualIp()



