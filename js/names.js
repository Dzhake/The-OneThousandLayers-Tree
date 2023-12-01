/*let layersNames = [
    "Prologue",
    "Post prologue",
    "The end?",
    "Just another layer",
    "Land of dreams",
    "№42",
    "Dzhake's layer",
    "Last one",
    "Haha, kidding",
    "This is gonna be long..",
]*/

let adjectives = [
    "shiny",
    "happy",
    "old",
    "new",
    "sad",
    "sunny",
    "trolling"
]

let nouns = [
    "prologue",
    "ending",
    "story",
    "layer",
    "palace",
    "place",
    "house",
    "tree",
]

let layersNames = []

for (let i = 0; i < layersCount;i++) {
    layersNames[i] = adjectives[Math.min(Math.floor(random(seed * i * adjectives.length) * adjectives.length), adjectives.length - 1)] + " " + nouns[Math.min(Math.floor(random(seed * i * nouns.length) * nouns.length), nouns.length - 1)]
}

let layersSymbols = []

for (let i = 0; i < layersCount;i++) {
    layersSymbols[i] = layersNames[i].split(" ")[0].charAt(0).toUpperCase() + layersNames[i].split(" ")[1].charAt(0).toUpperCase()
}
