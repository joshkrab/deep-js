const dns = require('dns');


async function resolveHost (host) {
	let adress;
	dns.lookup(host, (err, addresses, family) => {
		// console.log('addresses:', addresses);
		adress = addresses;
	});
	return adress;
}
// resolveHost('google.com');
// resolveHost('google.com').then(console.log);

function out (n) {
	for (let i = 1; i <= n; i++) {
		setTimeout(() => {
			console.log(i);
		}, i * 1000)
	}
}
out(5);
