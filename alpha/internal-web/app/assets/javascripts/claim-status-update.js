const ACTION_APPROVE = 'approve'
const ACTION_REJECT = 'reject'

$('#approve-claim').click(handleClickCallback(ACTION_APPROVE))
$('#reject-claim').click(handleClickCallback(ACTION_REJECT))

function handleClickCallback (action) {
  return function () {
    var url = window.location.pathname
    var id = url.substring(url.lastIndexOf('/') + 1)

    console.log(id.toString())

    $.ajax({
      url: '/claim-details/' + action,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: id }),
      success: function (status) {
        $('#claim-status').text(status)
      },
      error: function (err) {
        console.log(err)
      }
    })
  }
}
