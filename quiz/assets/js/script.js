$(function() {
    // when page loaded alert...
    alert("Click Persian to make Quiz language Persian\nبرای فارسی شدن زبان کوییز روی Persian کلیک کنید")
        // variables
    const form = document.getElementById('quizForm');
    const resultDiv = document.getElementById('results');
    const divTitle = document.getElementById('title');
    // when 0 language is english and when 1 language is persian
    let langSelector = 0;
    // ajax for read data and render questions part html with js
    const loadQuestions = function() {
            $.ajax({
                url: "/quiz/assets/data/questions.json",
                type: 'GET',
                success: function(questions) {
                    // when succesfully get data with ajax empty form and title
                    const emptyTitle = $('#title')
                    emptyTitle.empty();
                    const formEmpty = $('#quizForm')
                    formEmpty.empty();
                    questions.forEach(function(question) {
                        // thernary operator for switched language
                        let content = langSelector === 0 ? question.englishTitle : question.persianTitle;
                        let div = `<div class="question">
                <h3>${content}</h3>
                <div class="choices">
                    <div class="choice">
                        <label for="${question.options[0].title}">${question.options[0].title}</label>
                        <input type="radio" name="question${question.id}" id="${question.id}" value="${question.options[0].key}"/>
                    </div>
                    <div class="choice">
                        <label for="${question.options[1].title}">${question.options[1].title}</label>
                        <input type="radio" name="question${question.id}" id="${question.id}" value="${question.options[1].key}"/>
                    </div>
                    <div class="choice">
                        <label for="${question.options[2].title}">${question.options[2].title}</label>
                        <input type="radio" name="question${question.id}" id="${question.id}" value="${question.options[2].key}"/>
                    </div>
                    <div class="choice">
                        <label for="${question.options[3].title}">${question.options[3].title}</label>
                        <input type="radio" name="question${question.id}" id="${question.id}" value="${question.options[3].key}"/>
                    </div>
                </div>
                </div>
                 <hr class="hr-style">
                <br>`;
                        // append div to the form 
                        form.innerHTML += div;
                    });

                    // creat button and append to the form
                    let btn = `<button type="submit">${langSelector === 0 ? 'SUBMIT' : 'ثبت'}</button>`
                    $(form).append(btn).innerHTML += btn
                        // form add eventlisteners submit
                    form.addEventListener('submit', submit)
                        // create language selector english and persian
                    let language = `<a id="change-lang" href="#">${langSelector === 0 ? 'Persian' : 'English'}</a><br><br>`
                        // create quiz title h1 tag
                    let quizTitle = `<h1>${langSelector === 0 ? 'QUIZ' : 'کوییز'}</h1>`;
                    // prepend to the divtitle
                    $(divTitle).prepend(quizTitle).innerHTML += quizTitle
                    $(divTitle).prepend(language).innerHTML += language
                        // when click to the change language change it and you can write 2way with jquery and js
                        // this way with jquery****
                    $('#change-lang').click(function(e) {
                            e.preventDefault()
                            langSelector++;
                            langSelector %= 2;
                            $('body').toggleClass('persian');
                            $('*').toggleClass('font-vazir');
                            console.log(langSelector);
                            loadQuestions();
                            loadResults();
                        })
                        // this way for changing language with js*****
                        // document.getElementById('change-lang').addEventListener('click', changing)
                        // function changing(e) {
                        //     e.preventDefault()
                        //     langSelector++;
                        //     langSelector %= 2;
                        //     $('body').toggleClass('persian');
                        //     $('*').toggleClass('font-vazir');
                        //     console.log(langSelector);
                        //     loadQuestions();
                        //     loadResults();
                        // }

                }
            })
        }
        // ajax for get load results
    const loadResults = function() {
            $.ajax({
                url: "/quiz/assets/data/results.json",
                type: 'GET',
                success: function(result) {
                    // empty results
                    const emptyResults = $('#results');
                    emptyResults.empty()
                        // render results with js
                    let switcherLang1 = langSelector === 0 ? result.englishTitleCorrectAnswers : result.persianTitleCorrectAnswers;
                    let switcherLang2 = langSelector === 0 ? result.englishTitleWrongAnswers : result.persianTitleWrongAnswers;
                    let switcherLang3 = langSelector === 0 ? result.englishTitleNoAnswers : result.persianTitleNoAnswers;
                    let answersDiv = `<div><span>${switcherLang1}: </span><span id="rightAnswers">0</span></div><br>
                                  <div><span>${switcherLang2}: </span><span id="wrongAnswers">0</span></div><br>
                                  <div><span>${switcherLang3}: </span><span id="emptyAnswers">0</span></div>`
                        // result append to the resultDiv
                    resultDiv.innerHTML += answersDiv
                        //when page is loaded count of empty answers is 4
                    let emptyAnswer = 4
                    $('#emptyAnswers').html(emptyAnswer)
                }
            })
        }
        //functions load
    loadQuestions();
    loadResults();




    //when submit form
    function submit(e) {
        e.preventDefault()
            // calcute function for find number of your correct or wrong answer
        calculate()

    }
    // function calculating answers
    function calculate() {
        let correctAnswer = 0;
        let wrongAnswer = 0;
        const inputs = document.querySelectorAll('.choice input');
        let empty = 4;
        inputs.forEach(input => {
            if (input.checked != false) {
                if (input.id == 1 && input.value == 1 || input.id == 2 && input.value == 4 || input.id == 3 && input.value == 4 || input.id == 4 && input.value == 2) {
                    correctAnswer++;
                } else if (input.id != 1 && input.value != 1 || input.id != 2 && input.value != 4 || input.id != 3 && input.value != 4 || input.id != 4 && input.value != 2) {
                    wrongAnswer++;
                }
                empty--;
                $('#emptyAnswers').html(empty);
                $('#rightAnswers').html(correctAnswer);
                $('#wrongAnswers').html(wrongAnswer);
            };
        });
        empty = '';
    }
})