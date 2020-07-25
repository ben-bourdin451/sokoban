// Origami Engine

/**
 * Origami
 * Namespace container.
 */
(function () {
	function Origami() {
		
	}
	
	window.Origami = new Origami();
})();


/**
 * SpriteSheet
 * Defines a sprite sheet.
 * Extend to define specific sprites.
 */
(function () {
	function  SpriteSheet(pPath) {
		var path = pPath;
		
		this.getPath = function() { return path; }
	}
	
	window.Origami.SpriteSheet = SpriteSheet;
})();

/**
 * Tile
 * Represents a single tile in world space
 */
(function () {
	function Tile(type) {
		var tileType = type;
		this.getTileType = function() { return tileType; }
	}
	
	Tile.prototype.toElement = function() {
		return '<div class="' + this.getTileType() + '"></div>';
	}
	
	window.Origami.Tile = Tile;
})();

/**
 * Screen
 * 
 * Base class for a screen (menu or other)
 */
(function () {
	function Screen() {
		var enabled = true;
		this.enable = function() { enabled = true; }
		this.disable = function() { enabled = false; }
		this.isEnabled = function() { return enabled; }
		
		var visible = true;
		this.show = function() { visible = true; }
		this.hide = function() { visible = false; }
		this.isVisible = function() { return visible; }
	}
	
	// Define screen class
	Screen.prototype.getScreenClass = function() { return 'screen'; }
	
	window.Origami.Screen = Screen;
})();
