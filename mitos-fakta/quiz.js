// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "1. Virus Covid 19 muncul pertama kali di Wuhan, China",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "B"
    },{
        question : "2. Air panas bisa membunuh virus corona",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "A"
    },{
        question : "3. Virus corona dapat menyebabkan kita batuk, bersin dan demam",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "B"
    },{
        question : "4. Minum handsanitizer dapat membuat tubuh kebal terhadap virus corona",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "A"
    },{
        question : "5. Obat untuk covid-19  sudah ditemukan di China",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "A"
    },{
        question : "6. Hampir semua negara sudah terkena penyebaran virus corona",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "B"
    },{
        question : "7. Sinar matahari dapat membunuh virus corona ",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "A"
    },{
        question : "8. Suplemen vitamin dan mineral dapat menyembuhkan Covid-19",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "A"
    },{
        question : "9. Kita harus menggunakan masker ketika berpergian",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "B"
    },{
        question : "1. Virus Covid 19 muncul pertama kali di Wuhan, China",
        choiceA : "Mitos",
        choiceB : "Fakta",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 10;// 10s
const questionTime = 0; 
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count >= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--
    }else{
        count = 10;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 10;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);


    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/4.png" :
              (scorePerCent >= 60) ? "img/3.png" :
              (scorePerCent >= 40) ? "img/2.png" :
              (scorePerCent >= 0) ? "img/1.png" :
              "img/1.png";
    const gambar = "img/hadiah.png"
    scoreDiv.innerHTML ="<h1>"+ "Nilai kamu adalah" +"</h1>";
    scoreDiv.innerHTML += "<img src="+ img +">";
    scoreDiv.innerHTML +="<p>"+ scorePerCent +"%</p>";
    scoreDiv.innerHTML +="<h3>" + "Berapa pun hasilnya, kamu tetap hebat!" + "</h3>";
    scoreDiv.innerHTML +="<h2>" + "Nih aku kasih hadiah buat kamu" + "</h2>";
    scoreDiv.innerHTML +="<a href=" + gambar + ">" + "<button>" + "Klik di sini" + "</button>" + "</a>";
}
