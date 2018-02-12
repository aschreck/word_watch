import $ from 'jquery'

$(document).ready(() => {
  var word
  var count

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
})
