import $ from 'jquery'

$(document).ready(() => {
  addApiWord()
  handleParagraphs()
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

function handleParagraphs() {
  $("button").on("click", function(){
    var paragraph = $("textarea").val()
   var splitPara = paragraph.split(' ')
    var tally = splitPara.reduce(function(tally, word){
      if (!tally[word]){
        tally[word] = 1
      } else {
        tally[word] += 1
      }
      return tally
    },{})
    //paste it to the page with alternating sizing.
    for (var word in tally)  {
      //append it to the page with sizing
      if (tally[word] == 1) {
        $(".word-count").append(`<p style="font-size:10px;">${word}</p>`)
      } else if (tally[word] == 2) {
        $(".word-count").append(`<p style="font-size:20px;">${word}</p>`)
      } else if (tally[word] == 3) {
        $(".word-count").append(`<p style="font-size:30px;">${word}</p>`)
      } else if (tally[word] == 4) {
        $(".word-count").append(`<p style="font-size:40px;">${word}</p>`)
      } else if (tally[word] == 3) {
        $(".word-count").append(`<p style="font-size:50px;">${word}</p>`)
      }
    }
  })
}
