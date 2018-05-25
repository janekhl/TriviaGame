$(document).ready(function() {
    var index = 0;
    var intervalId;
	var countdown = {
		time : 10,
		reset: function() {
			this.time = 10;
			$("#count-down").html("<h2>Seconds Left: " + countdown.time + "</h2>");
		},
		start: function() {
            clearInterval(intervalId);
            intervalId = setInterval(countdown.decrement, 1000);
		},
		stop: function() {
			clearInterval(intervalId);
		},
		decrement: function() {
			countdown.time --;
			if (countdown.time >= 0) {
				$("#count-down").html("<h2>Seconds Left: " + countdown.time + "</h2>");
			}
			else {
                index++;
                alert ("Time Up Dummy!")
				answerWrong();
				countdown.reset();
				if (index < trivia.length) {
					loadQuestion(index);
				} else {
					$(".choice").hide();
					showScore();
				}
			}
		}
    };

    var trivia = [
        { q: "Thor is the God of Coding", options: ["t", "f"], answer:"f"},
        { q: "Batman is the strongest Avenger", options: ["t", "f"], answer:"f" },
        { q: "Hawkeye is relevant", options: ["t", "f"], answer:"f" },
        { q: "Baby Groot is dead", options: ["t", "f"], answer:"t" },
        { q: "Bruce Banner is the hottest Avenger", options: ["t", "f"], answer:"t"},
        { q: "Thanos's logic kinda makes sense", options: ["t", "f"], answer:"t" },
        { q: "Thanos is garbage though", options: ["t", "f"], answer:"t" },
        { q: "Spiderman's death wasn't heartbreaking in the slightest", options: ["t", "f"], answer:"f" }
      ];
    var correct=0;
    var incorrect=0;
    var unanswered;



    function setup() {
        var index = 0;
        $('#start').on('click', function() {
            $(this).hide();
            countdown.start();
            loadQuestion(index);
        });
    }		
    function loadQuestion(questionSelection) {
        countdown.reset();
        $(".question").html("<h3>" + trivia[questionSelection].q + "</h3>");
        $("#true").text(trivia[questionSelection].options[0]).show();
        $("#false").text(trivia[questionSelection].options[1]).show();
    }

    function getAnswer() {

        $('.choice').on('click', function() {
            index++;
            $(".question").text('');
            $("#true").text('');
            $("#false").text('');
            loadQuestion();
        })
    }

    function answerCorrect() {
        correct++;
        alert("Ya Got It!");
    }

    function answerWrong() {
        incorrect++;
        alert("BOO FAIL!");
    }

    function showScore() {
        $('.question').empty();
        $('#results').append("<h2><p>" + correct + " correct</p></h2>");
        $('#results').append("<h2><p>" + incorrect + " incorrect</p></h2>");
        countdown.stop();
        $('#countdown').empty();
    }
    setup();
    $('.choice').on('click', function() {
        if(this.id === 'true') {
            var userChoice = 't';
        } else if(this.id === 'false') {
            userChoice = 'f';
        } 
        console.log(userChoice);
        if (userChoice === (trivia[index].answer)) {
            answerCorrect();
        } else {
            answerWrong();
        }
        
        $(".question").text('');
        $("#true").text('');
        $("#false").text('');
        index++;
        if (index < trivia.length) {
            loadQuestion(index);
        } else {
            $(".choice").hide();
            showScore();
    }
    });
});
