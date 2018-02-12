import $ from 'jquery'

$(document).ready(() => {
  addApiWord()
  btnListener()
  enterListener()
})

function addApiWord() {
  fetch("https://wordwatch-api.herokuapp.com/api/v1/top_word")
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      var word = Object.keys(response.word)[0]
      var number = response.word[word]
      $(".top-word").text(`Top Word From Wordwatch API: ${word} (${number})`)
    })
    .catch(function (error) { console.error(error) })
}

//add a listener on the text box.
function enterListener() {
  $(document).keypress(function(e) {
    if (e.which == '13') {
      paragraphHandler()
    }
  })
}

function btnListener() {
  $("button").on("click", paragraphHandler)
}

function paragraphHandler() {
  var paragraph = $("textarea").val()
  var splitPara = paragraph.split(' ')
  var tally = splitPara.reduce(function (tally, word) {
    word = word.toLowerCase()
    if (!tally[word]) {
      tally[word] = 1
    } else {
      tally[word] += 1
    }
    return tally
  }, {})

  for (var word in tally) {
    postWordToDb(word)
    if (tally[word] == 1) {
      $(".word-count").append(`<p style="font-size:10px;">${word}</p>`)
    } else if (tally[word] == 2) {
      $(".word-count").append(`<p style="font-size:20px;">${word}</p>`)
    } else if (tally[word] == 3) {
      $(".word-count").append(`<p style="font-size:30px;">${word}</p>`)
    } else if (tally[word] == 4) {
      $(".word-count").append(`<p style="font-size:40px;">${word}</p>`)
    } else if (tally[word] == 5) {
      $(".word-count").append(`<p style="font-size:50px;">${word}</p>`)
    } else if (tally[word] == 6) {
      $(".word-count").append(`<p style="font-size:60px;">${word}</p>`)
    } else if (tally[word] == 7) {
      $(".word-count").append(`<p style="font-size:70px;">${word}</p>`)
    }
  }
}



function postWordToDb (inputWord){
  var jsonObj = {word: {value: inputWord}}
  fetch("https://wordwatch-api.herokuapp.com/api/v1/words",{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(jsonObj)
  })
  .catch(function(error) {console.error("error:", error)})
}