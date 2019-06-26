//
//Финальная версия на конкурс
//
var canvas=document.getElementById('GameCanvas');
var ctx=canvas.getContext('2d');
var playerDirection=1;
var pomoika=0;
var pomoikaHandler=0;
var playerX=200;
var playerXDouble;
var playerY=400;
var playerYDouble;
var globalX=0;
var globalY=0;
var kek=0;
var keky=0;
var world=[];
var rightPressed=false;
var leftPressed=false;
var upPressed=false;
var downPressed=false;
var takePressed=false;
var pausePressed=false;
var chunkY=0;
var chunkX=0;
var chunkParseCordX=0;
var chunkParseCordY=0;
var supportStade=0;
var big;
var bigy;
var initBlock;
var initBlock2;
var pause;
var gameOnPause=false;
//Загрузка ресурсов игры
var dirtImg=new Image();
var grassImg=new Image();
var stoneBigImg=new Image();
var stoneSmallImg=new Image();
var streetImg=new Image();
var treeImg=new Image();
var fire1Img=new Image();
var fire2Img=new Image();
var pers=new Image();
var trashDirtImage=new Image();
var trashImg=new Image();


var rand=randomInteger(1,6);

switch (rand) {
  case 1:
    pers.src='Src/Player_Models/panda.png';
  break;
  case 2:
    pers.src='Src/Player_Models/penguin.png';
  break;
  case 3:
    pers.src='Src/Player_Models/people1.png';
  break;
  case 4:
    pers.src='Src/Player_Models/people2.png';
  break;
  case 5:
    pers.src='Src/Player_Models/people3.png';
  break;
  case 6:
    pers.src='Src/Player_Models/pig.png';
  break;
}
trashImg.src='Src/trash/trash.png';
fire1Img.src='Src/fire/fire1.png';
fire2Img.src='Src/fire/fire2.png';
dirtImg.src='Src/World/dirt.png';
grassImg.src='Src/World/grass.png';
stoneBigImg.src='Src/World/stone_big.png';
stoneSmallImg.src='Src/World/stone_small.png';
streetImg.src='Src/World/street.png';
treeImg.src='Src/World/tree.png';
trashDirtImage.src='Src/trash/trashDirt.png';

function randomInteger(min, max) {
  //генерация случайных чисел
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  var keycode=e.keyCode;
  if (keycode==70){
    takePressed=true;
  }
  if (keycode==87){
    upPressed=true;
    playerDirection=1;
  }
  if (keycode==83){
    downPressed=true;
    playerDirection=2;
  }
  if (keycode==65){
    leftPressed=true;
    playerDirection=3;
  }
  if (keycode==68){
    rightPressed=true;
    playerDirection=4;
  }
  if (keycode==27){
    pausePressed=true;
  }
}
function keyUpHandler(e){
  var keycode=e.keyCode;
  if (keycode==70){
    takePressed=false;
  }
  if (keycode==87){
    upPressed=false;
  }
  if (keycode==83){
    downPressed=false;
  }
  if (keycode==65){
    leftPressed=false;
  }
  if (keycode==68){
    rightPressed=false;
  }
  if (keycode==27){
    pausePressed=false;
  }
}

function genChunk(type){
  //функция генерации чанков
  if (type=="svalka"){
    //чанк свалки
    var k=0;
    while (k<128){
      if (k%2==0){
        world.push('trashDirt');
      }else{
        world.push('fire');
      }
      k+=1;
    }
  }
  if (type=="forest"){
    //чанк леса
    var k=0;
    while (k<128){
      if (k%2==0){
        world.push('grass');
      }else{
        var rand=randomInteger(1, 4);
        if (rand<=2){
          world.push('tree');
        }else{
          world.push('clear');
        }
      }
      k+=1;
    }
  }
  if (type="pole"){
    //чанк поля
    var k=0;
    while (k<128){
      if (k%2==0){
        var rand=randomInteger(1,3);
        if (rand==1){
          world.push('grass');
        }
        if (rand==2){
          world.push('grass');
        }
        if (rand==3){
          world.push('street');
        }
      }else{
        var rand=randomInteger(1,10);
        if (rand==1){
          world.push('smallStone');
        }
        if (rand==2){
          world.push('bigStone');
        }
        if (rand==3){
          world.push('trash');
        }
        if (rand>3){
          world.push('clear');
        }
      }
      k+=1;
    }
  }
}

function chekBlockUnderPlayer(){
  //функция высчитывания блока под игроком
  var blockNumber=0;
  chunkY=(globalY+playerY)/50;
  chunkX=(globalX+playerX)/50;
  chunkParseCordX=parseInt(chunkX/8);
  chunkParseCordY=parseInt(chunkY/8);
  big=chunkParseCordX*8*8*8*2;
  bigy=chunkParseCordY*8*8;
  big=big+bigy;
  chunkParseCordX=parseInt(chunkX%8)*2*8;
  chunkParseCordY=parseInt(chunkY%8)*2;
  blockNumber=big+bigy+chunkParseCordX+chunkParseCordY;
  return blockNumber;
}

function gameStart(){
  if (!gameOnPause){
    //обнуляем игру
    playerDirection=1;
    pomoika=0;
    pomoikaHandler=0;
    playerX=200;
    playerY=400;
    globalX=0;
    globalY=0;
    kek=0;
    keky=0;
    world=[];
    rightPressed=false;
    leftPressed=false;
    upPressed=false;
    downPressed=false;
    takePressed=false;
    supportStade=0;
    chunkY=0;
    chunkX=0;
    chunkParseCordX=0;
    chunkParseCordY=0;
    big;
    bigy;
    initBlock;
    initBlock2;
    //генерация мира
    var i=0;
    while (i<64){
      if (i==0){
        genChunk("svalka");
      }else{
        var rand=randomInteger(1, 2);
        if (rand==1){
          genChunk("forest");
        }
        if (rand==2){
          genChunk("pole");
        }
      }
      i+=1;
    }
    document.getElementById('contents').style.display="none";
    canvas.style.display="block";
    pause=setInterval(draw, 10);
  }else{
    gameResume();
  }
}

function drawSupport(supportText){
  ctx.beginPath();
  ctx.font = "22px italic";
  ctx.strokeStyle="white";
  ctx.strokeText(supportText, 10, canvas.height-20);
  ctx.closePath();
}

function gamePause(){
  clearInterval(pause);
  document.getElementById('startBtnMenu').value="Продолжить";
  document.getElementById('nickname').style.display="none";
  gameOnPause=true;
  canvas.style.display="none";
  document.getElementById('contents').style.display="block";
}

function gameResume(){
  pause=setInterval(draw, 10);
  gameOnPause=false;
  document.getElementById('contents').style.display="none";
  canvas.style.display="block";
}

function drawScore(){
  var text="Вы сдали на свалку "+pomoika+" мешков мусора.";
  ctx.beginPath();
  ctx.font = "22px italic";
  ctx.fillStyle="white";
  ctx.fillText(text, 10, 20);
  ctx.closePath();
}

function drawWorld(){
  var blockSquad=1;
  //прорисовка мира
  var cordX=0;
  var cordY=0;
  // координаты отрисовки
  var kx=0;
  var ky=0;
  //координаты чанка
  var bx=0;
  var by=0;
  //координаты блока
  var cycle=0;
  while (cycle<6400){
        cordX=bx*50+kek;
        cordY=by*50+keky;
        cordY=cordY+ky*400;
        cordX=cordX+kx*400;
        var tpchunk=world[cycle];
        if (tpchunk=='trash'){
          ctx.beginPath();
          ctx.drawImage(trashImg, cordX+10, cordY+10, 30, 30);
          ctx.closePath();
        }
        if (tpchunk=='trashDirt'){
          ctx.beginPath();
          ctx.drawImage(trashDirtImage, cordX, cordY, 50, 50);
          ctx.closePath();
        }
        if (tpchunk=='dirt'){
            ctx.beginPath();
            ctx.drawImage(dirtImg,cordX, cordY, 50, 50);
            ctx.closePath();
        }
        if (tpchunk=='fire'){
            var sleewqe=randomInteger(1,2);
            if (sleewqe==1){
              ctx.beginPath();
              ctx.drawImage(fire1Img,cordX, cordY, 50, 50);
              ctx.closePath();
            }
            if (sleewqe==2){
              ctx.beginPath();
              ctx.drawImage(fire2Img,cordX, cordY, 50, 50);
              ctx.closePath();
            }
          }
          if (tpchunk=='grass'){
            ctx.beginPath();
            ctx.drawImage(grassImg,cordX, cordY, 50, 50);
            ctx.closePath();
          }
          if (tpchunk=='tree'){
            ctx.beginPath();
            ctx.drawImage(treeImg,cordX, cordY, 50, 50);
            ctx.closePath();
          }
          if (tpchunk=='street'){
            ctx.beginPath();
            ctx.drawImage(streetImg,cordX, cordY, 50, 50);
            ctx.closePath();
          }
          if (tpchunk=='smallStone'){
            ctx.beginPath();
            ctx.drawImage(stoneSmallImg,cordX, cordY, 50, 50);
            ctx.closePath();
          }
          if (tpchunk=='bigStone'){
            ctx.beginPath();
            ctx.drawImage(stoneBigImg,cordX, cordY, 50, 50);
            ctx.closePath();
          }
        if (blockSquad==2){
          if (by==7){
            if (bx==7){
              if (ky==7){
                if (kx==7){
                  //конец
                }else{
                  kx+=1;
                  ky=0;
                  bx=0;
                  by=0;
                }
              }else{
                ky+=1;
                bx=0;
                by=0;
              }
            }else{
              by=0;
              bx+=1;
            }
          }else{
            by+=1;
          }
          blockSquad=1;
        }else{
          blockSquad+=1;
        }
        cycle+=1;
    }
    cycle=0;
}

function drawPers(){
  ctx.beginPath();
  ctx.drawImage(pers, playerX, playerY, 49, 49);
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (pausePressed){
    gamePause();
  }
  if (supportStade==0 & playerX!=200 & playerY!=400){
    supportStade+=1;
  }
  if (supportStade==1 & pomoikaHandler>0){
    supportStade+=1;
  }
  if (supportStade==2 & pomoika>0){
    supportStade+=1;
  }

  if (upPressed){
    initBlock=chekBlockUnderPlayer();
    initBlock+=1;
    playerX+=45;
    initBlock2=chekBlockUnderPlayer();
    initBlock2+=1;
    playerX-=45;
    if (world[initBlock]=='clear' && world[initBlock2]=='clear'){
      if (playerY<50){
        if (globalY>0){
          globalY-=2;
          keky+=2;
        }
      }else{
        playerY-=2;
      }
    }
    initBlock=chekBlockUnderPlayer();
    if (world[initBlock]=='trashDirt'){
      pomoika+=pomoikaHandler;
      pomoikaHandler=0;
    }
  }
  if (downPressed){
    playerY+=45;
    initBlock=chekBlockUnderPlayer();
    initBlock+=1;
    playerX+=45;
    initBlock2=chekBlockUnderPlayer();
    initBlock2+=1;
    playerX-=45;
    playerY-=45;
    if (world[initBlock]=='clear' && world[initBlock2]=='clear'){
      if (playerY>700){
        if (globalY<1200){
          keky-=2;
          globalY+=2;
        }
      }else{
        playerY+=2;
      }
    }
  }
  if (leftPressed){
    initBlock=chekBlockUnderPlayer();
    initBlock+=1;
    playerY+=45;
    initBlock2=chekBlockUnderPlayer();
    initBlock2+=1;
    playerY-=45;
    if (world[initBlock]=='clear' && world[initBlock2]=='clear'){
      if (playerX<50){
        if (globalX>0){
          kek+=2;
          globalX-=2;
        }
      }else{
        playerX-=2;
      }
    }
    initBlock=chekBlockUnderPlayer();
    if (world[initBlock]=='trashDirt'){
      pomoika+=pomoikaHandler;
      pomoikaHandler=0;
    }
  }
  if (rightPressed){
    playerX+=45;
    initBlock=chekBlockUnderPlayer();
    initBlock+=1;
    playerY+=45;
    initBlock2=chekBlockUnderPlayer();
    initBlock2+=1;
    playerY-=45;
    playerX-=45;
    if (world[initBlock]=='clear' && world[initBlock2]=='clear'){
      if (playerX>1400){
        if (globalX<800){
          kek-=2;
          globalX+=2;
        }
      }else{
        playerX+=2;
      }
    }
  }
  if (takePressed){
    playerXDouble=playerX;
    playerYDouble=playerY;
    //с помощью дублёров запоминаем исходное состояние координат
    //для того, чтоб после обработски вернуть их в исходное состояние
    playerX+=25;
    playerY+=25;
    //далее берём центральные координаты игрока
    //и отталкиваясь он них будем искать нужный блок
    switch (playerDirection) {
      case 1:
        //при направлении вверх
        playerY-=50;
      break;
      case 2:
        //при направлении вниз
        playerY+=50;
      break;
      case 3:
        //при направлении влево
        playerX-=50;
      break;
      case 4:
        //при направлении вправо
        playerX+=50;
      break;
    }

    initBlock=chekBlockUnderPlayer();
    initBlock+=1;
    //получаем координаты нужного блока
    if (world[initBlock]=='trash'){
      pomoikaHandler+=1;
    }
    world[initBlock]='clear';
    playerX=playerXDouble;
    playerY=playerYDouble;
    //восстанавливаем координаты из дублёров
  }
  drawWorld();
  drawPers();
  drawScore();
  switch (supportStade){
    case 0:
      drawSupport("Используйте WASD для перемещения по карте");
    break;
    case 1:
      drawSupport("Ваша цель-собрать мусор. Для этого подойдите к мусорному пакету и нажмите F. Мусор уничтожается в направлении движения.");
    break;
    case 2:
      drawSupport("Далее необходимо отнести мусор на свалку(к огню). Сверху слева написано, сколько мешков вы уже доставили");
    break;
    case 3:
      drawSupport("Для установки паузы нажмите ESC");
    break;
  }
}
