nodeJsHook();

function newInitiativePresenter() {
	var t = {
	};

	t.present = function(initiative) {
		var presentation = {players:[]};

		if (initiative == null)
			return presentation;

		var players = initiative.getPlayers().sort(byMoves);
		for(var i = 0; i < players.length; i++) 
			presentation.players.push(players[i]);

		presentation.turn = initiative.getNumTurns();

		return presentation;
	}

	return t;
}


function nodeJsHook() {
	if (module && module.exports) 
		module.exports={new:newInitiativePresenter}
}

function byMoves(a, b) { return a.moves - b.moves; }