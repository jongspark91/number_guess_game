//게임 로직
// 랜덤 번호 지정
// 유저가 번호를 입력 그리고 go 버튼 클릭
// 만약 유저가 랜덤 번호를 맞추면: 맞췄습니다!
// 랜덤번호 < 유저번호: Down!
// 랜덤번호 > 유저번호: up!!
// reset버튼을 누르면 게임이 리셋
// 5번 기회를 다 쓰면 게임이 끝 (더이상 추측 불가, 버틴 disabled)
// 유저가 1~100 초과의 숫자를 입력하면 알려주고 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려주고 기회를 깍지안는다

let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = [];
playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){
    userInput.value = "";
})
function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log(computerNum)
}
pickRandomNum()

function play(){
    let userValue = userInput.value;

    if (userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해 주세요"
        return;
    } 
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력해주세요"
        return;
    }
    chances -- ;
    chanceArea.textContent = `Chances Count: ${chances}`
    console.log("찬스 횟수", chances)
    if (userValue < computerNum){
        resultArea.textContent = "Up!!!"
    }else if(userValue>computerNum){
        resultArea.textContent = "Down!!"
    }else{
        resultArea.textContent = "Correct!!"
        gameOver = true
    }

    history.push(userValue)

    if (chances<1){
        gameOver = true
    }
    if (gameOver == true){
        playButton.disabled = true
    }
}

function reset(){
    //user input창이 정리되고
    userInput.value = "";
    // 새로운 번호가 생성되고
    pickRandomNum();
    resultArea.textContent = "결과값이 여기 나옵니다"
    // 
}