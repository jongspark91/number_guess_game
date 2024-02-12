// 사이트 접속시 1~100의 랜덤한 숫자 부여
// 사용자가 1~100의 숫자 입력 후 Go 클릭
// 숫자가 랜덤숫자보다 크면: Down!!, chance 차감
// 숫자가 랜덤숫자보다 작으면: Up!!, chance 차감
// 숫자가 맞으면: Correct
// 숫자가 1~100범위가 넘어가면: 1~100사이의 범위를 입력해주세요, chance 미차감
// Chance 숫자가 <1 되면: 실패! 마셔라 마셔라! go버튼 disabled
// 리셋버튼 클릭시 랜덤숫자와 chance 초기화

let randomNum = 0
let resultArea = document.getElementById("result-area")
let userValue = document.getElementById("user-value")
let playButton = document.getElementById("play-button")
let chanceArea = document.getElementById("chance-area")
let resetButton = document.getElementById("reset-button")
let starArea = document.getElementById("star-area")
let imgArea = document.getElementById("img-area")
let answerArea = document.getElementById("answer-area")
let chanceCnt = 5
let gameOver = false
let history = []
let gameWon = false
playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userValue.addEventListener("focus", function(){
    userValue.value = ""})
updateStars()

function generateRandomNum(){
    randomNum = Math.floor(Math.random()*100)+1;
    console.log(randomNum)
}
generateRandomNum()

function play(){
    let userInput = userValue.value;
    if(userInput > 100 || userInput<1){
        resultArea.textContent = "Input number between 1 and 100!";
        return;
    }
    if(history.includes(userInput)){
        resultArea.textContent = `You already tried ${userInput}`;
        return;
    }
    if(userInput < randomNum){
        console.log("up")
        resultArea.textContent = "Up!! Koopa has stolen a star!!"
        imgArea.src = "koopa_gains_star.jpg"
        chanceCnt --;
        starArea.src = updateStars()
        history.push(userInput)
        chanceArea.textContent = `Stars left: ${chanceCnt}`
    }else if(userInput > randomNum){
        console.log("down")
        resultArea.textContent = "Down!! Koopa has stolen a star!!"
        imgArea.src = "koopa_gains_star.jpg"
        chanceCnt --;
        starArea.src = updateStars()
        history.push(userInput)
        chanceArea.textContent = `Stars left: ${chanceCnt}`
    }else{
        resultArea.textContent = "Correct!! Koopa has been defeated"
        imgArea.src = "mario_win.jpg"
        playButton.disabled = true
        gameOver = true
        gameWon = true
    }
    if(chanceCnt<1){
        gameOver = true
    }
    if(gameOver === true && gameWon === false){
        resultArea.textContent = "Koopa stole 5 stars!! Mario has been defeated!"
        answerArea.textContent = `The answer was ${randomNum}`
        playButton.disabled = true
        imgArea.src = "koopa_win.jpg"
    }
}

function reset(){
    userValue.value = ""
    imgArea.src = "https://pbs.twimg.com/media/E4eJSVNUYAEiM9t?format=jpg&name=4096x4096"
    generateRandomNum();
    resultArea.textContent = "Mario will be defeated if Koopa steals 5 stars!"
    chanceCnt = 5
    chanceArea.textContent = `Stars left: ${chanceCnt}`
    gameOver = false
    playButton.disabled = false
    answerArea.textContent = ""
    history = []
    updateStars()
    return;
}

function updateStars() {
    const starsContainer = document.getElementById('star-area');
    starsContainer.innerHTML = ''; // 이전 하트들을 지움
    for (let i = 0; i < chanceCnt; i++) {
        starsContainer.insertAdjacentHTML("beforeend", `<img src = "mario_star.png" class = "star-size" >`)
    }
}
