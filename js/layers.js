for (let i = 0; i < layersCount; i++) {
    let color = "#"+((Math.floor(256/(layersCount-i)) - 1).toString(16).repeat(3));
    let baseResource = layersNames[i-1] + " points"

    let baseAmount = function() {
        return player["p"+(i-1)].points
    }

    let layerShown = function() {
        return (player["p"+(i-1)].points >= 10) || (player["p"+(i)].best > 0)
    }

    let milestones = {
        11: {
            requirementDescription: "100 "+layersNames[i]+" points",
            effectDescription: "gain 1% " + layersNames[i-1] + " points each second",
            done() {return player["p"+i].points.gte(100)}
        },
        12: {
            requirementDescription: "10000 "+layersNames[i]+" points",
            effectDescription: "keep " + layersNames[i-1] + " upgrades on reset",
            done() {return player["p"+i].points.gte(10000)}
        },
    }

    let passiveGeneration = function() {
        let gen = Decimal.dZero;
        if (hasMilestone("p"+(i+1),11)) gen = gen.add(1)
        return gen
    }

    let doReset = function(resettingLayer) {
        let keep = []

        //if(hasMilestone("p"+(i+1),12)) keep.push("upgrades")
        
        if(layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer, keep);
        }

        
    }

    if (i == 0) {
        baseResource = "points"
        baseAmount = function() {
            return player.points
        }
        layerShown = function() {
            return true
        }
        milestones = {
            11: {
                requirementDescription: "100 "+layersNames[i]+" points",
            effectDescription: "x2 points gain",
            done() {return player["p0"].points.gte(100)},
            },
            12: {
                requirementDescription: "10000 "+layersNames[i]+" points",
                effectDescription: "x2 points gain",
                done() {return player["p"+i].points.gte(10000)}
            },
        }
    }

    if (i == (layersCount - 1)) {
        passiveGeneration = function() {
            return 0
        }
        doReset = function(resettingLayer) {
            let keep = []
            
            layerDataReset(layer, keep)
        }
    }

    addLayer("p"+i, {
        symbol: layersSymbols[i], // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            points: new Decimal(0),
        }},
        color: color,
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: layersNames[i] +" points", // Name of prestige currency
        baseResource: baseResource, // Name of resource prestige is based on
        baseAmount:baseAmount, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (hasUpgrade("p"+i,12)) mult = mult.times(3)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: i, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
        ],
        layerShown: layerShown,
        milestonePopups: false,

        passiveGeneration: passiveGeneration,
        doReset:doReset,

        upgrades: {
            11: {
                title:"More points!",
                description:"x"+(i+2)+" points",
                cost:2,
            },
            12: {
                title:"More "+layersNames[i] +" points",
                description:"x3 "+layersNames[i] +" points",
                cost:4,
            },
        },
        milestones:milestones,
    })
}
