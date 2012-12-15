TexturePacker plugin for enchant.js
========================
textureatlas.enchant.js is a plugin for [enchant.js][1] that make it
very easy to use a texture atlas generated from [Texture Packer][2] 
in your enchant.js game/application.

How to use textureatlas.enchant.js
---------------------------
1. Download [Texture Packer][2]

2. Set the export setting to output JSON(Array)

3. Create a texture atlas as usual. You will get two files, which are .json and .png files.

4. Include textureatlas.enchant.js into your HTML file.

5. Preload both the json file and the png file in your game.
```javascript
    game.preload("res/atlas.png",
                 "res/atlas.json");
```

6. Create a texture atlas and give it a name for later access.
```javascript
	// Create a texture atlas called 'mainAtlas', using
	// atlas.json and atlas.png files
    enchant.TextureAtlas.createTextureAtlas(
    			'mainAtlas',
                game.assets['res/atlas.json'],
                game.assets['res/atlas.png']);
```

7. Create an instance of a AtlasSprite class and use it as a normal enchant.js Sprite
```javascript
	var bgSprite = new enchant.AtlasSprite('mainAtlas', 'bg_01.png');
	bgSprite.x = Core.instance.width/2 - bgSprite.width/2;
	this.addChild(bgSprite);
```

8. You can also change the sprite's graphic quickly by reassigning the sprite identifier.
```javascript
	bgSprite.spriteId = 'enemies-01.png';
```

[1]:http://enchantjs.com "enchant.js"
[2]:http://www.codeandweb.com/texturepacker "Texture Packer"