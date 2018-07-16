const respotority = require('../lib/respotority');
const tools = require('../lib/tool');

module.exports = device = function(db) {
	this.respotority = new respotority.deviceInfo(db);
	this.result = null;
}

device.prototype.list = async function(params, ...opts) {
	if(params && tools.isJSON(params)) {

	}
	try {
		await self.respotority.Select(opts).query().then(datas => {
			result = datas;
		});
	} catch(e) {
		console.log(e);
	}
	return result;
}

device.prototype.getById = async function(id, ...opts) {
	let self = this;
	let params = {
		UUID: {
			value: id,
		}
	};
	let result;

	try {
		await self.respotority.Select(opts).where(params).query().then(datas => {
			result = datas;
		});
	} catch(e) {
		console.log('[model/device ERROR]: ');
		console.log(e);
	}
	return result;
}

device.prototype.update = async function(opts, params) {
	let self = this;
	let result;

	self.respotority.assemble(params, true);

	try {
		await self.respotority.Update(params).where(opts).query(null, 'rowsAffected').then(r => {
			result = r;
		});
		return result;
	} catch(err) {
		console.log("ERROR TYPE: " + err.code);
		let e = {};
		switch(err.code) {
			case 'ETIMEOUT':
				e.code = 504;
				e.message = 'Request timeout';
				break;
			case 'EREQUEST':
				e.code = 400;
				e.message = 'INPUT ERROR';
				break;
			default:
				e.code = 503;
				e.message = 'Service ERROR';
				break;
		}
		throw e;
	}
}
