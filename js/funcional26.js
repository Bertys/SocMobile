/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var w=screen.width;
var h=screen.height
//START OF GAME JS
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'img/sky.png');
    game.load.image('ground', 'img/plat1.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    game.load.image('up', 'img/up.png');
    game.load.image('down', 'img/down.png');
    game.load.image('right', 'img/right.png');
    game.load.image('left', 'img/left.png');
}

var player;
var platforms;
var cursors;
var doors;
var time = 1000;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    //var ground = platforms.create(0, game.world.height - 64, 'ground');
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(25, 2);
    //ground.scale.setTo(25, 1);//(the original sprite is 32x32 in size)

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    
    //  Now let's create the 4 walls
    var ledge = platforms.create(0, 0, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1, 18.75);
    ledge = platforms.create(game.world.width - 32, 0, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1, 18.75);
    ledge = platforms.create(0, 0, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(25, 1);
    
    
    //  Now let's create some ledges
    //var ledge = platforms.create(Math.floor((Math.random() * 700) + 50), Math.floor((Math.random() * 500) + 50), 'ground');
    //ledge.body.immovable = true;
    //ledge.scale.setTo(0.08, 1);

    
    

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 250, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 1;
    player.body.bounce.x = 1;
    player.body.gravity.y = 0;
    player.body.gravity.x = 0;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left1', [0, 1, 2, 3], 10, true);
    player.animations.add('right1', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    doors = game.add.group();

    //  We will enable physics for any star that is created in this group
    doors.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    //for (var i = 0; i < 500; i++)
    //{
        //Math random entre 1 y 6
        //Math.floor(Math.random() * 6) + 1  
        
        //  Create a star inside of the 'stars' group
        var door = doors.create(750, 300, 'star');
        ledge.body.immovable = true;
        ledge.scale.setTo(25, 2);
        
        
        //  Let gravity do its thing
        //star.body.gravity.y = 0;
        //  This just gives each star a slightly random bounce value
        //star.body.bounce.y = 0.7 + Math.random() * 0.2;
        //star.body.bounce.x = 0.7 + Math.random() * 0.2;
    //}

    //  The score
    scoreText = game.add.text(16, 16, 'Time: 100', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {
    
    //Timer
    time -= 1;
    scoreText.text = 'Time: ' + time;

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(doors, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, doors, endGame, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    
    //Button

    //game.load.spritesheet('button', 'img/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    //game.load.spritesheet('button1', 'img/right.png', 37, 45, 18);
    //var up, down, right, left;
    
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
        player.animations.play('right1');
    }
    function over3() {
        player.body.velocity.x = -300;
        player.animations.play('left1');
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
        player.animations.play('left1');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right1');

        
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

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

    
    if (time==0){
        alert("You Loose");
    }
}

function endGame (player, door) {
    
    // Removes the star from the screen
    door.kill();
    alert("You Win");

    //  Add and update the score
    //score += 10;
    //scoreText.text = 'Score: ' + score;

}
