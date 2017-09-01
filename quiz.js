function Question(inquiry, pickAnswer, correctAnswer) {
    this.inquiry = inquiry;
    this.pickAnswer = pickAnswer;
    this.correctAnswer = correctAnswer;
}

Question.prototype.checkAnswer = function (pick) {
    return this.correctAnswer === pick;
};

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if(this.getCurrentQ().checkAnswer(answer)) {
        this.score++;
    }
    this.currentQIndex++;
};

Quiz.prototype.getCurrentQ = function() {
    return this.questions[this.currentQIndex];
};

Quiz.prototype.finished = function() {
    return this.currentQIndex >= this.questions.length;
};

var QuizInterface = {
    showNextQ: function () {
        if (quiz.finished()) {
            this.scoreDisplay();
        } else {
            this.qDisplay();
            this.asnwersToPickDisplay();
            this.advanceDisplay();
        }
    },
    qDisplay: function() {
        this.insertHtmlToAnId("question", quiz.getCurrentQ().inquiry);
    },
    asnwersToPickDisplay: function() {
        var alternative = quiz.getCurrentQ().pickAnswer;

        for(var i = 0; i < alternative.length; i++) {
            this.insertHtmlToAnId("option" + i, alternative[i]);
            this.guessHandler("pick" + i, alternative[i]);
        }
    },
    scoreDisplay: function() {
        var gameOverHTML = "<h1>Game Over</h1>";
        gameOverHTML += "<h2> Your score is: " + quiz.score + "</h2>";
        this.insertHtmlToAnId("quiz", gameOverHTML);
    },
    insertHtmlToAnId: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizInterface.showNextQ();
        }
    },
    advanceDisplay: function() {
        var currentQuestionNumber = quiz.currentQIndex + 1;
        this.insertHtmlToAnId("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};

var questions = [
    new Question("What is the best console?", [ "Playstation", "Nintendo Wii" ], "Playstation"),
    new Question("What is more important in life?", ["Sword","Excellent education"], "Sword"),
    new Question("What is the most popular home music production studio?", ["FL Studio","Traktor"], "FL Studio"),
    new Question("Which of the two has shorter breaking distance?", ["Car","Motorcycle"], "Motorcycle"),
];

var quiz = new Quiz(questions);

QuizInterface.showNextQ();