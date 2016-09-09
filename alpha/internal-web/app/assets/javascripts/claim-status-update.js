$('#approve-claim').click(function () {
  var url = window.location.pathname
  var id = url.substring(url.lastIndexOf('/') + 1)

  console.log(id.toString())

  $.ajax({
    url: '/claim-details/approve',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ id: id }),
    success: function (data) {
      $('#claim-status').text(data['status'])
    },
    error: function (err) {
      console.log(err)
    }
  })
})
