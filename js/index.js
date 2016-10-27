var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////START OF GAME JS///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var w=screen.width;
var h=screen.height

var game = new Phaser.Game(400, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('wall', 'img/2.png');
    game.load.image('ground', 'img/1.png');
    game.load.image('door', 'img/3.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    game.load.image('up', 'img/up.png');
    game.load.image('down', 'img/down.png');
    game.load.image('right', 'img/right.png');
    game.load.image('left', 'img/left.png');
}

var player;
var time = 1000;
var scoreText;
var tierra;
var pant;
var image;
var cursors;
var doors;
var star;
var i,j,k,l,j1,k1;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    tierra = game.add.group();
    tierra.enableBody = true;
    
    var cubo = tierra.create(0, 0, 'wall');
    cubo.body.immovable = true;
    cubo.scale.setTo(2, 2);
    //  Hacer los muros laterales
    for(i=1;i<20;i++){
        cubo = tierra.create(0, i*20, 'wall');
        cubo.scale.setTo(2, 2);
        cubo.body.immovable = true;
               
        cubo = tierra.create(i*20, 0, 'wall');
        cubo.scale.setTo(2, 2);
        cubo.body.immovable = true;
        cubo = tierra.create(i*20, 380, 'wall');
        cubo.scale.setTo(2, 2);
        cubo.body.immovable = true;
        
    }
    for(k=1;k<11;k++){
       cubo = tierra.create(380, k*20, 'wall');
        cubo.scale.setTo(2, 2);
        cubo.body.immovable = true;
    }
        for(l=1;l<9;l++){
       cubo = tierra.create(380, 400-l*20, 'wall');
        cubo.scale.setTo(2, 2);
        cubo.body.immovable = true;
    }
    
    pant = game.add.group();
    var lag = pant.create(20, 20, 'ground');
    lag.scale.setTo(2, 2);
    for(k1=1;k1<19;k1++){

        for(j1=1;j1<19;j1++){
        lag = pant.create(20*k1, j1*20, 'ground');
        lag.scale.setTo(2, 2);
        }
        lag = pant.create(20*k1, 20, 'ground');
        lag.scale.setTo(2, 2);
    }
    
    
    player = game.add.sprite(40, 40, 'dude');
    player.scale.setTo(0.33,0.33);
    game.physics.arcade.enable(player);
    
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    scoreText = game.add.text(16, 16, 'Time: 100', { fontSize: '32px', fill: '#FFF' });
    
    doors = game.add.group();
    doors.enableBody = true;
    image = doors.create(380, 220, 'door');
    image.scale.setTo(2,2);
    
    //image.body.immovable = false;
    game.physics.arcade.enable(image);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    
}

function update() {
    
    //Timer
    time -= 1;
    scoreText.text = 'Time: ' + time;

    //  Collide the player and the image with the platforms
    //game.physics.arcade.collide(player, image);
    game.physics.arcade.collide(player, tierra);
    game.physics.arcade.collide(doors, tierra);
    
    
    //game.physics.arcade.collide(player, fondo);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, doors, endGame, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
        
    //Button
    
    button = game.add.button(40, 550, 'down', actionOnClick, this, 2, 1, 0);
    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.scale.setTo(0.25, 0.25);
    
    button1 = game.add.button(110, 550, 'up', actionOnClick1, this, 2, 1, 0);
    button1.onInputOver.add(over1, this);
    button1.onInputOut.add(out, this);
    button1.scale.setTo(0.25, 0.25);
    
    button2 = game.add.button(75, 550, 'right', actionOnClick2, this, 2, 1, 0);
    button2.onInputOver.add(over2, this);
    button2.onInputOut.add(out, this);
    button2.scale.setTo(0.25, 0.25);
    
    button3 = game.add.button(5, 550, 'left', actionOnClick3, this, 2, 1, 0);
    button3.onInputOver.add(over3, this);
    button3.onInputOut.add(out, this);
    button3.scale.setTo(0.25, 0.25);
    
    
    function over() {
        player.body.velocity.y = +300;
    }
    
    function over1() {
        player.body.velocity.y = -300;
    }
    function over2() {
        player.body.velocity.x = +300;
        player.animations.play('right');
    }
    function over3() {
        player.body.velocity.x = -300;
        player.animations.play('left');
    }
    function out() {
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
        a=0;
    }

    function actionOnClick () {
        player.body.velocity.y += 300;
    }
    function actionOnClick1 () {
        player.body.velocity.y -= 300;
    }
    function actionOnClick2 () {
        player.body.velocity.x -= 300;
    }
    function actionOnClick3 () {
        player.body.velocity.x += 300;
    }
    

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');

        
    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
        player.body.velocity.y = -150;

    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
        player.body.velocity.y = 150;

    }
    else
    {
        //  Stand still
        player.animations.stop();
        //?????????//
        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

    
    if (time==0){
        alert("Game Over");
    }
}

function endGame (player, image) {
    
    // Removes the star from the screen
    image.kill();
    alert("You Win");

}
