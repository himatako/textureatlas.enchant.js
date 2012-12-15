enchant();

window.onload = function()
{
    var game = new Core(320, 480);
    game.fps = 30;
    game.scale = 1;

    // Preload
    game.preload("res/atlas.png",
                 "res/atlas.json");

    game.onload= function()
    {        
        enchant.TextureAtlas.createTextureAtlas('mainAtlas',
                this.assets['res/atlas.json'],
                this.assets['res/atlas.png']);
        this.pushScene(new SceneGame());
    };
    game.start();
    window.scrollTo(0,0); 
}

var SceneGame = enchant.Class.create(enchant.Scene, 
{
    initialize: function() 
    {
        Scene.call(this);
        this.backgroundColor = 'black';

        // Assign sprite id when created
        var bgSprite = new enchant.AtlasSprite('mainAtlas', 'bg_01.png');
        this.addChild(bgSprite);
        bgSprite.x = Core.instance.width/2 - bgSprite.width/2;

        // You can also assign it after created
        var characterSprite = new AtlasSprite('mainAtlas');
        characterSprite.spriteId = 'enemies-01.png';
        characterSprite.count = 0;

        characterSprite.moveTo(Core.instance.width/2 - characterSprite.width/2, 32);

        // Changing the id will change the sprite graphic
        characterSprite.addEventListener(Event.ENTER_FRAME, function()
        {
            if(Core.instance.frame % 30 === 0)
            {
                this.count++;
                if(this.count > 5) this.count = 0;
            }
            this.spriteId = "enemies-0" + (this.count+1) + ".png";
            this.moveTo(Core.instance.width/2 - this.width/2, 32);
        })
        this.addChild(characterSprite);
    }
});