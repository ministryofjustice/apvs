
from openpyxl.styles import PatternFill

ADI_JOURNAL_SHEET = 'TEMPLATE'
ADI_TEMPLATE_FILEPATH = 'template/adi_template.xlsm'

TEST_OUTPUT_FILEPATH = 'output/test_output.xlsm'

ADI_TOTAL_LABEL_CELL = 'K16'
ADI_TOTAL_CELL = 'L16'

WHITE_CELL_FILL = PatternFill(
    start_color='FFFFFF',
    end_color='FFFFFF',
    fill_type='none'
    )
