class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0;
        this.rank = 0;
    }

    getCount() {
        var playerCountRef = database.ref('playerCount').on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score,
            rank: this.rank
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players').on("value", (data) => {
            allPlayers = data.val();
        })
    }

    getFinishedPlayer() {
        var finishedPlayerRef = database.ref('finishedPlayer').on("value", (data)=>{
            finishedPlayer = data.val();
        })

    }

    static updateFinishedPlayer() {
        database.ref('/').update({
            finishedPlayer: finishedPlayer + 1
        });
        this.rank = this.rank + 1;
    }

    
}
