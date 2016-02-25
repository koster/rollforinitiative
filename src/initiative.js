nodeJsHook();

function newInitiativeTable() {
	var t = {
		players: [],
		currentMove: 0,
		numTurns: 0
	};

	t.add = function (p) {
		p.moves = t.numTurns;
		t.players.push(p);
	};

	t.next = function () {
		if (t.players.length > 0)
			t.getCurrentPlayer().moves++;

		t.currentMove++;

		if (t.currentMove >= t.players.length) {
			t.currentMove = 0;
			t.numTurns++;
		}
	};

	t.getPlayers = function () {
		return t.players.sort(byInitiative).sort(byMoves);
	};

	t.getNumTurns = function() {
		return t.numTurns;
	};

	t.getCurrentPlayer = function () {
		if (t.players.length == 0)
			return null;
		return t.getPlayers()[0];
	};

	return t;
}

function byInitiative(a, b) {
	return b.i - a.i;
}

function byMoves(a, b) {
	return a.moves - b.moves;
}

function nodeJsHook() {
	if (module && module.exports) 
		module.exports={new:newInitiativeTable}
}