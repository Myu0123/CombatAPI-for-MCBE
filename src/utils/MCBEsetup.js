import { world, system } from "@minecraft/server"

export const W = {
    getD(dimension){ return world.getDimension(dimension) },

    SB: {
        obj: {
            add(sbId, name){
                return world.scoreboard.addObjective(sbId, name);
            },
            remove(sbId){
                return world.scoreboard.removeObjective(sbId);
            },
            get(sbId){
                return world.scoreboard.getObjective(sbId);
            },
            getObjs(){
                return world.scoreboard.getObjectives();
            },
        },
        display: {
            set(slotId){
                return world.scoreboard.setObjectiveAtDisplaySlot(slotId)
            },
            clear(slotId){
                return world.scoreboard.clearObjectiveAtDisplaySlot(slotId)
            },
            get(slotId, setting){
                return world.scoreboard.getObjectiveAtDisplaySlot(slotId, setting)
            },
        }
    },

    DP: {
        set(identifier, value){
            return world.setDynamicProperty(identifier, value);
        },
        get(identifier){
            return world.getDynamicProperty(identifier);
        },
        clearAll(){
            return world.clearDynamicProperties();
        },
        getBC(){
            return world.getDynamicPropertyTotalByteCount();
        }
    },
}
export const overworld = W.getD('overworld');
export const nether = W.getD('nether');
export const the_end = W.getD('the_end');
export const D = {
    overworld: new Dimension(overworld),
    nether: new Dimension(nether),
    the_end: new Dimension(the_end),
}

export class Dimension{
    constructor(dimension){
        this.dimension = dimension;
    }
    run(cmd){
        return this.dimension.runCommand(cmd);
    }
    runAsync(cmd){
        return this.dimension.runCommandAsync(cmd);
    }
}

export class ScoreInfo{
    constructor(sb){
        this.sb = sb;
    }
    addScore(ent, score){
        return this.sb.addScore(ent, score);
    }
    setScore(ent, score){
        return this.sb.setScore(ent, score);
    }
    getScore(ent){
        return this.sb.getScore(ent);
    }
    getScores(){
        return this.sb.getScores();
    }
}


function playerSetup(player){
    player.val = {};
}

world.afterEvents.playerJoin.subscribe((event) => {
    const player = world.getEntity(event.playerId);
    if(player) playerSetup(player);
});
world.getAllPlayers().forEach(ent => setup(ent));


////////////////

/*Setups
function setup(player){
    player.cmd = {};
    player.cmd.tell = async function(message){
        await null;
        player.runCommand(`tellraw @s {"rawtext":[${message}]}`);
    };
    player.cmd.title = async function(mode, data){
        await null;
        switch(mode){
            case 'title':
            case 'subtitle':
            case 'actionbar':
                player.runCommand(`titleraw @s ${mode} {"rawtext":[${data}]}`);
                break;
            case 'times':
                player.runCommand(`titleraw @s times ${data[0]} ${data[1]} ${data[2]}`);
                break;
            case 'clear':
            case 'reset':
                player.runCommand(`titleraw @s ${mode}`);
                break;
        }
    };
    player.cmd.giveItem = function(itemStack){ player.getComponent('inventory').container.addItem(itemStack) };

}
*/



