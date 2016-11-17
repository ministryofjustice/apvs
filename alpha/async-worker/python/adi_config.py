
from openpyxl.styles import PatternFill

ADI_JOURNAL_SHEET = 'TEMPLATE'
ADI_TEMPLATE_FILEPATH = 'template/adi_template.xlsm'

TEST_OUTPUT_FILEPATH = 'test_output.xlsm'

ADI_BATCH_CELL = 'I11'
ADI_DATE_CELL = 'I10'

# journal table
ADI_JOURNAL_START_ROW = 15

WHITE_CELL_FILL = PatternFill(
    start_color='FFFFFF',
    end_color='FFFFFF',
    fill_type='none'
    )
