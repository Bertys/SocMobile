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

function loadJSON() { 
    
    var xobj = new XMLHttpRequest();
    xobj.onreadystatechange = function () {
        
          if (xobj.readyState == 4) {
              var myArr = JSON.parse(xobj.responseText);
            myFunction(myArr);
          }
    };
    switch(level) {
    case 1:
        xobj.open("GET", 'mapa1.json', true);
            xobj.send();
        break;
    case 2:
        xobj.open("GET", 'mapa2.json', true);
            xobj.send();
        break;
        case 3:
        xobj.open("GET", 'mapa3.json', true);
            xobj.send();
        break;
    default:
        break;
}         
    
 

 }

    function myFunction(arr) {
    //PINTANDO EL MAPA SEGUN LOS DATOS DEL JSON
        
        
        
        $(document).ready(function() {
            
            for(b=0;b<10;b++){
        if(arr.mapa[b].x1==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(0*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x1==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(0*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x1==2){
                var star = stars.create(Math.floor(b*20), Math.floor(0*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x1==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(0*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                if(arr.mapa[b].x2==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(1*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x2==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(1*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x2==2){
                var star = stars.create(Math.floor(b*20), Math.floor(1*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x2==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(1*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                        if(arr.mapa[b].x3==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(2*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x3==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(2*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x3==2){
                var star = stars.create(Math.floor(b*20), Math.floor(2*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x3==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(2*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                        if(arr.mapa[b].x4==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(3*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x4==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(3*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x4==2){
                var star = stars.create(Math.floor(b*20), Math.floor(b3*20), 'door');
                taculos.body.immovable = false;
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x4==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(3*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                        if(arr.mapa[b].x5==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(4*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x5==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(4*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x5==2){
                var star = stars.create(Math.floor(b*20), Math.floor(4*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x5==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(4*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                        if(arr.mapa[b].x6==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(5*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x6==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(5*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x6==2){
                var star = stars.create(Math.floor(b*20), Math.floor(5*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x6==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(5*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                        if(arr.mapa[b].x7==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(6*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x7==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(6*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x7==2){
                var star = stars.create(Math.floor(b*20), Math.floor(6*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x7==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(6*20), 'ground');
                lag.scale.setTo(2, 2);
            }

                if(arr.mapa[b].x8==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(7*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x8==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(7*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x8==2){
                var star = stars.create(Math.floor(b*20), Math.floor(7*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x8==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(7*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                          if(arr.mapa[b].x9==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(8*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x9==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(8*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x9==2){
                var star = stars.create(Math.floor(b*20), Math.floor(8*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x9==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(8*20), 'ground');
                lag.scale.setTo(2, 2);
            }
                            if(arr.mapa[b].x10==1){
                var cubo = tierra.create(Math.floor(b*20), Math.floor(9*20), 'wall');
                cubo.body.immovable = true;
                cubo.scale.setTo(2, 2);
            }else if(arr.mapa[b].x10==3){
                var taculos = obs.create(Math.floor(b*20), Math.floor(9*20), 'obs');  
                taculos.body.immovable = true;
                taculos.scale.setTo(2, 2);
            }else if(arr.mapa[b].x10==2){
                var star = stars.create(Math.floor(b*20), Math.floor(9*20), 'door');
                star.scale.setTo(2, 2);
            }else if(arr.mapa[b].x10==0){   
                var lag = pant.create(Math.floor(b*20), Math.floor(9*20), 'ground');
                lag.scale.setTo(2, 2);
            }
     
    }
        });
                          }
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////START OF GAME JS///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
var physicalScreenHeight = window.screen.height * window.devicePixelRatio;



function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//var w=screen.width;
//var h=screen.height

var game = new Phaser.Game(400, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('wall', 'img/2.png');
    game.load.image('ground', 'img/1.png');
    game.load.image('door', 'img/3.png');
    game.load.spritesheet('dude', 'img/dude1.png', 32, 48);
    game.load.image('up', 'img/up.png');
    game.load.image('obs', 'img/dude.png');
    game.load.image('down', 'img/down.png');
    game.load.image('right', 'img/right.png');
    game.load.image('left', 'img/left.png');
}


var time = 1000;
var scoreText;

var player;
var tierra;
var pant;
var image;
var obs;
var path;
var level=1;
var stars;
var button,button1,button2,button3;
var cursors;
var i,j,k,l,k1,a,b,c;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //player.animations.add('left', [0, 1, 2, 3], 10, true);
    //player.animations.add('right', [5, 6, 7, 8], 10, true);
    


    loadJSON();
    obs = game.add.group();
    obs.enableBody = true;
    tierra = game.add.group();
    tierra.enableBody = true;
    stars = game.add.group();
    stars.enableBody = true;
    pant = game.add.group();
    
        
        
    player = game.add.sprite(20, 20, 'dude');
    player.scale.setTo(0.5,0.3);
    game.physics.arcade.enable(player);
    
    scoreText = game.add.text(16, 16, 'Time: 1000', { fontSize: '32px', fill: '#FFF' });
    
    cursors = game.input.keyboard.createCursorKeys();  
}
function clean () {

    pant.callAll('kill');
    stars.callAll('kill');
    obs.callAll('kill');
    tierra.callAll('kill');
    }
function update() {
    
    //Timer

        if(time>=0){
    time -= 1;
    scoreText.text = 'Time: ' + time;
    }else if(time==0){
        alert("Game Over");
        time=-1;
    }else if(time==-2){
        scoreText.text = '"You Win"';
    }else{
        scoreText.text = '"Game Over"';
    }
    
    
    //  Collide the player and the image with the platforms
    game.physics.arcade.collide(player, tierra);
    game.physics.arcade.collide(player, obs);
    game.physics.arcade.collide(stars, tierra);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, endGame, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
        
    //Buttons
    
    button = game.add.button(60, 340, 'down', actionOnClick, this, 2, 1, 0);
    button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.scale.setTo(0.25, 0.25);
    
    button1 = game.add.button(130, 340, 'up', actionOnClick1, this, 2, 1, 0);
    button1.onInputOver.add(over1, this);
    button1.onInputOut.add(out, this);
    button1.scale.setTo(0.25, 0.25);
    
    button2 = game.add.button(95, 340, 'right', actionOnClick2, this, 2, 1, 0);
    button2.onInputOver.add(over2, this);
    button2.onInputOut.add(out, this);
    button2.scale.setTo(0.25, 0.25);
    
    button3 = game.add.button(25, 340, 'left', actionOnClick3, this, 2, 1, 0);
    button3.onInputOver.add(over3, this);
    button3.onInputOut.add(out, this);
    button3.scale.setTo(0.25, 0.25);
    
    
    function over() {
        player.body.velocity.y = +100;
    }
    
    function over1() {
        player.body.velocity.y = -100;
    }
    function over2() {
        player.body.velocity.x = +100;
        player.animations.play('right');
    }
    function over3() {
        player.body.velocity.x = -100;
        player.animations.play('left');
    }
    function out() {
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
        a=0;
    }

    function actionOnClick () {
        player.body.velocity.y = +100;
    }
    function actionOnClick1 () {
        player.body.velocity.y = -100;
    }
    function actionOnClick2 () {
        player.body.velocity.x = -100;
    }
    function actionOnClick3 () {
        player.body.velocity.x = +100;
    }
    
    if (time>=0){
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
    
    /*  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -550;
    }*/
    }
    function endGame (player, star) {
        
        level++;
        if(level<=3){
        // Removes the star from the screen
        star.kill();
        time=1000;
        clean();
        loadJSON();
        }else if(level==4){
            alert("YOU ARE THE BEST");
            time=-2;
            level++;
        }
    }
}