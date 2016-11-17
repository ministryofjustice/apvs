
from ..adi import update_journal_total
import unittest
from openpyxl import Workbook

class AdiJournalTestCase(unittest.TestCase):
    """
    TestCase for testing Adi Journal generation code
    """

    def test_update_journal_total(self):
        """ Test workbook updated as expected """
        total = 123.45
        workbook = Workbook()
        update_journal_total(workbook, total)
        self.assertEqual(workbook['TEMPLATE']['k16'].value, 'Total')
        self.assertEqual(workbook['TEMPLATE']['L16'].value, total)

if __name__ == '__main__':
    unittest.main()
