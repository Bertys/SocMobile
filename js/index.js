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

var w=screen.width;
var h=screen.height
//START OF GAME JS
var game = new Phaser.Game(400, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'img/sky.png');
    game.load.image('ground', 'img/platform.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
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
    var ground = platforms.create(0, h-50, 'ground');
    
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    //ground.scale.setTo(25, 1);//(the original sprite is 32x32 in size)

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(Math.floor((Math.random() * 700) + 50), Math.floor((Math.random() * 500) + 50), 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(0.08, 1);

    
    

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 1;
    player.body.bounce.x = 1;
    player.body.gravity.y = 0;
    player.body.gravity.x = 0;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 50; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(Math.floor((Math.random() * 700) + 50), Math.floor((Math.random() * 500) + 50), 'star');
        ledge = platforms.create(Math.floor((Math.random() * 700) + 50), Math.floor((Math.random() * 500) + 50), 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.08, 1);
        
        
        //  Let gravity do its thing
        star.body.gravity.y = 0;
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.body.bounce.x = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    
    //Button
    //game.load.spritesheet('button', 'img/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    //game.load.spritesheet('button1', 'img/right.png', 37, 45, 18);
    function create() {
    var sprite = game.add.sprite(20, 20, 'button');
    var sprite1 = game.add.sprite(20, 20, 'button1');
    var sprite2 = game.add.sprite(20, 20, 'button2');
    var sprite3 = game.add.sprite(20, 20, 'button3');


    }
    var button, button1, button3, button4;
    
    button = game.add.button(game.world.centerX *1.4, 100, 'button', actionOnClick, this, 2, 1, 0);
    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    
    button1 = game.add.button(game.world.centerX *1.4, 50, 'button1', actionOnClick1, this, 2, 1, 0);
    button1.onInputOver.add(over1, this);
    button1.onInputOut.add(out, this);
    
    button2 = game.add.button(game.world.centerX *1.5, 100, 'button2', actionOnClick2, this, 2, 1, 0);
    button2.onInputOver.add(over2, this);
    button2.onInputOut.add(out, this);
    
    button3 = game.add.button(game.world.centerX *1.3, 100, 'button3', actionOnClick3, this, 2, 1, 0);
    button3.onInputOver.add(over3, this);
    button3.onInputOut.add(out, this);
    
    function over() {
        player.body.velocity.y = 300;
        //player.animations.play('right');
    }
    function over1() {
        player.body.velocity.y -= 300;
    }
    function over2() {
        player.body.velocity.x = 300;
        player.animations.play('right');
    }
    function over3() {
        player.body.velocity.x -= 300;
        player.animations.play('left');
    }
    function out() {
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
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

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
