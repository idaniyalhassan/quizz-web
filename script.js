$(document).ready(function() {
    const questions = [
        {
            question: "What color is the sky?",
            options: ["Blue", "Red", "Green", "Yellow"],
            answer: "Blue"
        },
        {
            question: "How many Legs of a Cat?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is 2 plus 7?",
            options: ["10", "15", "9", "27"],
            answer: "9"
        },
        {
            question: "Man has _____ Eyes?",
            options: ["2", "4", "8", "3"],
            answer: "2"
        },
        {
            question: "Man has _____ Nose?",
            options: ["2", "4", "1", "3"],
            answer: "1"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let selectedOptions = new Array(questions.length).fill(null);

    function showQuestion() {
        const question = questions[currentQuestion];
        $('.question').text(question.question);
        $('.option').each(function(index) {
            $(this).text(question.options[index]).removeClass('selected correct incorrect');
            if (selectedOptions[currentQuestion] === question.options[index]) {
                $(this).addClass('selected');
            }
        });
        updateProgressBar();
        updateQuestionNumber();
        updateButtons();
    }

    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        $('.progress-bar div').css('width', progress + '%');
    }

    function updateQuestionNumber() {
        $('.question-number').text(`Question ${currentQuestion + 1} of ${questions.length}`);
    }

    function updateButtons() {
        if (currentQuestion === 0) {
            $('#prev-btn').prop('disabled', true);
        } else {
            $('#prev-btn').prop('disabled', false);
        }

        if (currentQuestion === questions.length - 1) {
            $('#next-btn').text('Submit');
        } else {
            $('#next-btn').text('Next');
        }
    }

    function showResults() {
        $('.score').text(`Obtained Marks: ${score}/${questions.length}`);
        const scorebar = (score / questions.length) * 100;
        $('.score-perc').text(`${scorebar}%`);
        $('.score-bar div').css('width', scorebar + '%');
        $('.quiz-screen').hide();
        $('.results-screen').show();
    }

    $('#start-btn').click(function() {
        $('.welcome-screen').hide();
        $('.quiz-screen').show();
        showQuestion();
    });

    $('.option').click(function() {
        selectedOptions[currentQuestion] = $(this).text();
        $('.option').removeClass('selected');
        $(this).addClass('selected');

    setTimeout(() => {
        if (currentQuestion === questions.length - 1) {
            if (confirm("Are you sure you want to submit your answers?")) {
                for (let i = 0; i < questions.length; i++) {
                    if (selectedOptions[i] === questions[i].answer) {
                        score++;
                    }
                }
                showResults();
            }
        } else {
            currentQuestion++;
            $('.option').blur();
            showQuestion();
        }
    }, 500); // Delay to allow the user to see their selection
});

    $('#next-btn').click(function() {
        if (!selectedOptions[currentQuestion]) {
            alert("Please select an option.");
            return;
        }

        if (currentQuestion === questions.length - 1) {
            if (confirm("Are you sure you want to submit your answers?")) {
                for (let i = 0; i < questions.length; i++) {
                    if (selectedOptions[i] === questions[i].answer) {
                        score++;
                    }
                }
                showResults();
            }
        } else {
            currentQuestion++;
            showQuestion();
        }
    });

    $('#prev-btn').click(function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });

    $('#cancel-btn').click(function() {
        if (confirm("Are you sure you want to cancel the quiz?")) {
            currentQuestion = 0;
            score = 0;
            selectedOptions.fill(null);
            $('.quiz-screen').hide();
            $('.welcome-screen').show();
        }
    });

    $('#restart-btn').click(function() {
        currentQuestion = 0;
        score = 0;
        selectedOptions.fill(null);
        $('.results-screen').hide();
        $('.welcome-screen').show();
    });

    $('#review-btn').click(function() {
        $('.results-screen').hide();
        showReview();
    });

    function showReview() {
        $('.review-container').empty();
        questions.forEach((question, index) => {
            const reviewQuestion = $(`<div class="review-question"></div>`);
            const questionText = $(`<div class="review-question-text">${question.question}</div>`);
            reviewQuestion.append(questionText);

            const optionsContainer = $('<div class="review-options"></div>');
            question.options.forEach((option, optionIndex) => {
                const optionElement = $(`<div class="review-option">${option}</div>`);
                if (option === question.answer) {
                    optionElement.addClass('correct-answer');
                }
                if (selectedOptions[index] === option) {
                    optionElement.addClass('selected');
                    if (option === question.answer) {
                        optionElement.addClass('correct');
                    } else {
                        optionElement.addClass('incorrect');
                    }
                }
                optionsContainer.append(optionElement);
            });
            reviewQuestion.append(optionsContainer);
            $('.review-container').append(reviewQuestion);
        });
        $('.review-screen').show();
    }

    $('#back-to-results-btn').click(function() {
        $('.review-screen').hide();
        $('.results-screen').show();
    });
});
