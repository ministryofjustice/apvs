
import argparse
import adi_config as config
from openpyxl import load_workbook

def main():
    """ Main application entrypoint """
    parser = argparse.ArgumentParser(
        description='Output a sample ADI journal based on input payment total'
    )

    parser.add_argument(
        'total',
        help='Journal total credit amount'
    )

    args = parser.parse_args()
    write_journal(args.total)

def write_journal(total):
    """ Update and save ADI Journal file to disk """
    workbook = load_workbook(config.ADI_TEMPLATE_FILEPATH, keep_vba=True)
    update_journal_total(workbook, total)
    workbook.save(filename=config.TEST_OUTPUT_FILEPATH)

def update_journal_total(workbook, total):
    """ Update the Journal account date"""
    journal_ws = workbook.get_sheet_by_name(config.ADI_JOURNAL_SHEET)

    total_label_cell = journal_ws[config.ADI_TOTAL_LABEL_CELL]
    total_label_cell.value = 'Total'
    total_label_cell.fill = config.WHITE_CELL_FILL

    total_cell = journal_ws[config.ADI_TOTAL_CELL]
    total_cell.value = total
    total_cell.fill = config.WHITE_CELL_FILL

if __name__ == '__main__':
    main()
