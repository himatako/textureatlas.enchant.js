/**
 * textureatlas.enchant.js
 * @version 0.1
 * @require enchant.js v0.6.0 or later
 * @author Guts(Hima)  
 * @contact guts@coffeedoggames.com
 *
 * @example
 * enchant.TextureAtlas.createTextureAtlas('mainAtlas', 
 *											game.assets['graphics/spriteatlas.json']
 *                                    	   	game.assets['graphics/spriteatlas.png']);
 * var sprite = new AtlasSprite('mainAtlas');
 * sprite.spriteId = 'logo.png';
 * sprite.x = 160;
 * sprite.y = 64;
 * sprite.opacity = 0.5;
 * scene.addChild(sprite);
 *
 **/

 /**
 * plugin namespace object
 */
enchant.TextureAtlas = {};
enchant.TextureAtlas._atlasDatas = {};

/**
 * Create a texture atlas and add it to the atlas dictionary
 * @param atlasName Atlas ID
 * @param jsonFile Texture Atlas' metadata
 * @param surface Atlas graphic
 */
enchant.TextureAtlas.createTextureAtlas = function (atlasName, jsonFile, surface) {	
	enchant.TextureAtlas._atlasDatas[atlasName] = JSON.parse(jsonFile);	
	enchant.TextureAtlas._atlasDatas[atlasName].surface = surface;
	enchant.TextureAtlas._atlasDatas[atlasName].name = atlasName;
}

/**
 * Get an atlas object from the dictionary
 * @param atlasName name of the atlas you want to retrieve
 */
enchant.TextureAtlas.getTextureAtlas = function (atlasName) {	
	return enchant.TextureAtlas._atlasDatas[atlasName];
}

/**
 * @scope enchant.TextureAtlas.AtlasSprite
 */
enchant.AtlasSprite = enchant.Class.create(enchant.Sprite,{
	/**
     * Sprite for drawing a texture from TextureAtlas.
     * @constructs
     * @param atlasName Identifier of the atlas that this sprite is going to use
     * @param spriteId Identifier of the texture you want to render on the screen     
     */
	initialize: function (atlasName, spriteId) {
		enchant.Sprite.call(this,1,1);

		this._spriteId = "";
		this.spriteData = null;		
		this.atlasData = enchant.TextureAtlas.getTextureAtlas(atlasName);
		this.image = this.atlasData.surface;

		// If spriteId argument is given, we assign it ASAP
		if(spriteId !== null && spriteId !== undefined)
		{
			this.spriteId = spriteId;
		}
	},

	/** 
	* Sprite identifier. Change this to change the graphic of the sprite. 
	* @type String
	*/
	spriteId:{
		get: function(){
			return this._spriteId;
		},
		set: function(newId){
			var spriteData = this._getSpriteData(newId);
			if(spriteData != null)
			{
				this.spriteData = spriteData;
				this._spriteId = newId;								
				this._setSourceRectangle(spriteData.frame.x, 
										 spriteData.frame.y,
										 spriteData.frame.w,
										 spriteData.frame.h);
			}else
			{
				throw new Error("spriteId: Cannot find '"+newId+"' in the texture atlas named '" + this.atlasData.name + "'");
			}
		}
	},

	/** 
	* Move sprite to the original position on the source picture before it's trimmed.
	*/
	revertToSourcePosition: function() {
		if(this.spriteData != null)
		{
			this.x = this.spriteData.spriteSourceSize.x;
			this.y = this.spriteData.spriteSourceSize.y;
		}
	},

	/**
	 * Get metadata of the given sprite idenfitier
	 * @param spriteId Identifier of the sprite.
	 */
	_getSpriteData: function(spriteId) {
		for (var i = this.atlasData.frames.length - 1; i >= 0; i--) {
			if( this.atlasData.frames[i].filename === spriteId )
			{
				return this.atlasData.frames[i];
			}
		}
		return null;
	},

	/**
	 * Set the source image rectangle
	 * @param x Left position of the origin point of the rectangle
	 * @param y Top position of the origin point of the rectangle
	 * @param w Width of the source rectangle
	 * @param h Height of the source rectangle
	 */
	_setSourceRectangle: function(x, y, w, h) {
		this.width = w;
		this.height = h;
		this._frameLeft = x;
		this._frameTop = y;		
	},
});