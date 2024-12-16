// base class - do not use. javascript has no abstract keyword :(
class File {
	path;
	filename;

	constructor(path, filename) {
		this.path = path;
		this.filename = filename;
	}
	read() {}
	write() {}
}
module.exports = { File };
