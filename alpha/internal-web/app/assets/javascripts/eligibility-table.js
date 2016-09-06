// Initialise DataTable used for displaying list of claimants.
var dataUrl = 'http://localhost:3001/claimants'
$('#claimants-table').DataTable({

  ajax: dataUrl,

  columns: [
    { 'data': '_id' },
    { 'data': 'personal.first-name' },
    { 'data': 'personal.last-name' },
    { 'data': 'status.applicationStatus' }
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
      document.location.href = 'claimant-details/' + data._id
    })
  }
})
