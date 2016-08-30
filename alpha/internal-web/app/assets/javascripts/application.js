/* global $ */
/* global GOVUK */

function ShowHideContent () {
  var self = this

  self.escapeElementName = function (str) {
    var result = str.replace('[', '\\[').replace(']', '\\]')
    return (result)
  }

  self.showHideRadioToggledContent = function () {
    $(".block-label input[type='radio']").each(function () {
      var $radio = $(this)
      var $radioGroupName = $radio.attr('name')
      var $radioLabel = $radio.parent('label')

      var dataTarget = $radioLabel.attr('data-target')

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (dataTarget) {
        // Set aria-controls
        $radio.attr('aria-controls', dataTarget)

        $radio.on('click', function () {
          // Select radio buttons in the same group
          $radio.closest('form').find('.block-label input[name=' + self.escapeElementName($radioGroupName) + ']').each(function () {
            var $this = $(this)

            var groupDataTarget = $this.parent('label').attr('data-target')
            var $groupDataTarget = $('#' + groupDataTarget)

            // Hide toggled content
            $groupDataTarget.addClass('js-hidden')
            // Set aria-expanded and aria-hidden for hidden content
            $this.attr('aria-expanded', 'false')
            $groupDataTarget.attr('aria-hidden', 'true')
          })

          var $dataTarget = $('#' + dataTarget)
          $dataTarget.removeClass('js-hidden')
          // Set aria-expanded and aria-hidden for clicked radio
          $radio.attr('aria-expanded', 'true')
          $dataTarget.attr('aria-hidden', 'false')
        })
      } else {
        // If the data-target attribute is undefined for a radio button,
        // hide visible data-target content for radio buttons in the same group

        $radio.on('click', function () {
          // Select radio buttons in the same group
          $('.block-label input[name=' + self.escapeElementName($radioGroupName) + ']').each(function () {
            var groupDataTarget = $(this).parent('label').attr('data-target')
            var $groupDataTarget = $('#' + groupDataTarget)

            // Hide toggled content
            $groupDataTarget.addClass('js-hidden')
            // Set aria-expanded and aria-hidden for hidden content
            $(this).attr('aria-expanded', 'false')
            $groupDataTarget.attr('aria-hidden', 'true')
          })
        })
      }
    })
  }
  self.showHideCheckboxToggledContent = function () {
    $(".block-label input[type='checkbox']").each(function () {
      var $checkbox = $(this)
      var $checkboxLabel = $(this).parent()

      var $dataTarget = $checkboxLabel.attr('data-target')

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {
        // Set aria-controls
        $checkbox.attr('aria-controls', $dataTarget)

        // Set aria-expanded and aria-hidden
        $checkbox.attr('aria-expanded', 'false')
        $('#' + $dataTarget).attr('aria-hidden', 'true')

        // For checkboxes revealing hidden content
        $checkbox.on('click', function () {
          var state = $(this).attr('aria-expanded') === 'false'

          // Toggle hidden content
          $('#' + $dataTarget).toggleClass('js-hidden')

          // Update aria-expanded and aria-hidden attributes
          $(this).attr('aria-expanded', state)
          $('#' + $dataTarget).attr('aria-hidden', !state)
        })
      }
    })
  }
}

$(document).ready(function () {
  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']")
  new GOVUK.SelectionButtons($blockLabels) // eslint-disable-line

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  var toggleContent = new ShowHideContent()
  toggleContent.showHideRadioToggledContent()
  toggleContent.showHideCheckboxToggledContent()

  // Initialise DataTable used for displaying list of claimants.
  var dataUrl = 'http://localhost:3001/claimants'
  $('#claimants-table').DataTable({

    ajax: dataUrl,

    columns: [
      { 'data': '_id' },
      { 'data': 'first-name' },
      { 'data': 'last-name' },
      { 'data': 'applicationStatus' }
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
        $('#income-status').text(data.incomeVerificationStatus)
      },
      error: function (err) {
        console.log(err)
      }
    })
  })
})
