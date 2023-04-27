const dns = require('dns');

function resolveHost (host) {
	return new Promise((resolve) => dns.lookup(host, (err, addresses, family) => {
		resolve(addresses);
	}));
}
// resolveHost('google.com').then(console.log);

function out (n) {
	for (let i = 1; i <= n; i++) {
		setTimeout(() => {
			console.log(i);
		}, i * 1000)
	}
}
// out(5);

// setTimeout(() => {
// 	console.log(1);
// 	setTimeout(() => {
// 		console.log(2);
// 		setTimeout(() => {
// 			console.log(3);
// 		}, 1000)
// 	}, 1000)
// }, 1000)

Promise.resolve()
	.then(() => {
		console.log(1);
		return new Promise(resolve => setTimeout(resolve, 1000))
	})
	.then(() => {
		console.log(2);
		return new Promise(resolve => setTimeout(resolve, 1000))
	})
	.then(() => {
		console.log(3);
		return new Promise(resolve => setTimeout(resolve, 1000))
	})