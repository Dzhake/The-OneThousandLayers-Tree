const layersCount = 5

let modInfo = {
	name: "The Thousand layers Tree",
	id: "thethousandlayerstreedzhake",
	author: "Dzhake",
	pointsName: "points",
	modFiles: ["names.js","layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

let seed = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem(modInfo.id))))).seed || getSeed()

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `lol you won`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
let doNotCallTheseFunctionsEveryTick = []

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}


// Calculate points/sec!
function getPointGen() {

	//why is this here
	let bgColor = 255
	for (let i = 0; i < layersCount; i++) {
		if (layers["p" + i].layerShown()) bgColor -= 255/layersCount
	}
	document.body.style.setProperty('--background', "#" + (((Math.floor(bgColor)).toString(16))).repeat(3));
	//anyway,


	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(10)

	if(hasMilestone("p0",11)) gain = gain.times(2)
	if(hasMilestone("p0",12)) gain = gain.times(2)

	for (let i = 0; i < layersCount; i++) {
		if (hasUpgrade("p"+i,11)) gain = gain.times(i+2)
	}

	return gain
}

function getSeed() {
	if (window.player !== undefined) return player.seed;
	else return Math.round(Math.random()*1e9);
}

function random(seed) {
    let x = Math.sin(seed*10+1);
    return x - Math.floor(x);
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	seed: seed,
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}