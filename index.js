var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');
var $recordsList = document.querySelector('#records-list');
var $recordsTime = document.querySelector('#records-time');
var score = 0;
var isGameStarted = false;
var records2D = [[], []];

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame(){
    score = 0;
    setGameTime();
    $gameTime.setAttribute('disabled', 'true');
    $timeHeader.classList.remove('hide');
    $resultHeader.classList.add('hide')
    isGameStarted = true;
    $game.style.backgroundColor = '#fff';
    $start.classList.add('hide');

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent);

        if(time <= 0){
            clearInterval(interval);
            endGame();
        }else{
            $time.textContent = (time - 0.1).toFixed(1);
        }
    }, 100)
    renderBox();
}

function endGame(){
    isGameStarted = false;
    setGameScore();

    var d = new Date();
    let recordTime = '(' + getStringDate(d.getHours()) + ':' + getStringDate(d.getMinutes()) + ':' + getStringDate(d.getSeconds()) +' ' + getStringDate(d.getDate()) + '.' + getStringDate(d.getMonth() + 1) + '.' + getStringDate(d.getFullYear()) + ')';
    records2D.push([score, recordTime]);
    records2D.sort(sortFunction);
    
    setRecord();
    $gameTime.removeAttribute('disabled');
    $start.classList.remove('hide');
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc'
    $timeHeader.classList.add('hide');
    $resultHeader.classList.remove('hide')
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

function setGameScore(){
    $result.textContent = score.toString();
}

function setRecord(){
    var time = parseInt($gameTime.value);
    console.log(time);
    $recordsList.innerHTML = '';

    let records = [];
    let result = '';
    for (let i = 0; i < records2D.length; i++) {
        var innerArrayLength = records2D[i].length;
        for (let j = 0; j < innerArrayLength; j++) {
            if(records2D[i][j] != undefined){
                result += records2D[i][j] + ' ';
                result.replace('undefined','');
            }
        }
        console.log(result[0]);
        records[i] = result;
        result = '';
    }
    
    records.shift();
    records.shift();
    
    for(let i = 0; i < 3; i++){
        if(records[i] != undefined){
            if(records[i] != ''){
                var newTextNode = document.createTextNode(records[i]);
                var newListItem = document.createElement("li");
                newListItem.appendChild(newTextNode);
                newListItem.className = 'li';
                $recordsList.appendChild(newListItem)
            }
        }
    }
}

function getStringDate(someDate){
    return someDate < 10 ? '0' + someDate : someDate;
}

function setGameTime(){
    var time = parseInt($gameTime.value);
    $time.textContent = time.toFixed(1);
    $recordsTime.textContent = time.toFixed(0);
}

function handleBoxClick(event){
    if(!isGameStarted){
        return;
    }
    if(event.target.dataset.box){
        score++;
        renderBox();
    }
}

function renderBox(){
    $game.innerHTML = '';
    var box = document.createElement('div');
    var boxSize = getRandom(20, 70);
    var gameSize = $game.getBoundingClientRect();

    var maxTop = gameSize.height - boxSize;
    var maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.backgroundColor = getRandomColor();
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.cursor = 'pointer';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(max, min){
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}