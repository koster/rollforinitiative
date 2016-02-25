var assert = require('assert');

assert.contains = function(what, items) {
	for(var i = 0 ; i < items.length; i++)
  		assert.notEqual(what.indexOf(items[i]), (-1)); 
}

var initiativeTableModule = require('./../src/initiative.js');

describe('Initiative table', function() {
	beforeEach(function() {
		initiative = initiativeTableModule.new(); 
	});

	describe('when created', function() {
		it('should be empty', function () {
			assert.equal(initiative.getPlayers().length, 0);
		});
		it('should have passed turns count equal to zero', function() {
			assert.equal(initiative.getNumTurns(), 0);
		})
		it('should have no current player', function () {
			assert.equal(initiative.getCurrentPlayer(), null);
		});
	});	

	describe('when add', function() {
		it('should contain that item after', function () {
			p1 = {name:"player1"};
			initiative.add(p1);
			assert.contains(initiative.getPlayers(), [p1]);

			p2 = {name:"player2"};
			initiative.add(p2);
			assert.contains(initiative.getPlayers(), [p1, p2]);
		});

		it('should have players in initiative order', function () {
			initiative.players = [
				p1 = {name:"p1", i:10},
				p2 = {name:"p2", i:5},
				p3 = {name:"p3", i:30}
			];

			assert.deepEqual(initiative.getPlayers(), [p3, p1, p2])
		});

		it('when initiative is same should use moves', function () {
			initiative.players = [
				p1 = {name:"p1", i:1, moves: 10},
				p2 = {name:"p2", i:1, moves: 5},
				p3 = {name:"p3", i:1, moves: 30}
			];

			assert.deepEqual(initiative.getPlayers(), [p2, p1, p3]);
		});

		it('should have current item as item with highest initiative', function () {
			initiative.add(p1 = {name:"p1", i:5});
			assert.equal(initiative.getCurrentPlayer(), p1);

			initiative.add(p2 = {name:"p2", i:10});
			assert.equal(initiative.getCurrentPlayer(), p2);

			initiative.add(p3 = {name:"p3", i:1});
			assert.equal(initiative.getCurrentPlayer(), p2);
		});

		it('should add items at current turn', function () {
			initiative.numTurns = 10;
			initiative.add(p1 = {name:"p1"});
			assert.equal(p1.moves, 10);

			initiative.numTurns = 1;
			initiative.add(p2 = {name:"p2"});
			assert.equal(p2.moves, 1);
		});

		it('when in the middle of the turn should update current player', function () {
			initiative.numTurns = 5;

			initiative.add(p1 = {name:"p1", i:15});
			initiative.add(p2 = {name:"p2", i:5});
			initiative.add(p3 = {name:"p3", i:10});

			initiative.next();
			initiative.next();

			initiative.add(p4 = {name:"p4", i:20});

			assert.equal(initiative.getCurrentPlayer(), p4);
		});
	});

	describe('on next move', function() {
		context('when no players', function() {
			it('should throw no exceptions', function() {
				initiative.next();
			});
		});

		context('when only one player', function() {
			beforeEach(function () {
				p = {name:"moving player"};
				initiative.add(p);
				initiative.next();
			});

			it('should increase num turns by one each time', function() {
				assert.equal(initiative.getNumTurns(), 1);

				initiative.next();
				assert.equal(initiative.getNumTurns(), 2);

				initiative.next();
				assert.equal(initiative.getNumTurns(), 3);
			});

			it('if only one player, that player remains current', function() {
				assert.equal(initiative.getCurrentPlayer(), p);
			});	
		});

		context('when multiple players', function() {
			beforeEach(function () {
				players = [{name:"p1", i:20},{name:"p2",i:19},{name:"p3",i:18},{name:"p4",i:17},{name:"p5",i:16}];
				for (var i = 0; i < players.length; i++)
					initiative.add(players[i]);
			});

			it('should switch current player to next player', function() {
				initiative.next();
				assert.equal(initiative.getCurrentPlayer(), players[1]);

				initiative.next();
				assert.equal(initiative.getCurrentPlayer(), players[2]);
			});

			it('when call next on last player, switch to first player and increase num turns by one', function() {
				for (var i = 0; i < players.length; i++)
					initiative.next();

				assert.equal(initiative.getCurrentPlayer(), players[0]);
				assert.equal(initiative.getNumTurns(), 1);
			});
		});
	});	
});