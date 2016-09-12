// Initialise DataTable used for displaying list of claims.
$(document).ready(function () {
  var dataUrl = 'http://localhost:3001/claims'

  $('#claims-table').DataTable({
    ajax: dataUrl,

    columns: [
      { 'data': '_id' },
      { 'data': 'reference' },
      { 'data': 'claimant.name' },
      { 'data': 'dateSubmitted'
      },
      { 'data': 'status' }
    ],

    columnDefs: [
      {
        'targets': [ 0 ],
        'visible': false,
        'searchable': false
      }
    ],

    'rowCallback': function (row, data, index) {
      $(row).click(function () {
        document.location.href = 'claim-details/' + data._id
      })
    }
  })
})

