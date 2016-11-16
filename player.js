class Player{
	constructor(name, type){
		this.name = name;
		this.type = type;
	}

	toString(){
		return "Hello, my name is "+this.name+".";
	}
}
exports.Player = Player;