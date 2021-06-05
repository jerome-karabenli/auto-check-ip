const publicIp = require('public-ip');

(async () => {
	console.log(await publicIp.v4());

	console.log(await publicIp.v6());
})();