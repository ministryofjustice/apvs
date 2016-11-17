
import argparse
import python.adi_config as config
from openpyxl import load_workbook

def main():
    """ Main application entrypoint """
    parser = argparse.ArgumentParser(
        description='Output a sample ADI journal based on input payment information'
    )

    parser.add_argument(
        'date',
        help='Journal account date'
    )

    args = parser.parse_args()
    write_journal(args.date)

def write_journal(account_date):
    """ Update and save ADI Journal file to disk """
    workbook = load_workbook(config.ADI_TEMPLATE_FILEPATH, keep_vba=True)
    update_account_date(workbook, account_date)
    workbook.save(filename=config.TEST_OUTPUT_FILEPATH)

def update_account_date(workbook, account_date):
    """ Update the Journal account date"""
    journal_ws = workbook.get_sheet_by_name(config.ADI_JOURNAL_SHEET)
    date_cell = journal_ws[config.ADI_DATE_CELL]
    date_cell.value = account_date

if __name__ == '__main__':
    main()
