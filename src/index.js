import $ from 'jquery'

$(document).ready(() => {
  // have fun!
  var word

  fetch("https://wordwatch-api.herokuapp.com/api/v1/top_word", {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(function () {
      debugger
    })
    .catch(function (error) { console.error(error) })
  $('.top-word')
})
