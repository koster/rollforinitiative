var assert = require('assert');

assert.contains = function(what, items) {
	for(var i = 0 ; i < items.length; i++)
  		assert.notEqual(what.indexOf(items[i]), (-1)); 
}

var initiativeTable = require('./../src/initiative.js');
var initiativePresenter = require('./../src/initiativePresenter.js');

describe('Initiative presenter', function() {
	beforeEach(function() {
		initiative = initiativeTable.new(); 
		presenter = initiativePresenter.new(); 
	});

	context("when present players", function () {
		it('if have no players presents nothing', function () {
			assert.equal(presenter.present(null).players.length, 0);
			assert.equal(presenter.present(initiative).players.length, 0);
		});

		it('if have several players presents those players in moves order', function () {
			var expectedPlayers = [];
			for (var i = 0; i < 8; i++)
				expectedPlayers[i] = {name:i, moves: i%4};
			initiative.players = expectedPlayers.slice();
			var sortedPlayers = expectedPlayers.sort(byMoves);

			var presented = presenter.present(initiative);
			assert.deepEqual(presented.players, sortedPlayers);
		});
	});

	describe('when present turn', function () {
		it('should have count turns equal to passed turns', function () {
			initiative.numTurns = 101;
			assert.equal(presenter.present(initiative).turn, 101);

			initiative.numTurns = 0;
			assert.equal(presenter.present(initiative).turn, 0);
		});
	});
});


function byMoves(a, b) { return a.moves - b.moves; }