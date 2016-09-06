/* global $ */

$('#income-check-submit').click(function () {
  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  console.log(id.toString())

  $.ajax({
    url: '/api/income-check',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ id: id }),
    success: function (data) {
      $('#income-status').text(data[ 'status.incomeVerificationStatus' ])
    },
    error: function (err) {
      console.log(err)
    }
  })
})
