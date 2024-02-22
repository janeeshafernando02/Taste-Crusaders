//selecting all required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const time_text = document.querySelector(".timer .time_left_txt");
const time_count = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(6); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let time_val =  6;
let question_count = 0;
let question_num = 1;
let user_score = 0;
let time_counter;
let counter_line;
let width_value = 0;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

// if restartQuiz button clicked
restartQuiz.onclick = ()=>{
    quizBox.classList.add("activeQuiz"); //show quiz box
    resultBox.classList.remove("activeResult"); //hide result box
    time_val = 6; 
    question_count = 0;
    question_num = 1;
    user_score = 0;
    width_value = 0;
    showQuetions(question_count); //calling showQestions function
    queCounter(question_num); //passing que_numb value to queCounter
    clearInterval(time_counter); //clear counter
    clearInterval(counter_line); //clear counterLine
    startTimer(time_val); //calling startTimer function
    startTimerLine(width_value); //calling startTimerLine function
    time_text.textContent = "Time Left"; //change the text of timeText to Time Left
    footer_nxtBtn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quitQuiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const footer_nxtBtn = document.querySelector("footer .next_btn");
const ques_counter_Inbottom = document.querySelector("footer .total_que");

// if Next Que button clicked
footer_nxtBtn.onclick = ()=>{
    if(question_count < questions.length - 1){ //if question count is less than total question length
        question_count++; //increment the que_count value
        question_num++; //increment the que_numb value
        showQuetions(question_count); //calling showQestions function
        queCounter(question_num); //passing que_numb value to queCounter
        clearInterval(time_counter); //clear counter
        clearInterval(counter_line); //clear counterLine
        startTimer(time_val); //calling startTimer function
        startTimerLine(width_value); //calling startTimerLine function
        time_text.textContent = "Time Left"; //change the timeText to Time Left
        footer_nxtBtn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(time_counter); //clear counter
        clearInterval(counter_line); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const display_que = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let queTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    display_que.innerHTML = queTag; //adding new span tag inside que_tag
    optionList.innerHTML = optionTag; //adding new div tag inside option_tag
    
    const option = optionList.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIcon_tag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon_tag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(time_counter); //clear counter
    clearInterval(counter_line); //clear counterLine
    let user_ans = answer.textContent; //getting user selected option
    let correct_ans = questions[question_count].answer; //getting correct answer from array
    const all_options = optionList.children.length; //getting all option items
    
    if(user_ans == correct_ans){ //if user selected option is equal to array's correct answer
        user_score += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIcon_tag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + user_score);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIcon_tag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < all_options; i++){
            if(optionList.children[i].textContent == correct_ans){ //if there is an option which is matched to an array answer 
                optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon_tag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < all_options; i++){
        optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    footer_nxtBtn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    infoBox.classList.remove("activeInfo"); //hide info box
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show result box
    const scoreText = resultBox.querySelector(".score_text");
    /*
    if reTag;  //adding new span tag inside score_Text
    }
    else if(user_score > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ user_score +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ user_score +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }*/
    if(user_score == 0 ){ //if user marks equals 5
        let scoreTag = '<span>Sorry!😐 , You got only <p>'+ user_score +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; //Ading new span tag inside mark text 
    }
    else if(user_score > 1 && user_score < 5 ){ //If user score less than 5 and more than 1
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Good try!🙂 , You got <p>'+ user_score +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; //Ading new span tag inside mark text
    }

    else if(user_score > 5 && user_score < 10 ){ //if user marks equals 5 and less than 10
        let scoreTag = '<span>Nice try!🤗 , You got <p>'+ user_score +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; //Ading new span tag inside mark text 
    }
    else if(user_score == 10){
        let scoreTag = '<span>Excellent!😎 , You got <p>'+ user_score +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag; //Ading new span tag inside mark text  
    }
}

function startTimer(time){
    time_counter = setInterval(timer, 1500);
    function timer(){
        time_count.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        
        let addZero = time_count.textContent; 
        time_count.textContent = "0" + addZero; //add a 0 before time value
        
        if(time < 0){ //if timer is less than 0
            clearInterval(time_counter); //clear counter
            time_text.textContent = "Time Off"; //change the time text to time off
            const all_options = optionList.children.length; //getting all option items
            let correct_ans = questions[question_count].answer; //getting correct answer from array
            for(i=0; i < all_options; i++){
                if(optionList.children[i].textContent == correct_ans){ //if there is an option which is matched to an array answer
                    optionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon_tag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < all_options; i++){
                optionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            footer_nxtBtn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counter_line = setInterval(timer, 29);
    function timer(){
        time += 1.5; //upgrading time value with 1
        timeLine.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counter_line); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQue_countTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    ques_counter_Inbottom.innerHTML = totalQue_countTag;  //adding new span tag inside bottom_ques_counter
}