const publicIp = require('public-ip');
const fs = require('fs');
const path = require('path');

// si le fichier n'existe pas => création du fichier + strigify l'objet et l'ajouter au fichier (l'objet est vide pour l'instant)
try {
    if(!fs.existsSync('ip-list.json')) {
		fs.writeFileSync('ip-list.json', JSON.stringify({ipv4:[], ipv6:[]}, null, 2))
        console.log('The file does not exist but is created now.');
    }
} catch (err) {
    console.error(err);
}

// fonction pour lire fichier JSON + parser pour le transformer en objet JS
const jsonReader = (filePath, cb) => {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } 
		catch(err) {
            return cb && cb(err)
        }
    })
}

// lire le fichier JSON + l'update + le strigifier + le remplacer

(async () => {
	await publicIp.v4({onlyHttps:true, timeout:2000}).then(newIPV4 => {
		jsonReader('ip-list.json', (err, ipList) => {
			if (err) {
				console.log('Error reading file:',err)
				return
			}
			
			if(newIPV4 != ipList.ipv4[ipList.ipv4.length - 1]){
				ipList.ipv4.push(newIPV4)
				
				fs.writeFile('ip-list.json', JSON.stringify(ipList, null, 2), (err) => {
					if (err) console.log('Error writing file:', err)
					console.log("file saved");
				})

				if(ipList.ipv4.length == 1){
					console.log(`ipv4 ${newIPV4}`);
				}
				else if(ipList.ipv4.length > 1){
					console.log(`NEW Ipv4 ==> ${newIPV4}\nOLD ipv4 ==> ${ipList.ipv4[ipList.ipv4.length - 2]}`);
				}
			}
			else{
				console.log("ipv4 NOT changed");
			}
		})
	})

	await publicIp.v6({onlyHttps:true, timeout:2000}).then(newIPV6 => {
		jsonReader('ip-list.json', (err, ipList) => {
			if (err) {
				console.log('Error reading file:',err)
				return
			}
			
			if(newIPV6 != ipList.ipv6[ipList.ipv6.length - 1]){
				ipList.ipv6.push(newIPV6)

				fs.writeFile('ip-list.json', JSON.stringify(ipList, null, 2), (err) => {
					if (err) console.log('Error writing file:', err)
					console.log("file saved");
				})

				if(ipList.ipv6.length == 1){
					console.log(`ipv6 ${newIPV6}`);
				}
				else if(ipList.ipv6.length > 1){
					console.log(`NEW Ipv6 ==> ${newIPV6}\nOLD ipv6 ==> ${ipList.ipv6[ipList.ipv6.length - 2]}`);
				}

			}
			else{
				console.log("ipv6 NOT changed");
			}
			
		})

	})

})();





