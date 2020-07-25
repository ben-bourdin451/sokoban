// require(["origami"], function(util) {
    // //This function is called when scripts/helper/util.js is loaded.
    // //If util.js calls define(), then this function is not fired until
    // //util's dependencies have loaded, and the util argument will hold
    // //the module value for "helper/util".
// });
// require(["util"], function(util) { });

/**
 * Sokoban
 * @author Benjamin Bourdin
 */

(function() {
	function Sokoban() {
		var containerDiv;
		
		this.initialize = function(mainContainer) {
			// Assign container and set size
			containerDiv = mainContainer;
			mainContainer.css({
				'width' : this.Constants.tileWidth * this.Constants.numTilesX,
				'height': this.Constants.tileHeight * this.Constants.numTilesY
			});
			
			this.Game.initialize(mainContainer);
		}
	}
	
	window.Sokoban = new Sokoban();
})();

/**
 * Constants
 * Defines game constants
 */
(function() {
	function Constants() {
		// Dimensions
		this.tileWidth = 32;
		this.tileHeight = 32;
		this.numTilesX = 12;
		this.numTilesY = 12;
		
		// CSS classes
		this.screenClass = 'screen';
		
		// Logging
		this.isTraceLogEnabled = true;
	}
	
	window.Sokoban.Constants = new Constants();
})();

/**
 * Keyboard codes
 */
(function() {
	function Keyboard() {
		this.r = 82;
		this.m = 77;
		this.escape = 27;
		this.left = 37;
		this.up = 38;
		this.right = 39;
		this.down = 40;	
	}
	
	window.Sokoban.Constants.Keyboard = new Keyboard();
})();

/**
 * Assets
 * 
 * Class that contains references to the game's main assets.
 */
(function() {
	function Assets() {
		var tileAtlas = new window.Origami.SpriteSheet("../images/tiles.png");
		var levelResource = "./resources/levels.json";
		
		this.getTileAtlas = function() { return tileAtlas; }
		this.getLevelResource = function() { return levelResource; }
	}
	
	window.Sokoban.Assets = new Assets();
})();

/**
 * TileType
 * Basic tile type enum
 */
(function () {
	function Tile() {
		this.TileType = {
			'empty' :  0,
			'box' : 1,
			'boxOk' : 2,
			'player' : 3,
			'objective' : 4,
			'wall' : 5
		};
		
		// Class names
		this.genericTileClass = 'tile';
		var empty = 'empty';
		var box = 'box';
		var boxOk = 'box-ok';
		var player = 'player';
		var objective = 'objective';
		var wall = 'wall';
		
		// Method used to get class names for raw type keys
		getTileClass = function(key) {
			// if (Sokoban.Constants.isTraceLogEnabled) { console.log("TRACE - Tile.getTileClass called with key " + key); }
			
			switch (key) {
				case Sokoban.Tile.TileType.empty:
					return empty;
				break;
				
				case Sokoban.Tile.TileType.box:
					return box;
				break;
				
				case Sokoban.Tile.TileType.boxOk:
					return boxOk;
				break;
				
				case Sokoban.Tile.TileType.player:
					return player;
				break;
				
				case Sokoban.Tile.TileType.objective:
					return objective;
				break;
				
				case Sokoban.Tile.TileType.wall:
					return wall;
				break;
			}
		}
		
		this.toHtmlElement = function(key, x, y) {
			if (Sokoban.Constants.isTraceLogEnabled) {
				// console.log("TRACE - Tile.toHtmlElement called with key[" +
				// key + '], x[' + x + '], y[' + y + ']');
			}
			
			if (key == Sokoban.Tile.TileType.player) {
				// Initialise player position
				Sokoban.Player.setInitialPosition(x, y);
			} else {
				return '<div class="' + this.genericTileClass +
					' ' + getTileClass(key) +
					'" style="left:' + x * Sokoban.Constants.tileWidth +
					'px; top:' + y * Sokoban.Constants.tileHeight + 'px;' +	'"></div>';
			}
		}
	}
	
	window.Sokoban.Tile = new Tile();
})();


/**
 * Level
 * 
 * Class to encapsulate level details
 */
(function() {
	function Level() {
		/*
		 * Private members
		 */
		var levels = null;
		var map = null;
		
		/*
		 * Public methods
		 */
		this.loadLevel = function(levelNumber) {
			if (Sokoban.Constants.isTraceLogEnabled) { console.log("TRACE - Level.loadLevel called with level #" + levelNumber); }
			map = levels.maps[levelNumber].slice(0);
			
			if (map != undefined && map.length > 0) {
				return this;
			} else {
				console.log("ERROR - Could not load level #" + levelNumber);
				return null;
			}
		}
		
		this.draw = function(container) {
			if (Sokoban.Constants.isTraceLogEnabled) { console.log("TRACE - Level.draw called"); }
			
			var x = 0, y = 0;
			
			for (item in map) {
				container.append(Sokoban.Tile.toHtmlElement(map[item], x, y));
				
				if(x >= (Sokoban.Constants.numTilesX - 1)) {
					y ++;
					x = 0;
				} else {
					x ++;
				}
			}
		}
		
		// Save tile at initial position and replace it at the specified location
		this.moveTile = function(fromX, fromY, toX, toY) {
			
			var originalTile = this.getTile(fromX, fromY);
			var newTile = this.getTile(toX, toY);
			
			if (newTile == Sokoban.Tile.TileType.objective && originalTile == Sokoban.Tile.TileType.box) {
				newTile = Sokoban.Tile.TileType.boxOk;
			} else {
				newTile = originalTile;
			}
			
			if (originalTile == Sokoban.Tile.TileType.boxOk) {
				originalTile = Sokoban.Tile.TileType.objective;
			} else {
				originalTile = Sokoban.Tile.TileType.empty;
			}
			
			this.setTile(fromX, fromY, originalTile);
			this.setTile(toX, toY, newTile);
		}
		
		/*
		 * Getters and Setters
		 */
		this.setLevels = function(levelsResponse) { levels = levelsResponse; }
		this.getMap = function() { return map; }
		this.getTile = function(x, y) { return map[x + y * Sokoban.Constants.numTilesX]; }
		this.setTile = function(x, y, tile) { map[x + y * Sokoban.Constants.numTilesX] = tile; }
		
		/*
		 * Constructor
		 */
		$.getJSON(Sokoban.Assets.getLevelResource(), function(json) {
			Sokoban.Level.setLevels(json);
		});
	}
	
	window.Sokoban.Level = new Level();
})();

/**
 * Game
 * 
 * Main game class to initialise all components.
 * Contains the update and draw methods
 */
(function() {
	function Game() {
		var screens = new Array();
		
		this.initialize = function(gameContainer) {
			// Attach event handler
			$(window).on('keydown', this.handleInput);
			
			screens.push(Sokoban.PlayScreen);
			
			for (i in screens) {
				screens[i].initialize(gameContainer);
			}
		}
		
		this.handleInput = function(event) {
			console.log(event.which);
			for (i in screens) {
				if (screens[i].isEnabled())
					screens[i].handleInput(event);
			}
		}
		
		this.update = function() {
			for (i in screens) {
				if (screens[i].isEnabled())
					screens[i].update();
			}
		}
		
		this.draw = function() {
			for (i in screens) {
				if (screens[i].isVisible()) {
					screens[i].draw();
					
				} else {
					screens[i].applyHiddenEffect();
				}
			}
		}
	}
	
	window.Sokoban.Game = new Game();
})();

/**
 * PlayScreen
 * 
 * Screen to define the actual game interactions
 */
(function() {
	function PlayScreen() {
		
		/*
		 * Private properties
		 */
		var id = 'playScreen';
		var screenContainer = null;
		var level = null;
		var currentLevel = 1;
		
		/*
		 * Private methods
		 */
		
		/*
		 * Public methods
		 */
		this.applyHiddenEffect = function() {
			screenContainer.css('visibility', 'false');
		}
		
		this.initialize = function(gameContainer) {
			gameContainer.append('<div id="' + id + '" class="' + Sokoban.Constants.screenClass + '"></div>');
			screenContainer = $('#' + id);
			this.reloadLevel();
		}
		
		// Method to reload level on screen
		this.reloadLevel = function() {
			// Reset HUD and other logic
			level = Sokoban.Level.loadLevel(currentLevel);
			Sokoban.Player.reset();
			this.draw();
		}
		
		this.handleInput = function(event) {
			switch (event.which) {
				case Sokoban.Constants.Keyboard.r:
					this.reloadLevel();
				break;
				
				case Sokoban.Constants.Keyboard.m:
				case Sokoban.Constants.Keyboard.escape:
					// back to main menu
				break;
				
				case Sokoban.Constants.Keyboard.up:
				case Sokoban.Constants.Keyboard.right:
				case Sokoban.Constants.Keyboard.down:
				case Sokoban.Constants.Keyboard.left:
					Sokoban.Player.update(event);
					this.update();
					this.draw();
				break;
			}
		}
				
		this.update = function() {
			// TODO: check winning condition
		}
		
		this.draw = function() {
			// Flush container
			screenContainer.empty();
			level.draw(screenContainer);
			Sokoban.Player.draw(screenContainer);
		}
	}
	
	PlayScreen.inheritsFrom(Origami.Screen);
	window.Sokoban.PlayScreen = new PlayScreen();
})();

(function() {
	function Player() {
		/*
		 * Private members
		 */
		var id = 'player-tile';
		var positionX;
		var positionY;
		var directionClass = {
			up: 'mario-up',
			right: 'mario-right',
			down: 'mario-down',
			left: 'mario-left',
		};
		var direction = directionClass.down;
		var initialized = false;
		
		/*
		 * Private methods
		 */		
		var toHtmlElement = function() {
			return '<div id="' + id + '" class="' + Sokoban.Tile.genericTileClass + ' ' + direction +
				'" style="left:' + positionX * Sokoban.Constants.tileWidth +
				'px; top:' + positionY * Sokoban.Constants.tileHeight + 'px;"></div>';
		}
		
		/*
		 * Public methods
		 */
		this.setInitialPosition = function(x, y) {
			if (!initialized) {
				this.setPosition(x, y);
				initialized = true;
			}
		}
		
		this.reset = function() {
			initialized = false;
			direction = directionClass.down;
		}
		
		// TODO: change collision detection logic with tile types 'passable' etc..
		this.update = function(event) {
			switch (event.which) {
				case Sokoban.Constants.Keyboard.up:
					if (positionY > 0) {
						switch (Sokoban.Level.getTile(positionX, positionY - 1)) {
							case Sokoban.Tile.TileType.empty:
							case Sokoban.Tile.TileType.objective:
							case Sokoban.Tile.TileType.player:
								positionY --;
							break;
							
							case Sokoban.Tile.TileType.box:
							case Sokoban.Tile.TileType.boxOk:
								if (positionY > 1) {
									switch (Sokoban.Level.getTile(positionX, positionY - 2)) {
										case Sokoban.Tile.TileType.empty:
										case Sokoban.Tile.TileType.objective:
										case Sokoban.Tile.TileType.player:
											Sokoban.Level.moveTile(positionX, positionY - 1, positionX, positionY - 2);
											positionY --;
										break;
									}
								}
							break;
						}
					}
					
					// Change direction regardless of movement
					direction = directionClass.up;
				break;
				
				case Sokoban.Constants.Keyboard.right:
					if (positionX < (Sokoban.Constants.numTilesX - 1)) {
						switch (Sokoban.Level.getTile(positionX + 1, positionY)) {
							case Sokoban.Tile.TileType.empty:
							case Sokoban.Tile.TileType.objective:
							case Sokoban.Tile.TileType.player:
								positionX ++;
							break;
							
							case Sokoban.Tile.TileType.box:
							case Sokoban.Tile.TileType.boxOk:
								if (positionX < (Sokoban.Constants.numTilesX - 2)) {
									switch (Sokoban.Level.getTile(positionX + 2, positionY)) {
										case Sokoban.Tile.TileType.empty:
										case Sokoban.Tile.TileType.objective:
										case Sokoban.Tile.TileType.player:
											Sokoban.Level.moveTile(positionX + 1, positionY, positionX + 2, positionY);
											positionX ++;
										break;
									}
								}
							break;
						}
					}
					
					direction = directionClass.right;
				break;
				
				case Sokoban.Constants.Keyboard.down:
					if (positionY < (Sokoban.Constants.numTilesY - 1)) {
						switch (Sokoban.Level.getTile(positionX, positionY + 1)) {
							case Sokoban.Tile.TileType.empty:
							case Sokoban.Tile.TileType.objective:
							case Sokoban.Tile.TileType.player:
								positionY ++;
							break;
							
							case Sokoban.Tile.TileType.box:
							case Sokoban.Tile.TileType.boxOk:
								if (positionY < (Sokoban.Constants.numTilesY - 2)) {
									switch (Sokoban.Level.getTile(positionX, positionY + 2)) {
										case Sokoban.Tile.TileType.empty:
										case Sokoban.Tile.TileType.objective:
										case Sokoban.Tile.TileType.player:
											Sokoban.Level.moveTile(positionX, positionY + 1, positionX, positionY + 2);
											positionY ++;
										break;
									}
								}
							break;
						}
					}

					direction = directionClass.down;
				break;
				
				case Sokoban.Constants.Keyboard.left:
					if (positionX > 0) {
						switch (Sokoban.Level.getTile(positionX - 1, positionY)) {
							case Sokoban.Tile.TileType.empty:
							case Sokoban.Tile.TileType.objective:
							case Sokoban.Tile.TileType.player:
								positionX --;
							break;
							
							case Sokoban.Tile.TileType.box:
							case Sokoban.Tile.TileType.boxOk:
								if (positionX > 1) {
									switch (Sokoban.Level.getTile(positionX - 2, positionY)) {
										case Sokoban.Tile.TileType.empty:
										case Sokoban.Tile.TileType.objective:
										case Sokoban.Tile.TileType.player:
											Sokoban.Level.moveTile(positionX - 1, positionY, positionX - 2, positionY);
											positionX --;
										break;
									}
								}
							break;
						}
					}
					
					direction = directionClass.left;
					
				break;
			}
		}
		
		this.draw = function(container) {
			if (Sokoban.Constants.isTraceLogEnabled) { console.log("TRACE - Player.draw called"); }
			container.append(toHtmlElement());
		}
		
		/*
		 * Getters and Setters
		 */
		this.getPositionX = function() { return positionX; }
		this.getPositionY = function() { return positionY; }

		this.setPosition = function(x, y) {
			positionX = x;
			positionY = y;
		}
	}
	
	window.Sokoban.Player = new Player();
})();
