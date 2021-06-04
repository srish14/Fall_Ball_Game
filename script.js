var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){ // so that the ball stays in div
        character.style.left = left - 2 + "px";
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380) {
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event => {
    if(both == 0) {
        both++;
        if(event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1); 
        }
                //keyword keys to move left and right
        if(event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }
});
  
document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

var blocks = setInterval(function() { 
    var blockLast = document.getElementById("block"+(counter-1)); 
    var gapLast = document.getElementById("gap"+(counter-1));

    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var gapLastTop = parseInt(window.getComputedStyle(gapLast).getPropertyValue("top"));
    }
    
    if(blockLastTop < 400 || counter==0) {
        var block = document.createElement("div");
        var gap = document.createElement("div");
        block.setAttribute("class", "block");
        gap.setAttribute("class", "gap");
        block.setAttribute("id", "block"+counter);
        gap.setAttribute("id", "gap"+counter);
        block.style.top = blockLastTop + 100 + "px"; 
        gap.style.top = gapLastTop + 100 + "px"; 
    
        var random = Math.floor(Math.random() * 360);
        gap.style.left = random + "px"; //creates random bars with properties of gap being random
        
        game.appendChild(block);
        game.appendChild(gap);
        currentBlocks.push(counter);
        counter++;
    }
var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
var drop = 0;

//For game over
if(characterTop <= 0) {
    alert("Game over! Score: " + (counter-9));
    clearInterval(blocks);
    location.reload();
}

    for( var i=0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let igap = document.getElementById("gap"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let igapLeft = parseFloat(window.getComputedStyle(igap).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        igap.style.top = iblockTop - 0.5 + "px";

        if(iblockTop < -20)
        {
            currentBlocks.shift();
            iblock.remove();
            igap.remove();
        }
        if(iblockTop-20 < characterTop && iblockTop > characterTop) {
            drop++;
            if(igapLeft <= characterLeft && igapLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
    }
    if(drop==0) {
        if(characterTop < 480) {
            character.style.top = characterTop + 2 + "px";
        }
    } else {
        character.style.top = characterTop - 0.5 + "px";
    }
} ,1);
