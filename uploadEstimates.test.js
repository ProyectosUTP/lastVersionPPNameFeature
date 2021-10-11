/* global testHelpers, it, expect, beforeAll, beforeEach, afterAll, afterEach */


describe('uploadEstimates tests', () => {
    afterEach(() => {
        sinon.restore();
        sinon.reset();
        window.uploadEstimates.testingOnly.restore();
    });

    let allColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];
    let testCases = [
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', '', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']],
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', '', 'F5564', 'F65+', 'M2-5', 'M6-8', '', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']]
    ];

    testCases.forEach(([parsedColumns], index) => {
        it(`validateFileContents returns false for missing columns (#${allColumns.map((el, ind, array) => { if (!parsedColumns.includes(el)) return ind; else return -1; }).filter((el) => el !== -1).toString()})`, () => {
            // arrange
            const rows = [];
            const nonDemoColumns = {
                SellingRotationId: "SRID",
                Quarter: "QTR",
                Year: "YEAR",
                DeliveryStream: "STREAM",
                RatecardId: 'RATECARDID'
            };

            var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

            sinon.replace(window.toastr, 'error', sinon.fake());

            // act
            const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

            // assert
            expect(result).toBeFalsy();
            expect(window.toastr.error.callCount).toEqual(1);
            const toastrArgs = window.toastr.error.getCall(0).args;
            expect(toastrArgs[0]).toEqual(expectedErrors);
            expect(toastrArgs[1]).toBeNull();
            expect(toastrArgs[2].showAsHtml).toBeTruthy();
        });
    });

    allColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];
    testCases = [
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', '', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']],
        [['RATECARDID', 'SRID', '', 'YEAR', '', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', '', 'F5564', 'F65+', 'M2-5', 'M6-8', '', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']]
    ];

    testCases.forEach(([parsedColumns], index) => {
        it(`validateFileContents returns false for missing nonDemoColumns (#${allColumns.map((el, ind, array) => { if (!parsedColumns.includes(el)) return ind; else return -1; }).filter((el) => el !== -1).toString()})`, () => {
            // arrange
            const rows = [];
            const nonDemoColumns = {
                SellingRotationId: "SRID",
                Quarter: "QTR",
                Year: "YEAR",
                DeliveryStream: "STREAM",
                RatecardId: 'RATECARDID'
            };

            var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

            sinon.replace(window.toastr, 'error', sinon.fake());

            // act
            const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

            // assert
            expect(result).toBeFalsy();
            expect(window.toastr.error.callCount).toEqual(1);
            const toastrArgs = window.toastr.error.getCall(0).args;
            expect(toastrArgs[0]).toEqual(expectedErrors);
            expect(toastrArgs[1]).toBeNull();
            expect(toastrArgs[2].showAsHtml).toBeTruthy();
        });
    });

    allColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];
    testCases = [
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820_', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']],
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044*', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']]
    ];
    testCases.forEach(([parsedColumns], index) => {
        it(`validateFileContents returns false for having header values with special characters`, () => {
            // arrange
            const rows = [];
            const nonDemoColumns = {
                SellingRotationId: "SRID",
                Quarter: "QTR",
                Year: "YEAR",
                DeliveryStream: "STREAM",
                RatecardId: 'RATECARDID'
            };

            var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

            sinon.replace(window.toastr, 'error', sinon.fake());

            // act
            const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

            // assert
            expect(result).toBeFalsy();
            expect(window.toastr.error.callCount).toEqual(1);
            const toastrArgs = window.toastr.error.getCall(0).args;
            expect(toastrArgs[0]).toEqual(expectedErrors);
            expect(toastrArgs[1]).toBeNull();
            expect(toastrArgs[2].showAsHtml).toBeTruthy();
        });
    });

    it('validateFileContents returns false for more than one row for a combination of columns: selling rotation id, quarter, year, PRICE PERIOD NAME, delivery stream and ratecard id', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

        sinon.replace(window.toastr, 'error', sinon.fake());

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContents returns false due to having null or empty values in rows', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': null, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': null, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': null, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

        sinon.replace(window.toastr, 'error', sinon.fake());

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContents returns false due to having format value errors in rows', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 'pp5', 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': '44*', 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C 3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3*', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

        sinon.replace(window.toastr, 'error', sinon.fake());

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContents returns false due to having invalid row quarters values', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 3, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2020, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for Header row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("One or more required fields for SR/Qtr row is blank"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Invalid characters were found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Duplicate rows found"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Commas not allowed"));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text("Past quarters not allowed"));

        sinon.replace(window.toastr, 'error', sinon.fake());
        sinon.replace(window, 'currQtr', '4Q/2021');

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContents returns true, no data validations found', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContents(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeTruthy();
    });

    allColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];
    testCases = [
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', '', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']],
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', '', 'F5564', 'F65+', 'M2-5', 'M6-8', '', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']]
    ];
    testCases.forEach(([parsedColumns], index) => {
        it(`validateFileContentWithSpecificValidationMessages returns false for missing columns (#${allColumns.map((el, ind, array) => { if (!parsedColumns.includes(el)) return ind; else return -1; }).filter((el) => el !== -1).toString()})`, () => {
            // arrange
            const rows = [];
            const nonDemoColumns = {
                SellingRotationId: "SRID",
                Quarter: "QTR",
                Year: "YEAR",
                PPName: "PRICE PERIOD NAME",
                DeliveryStream: "STREAM",
                RatecardId: 'RATECARDID'
            };
            var undefinedNullOrEmptyColumnIndexes = [];
            for (var i = 0; i < parsedColumns.length; i++) {
                if (typeof parsedColumns[i] === 'undefined' || parsedColumns[i] === null || parsedColumns[i] === '')
                    undefinedNullOrEmptyColumnIndexes.push(i);
            }

            var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`The column names for these column indexes (${undefinedNullOrEmptyColumnIndexes.toString()}) have a null or empty value in the header`));

            sinon.replace(window.toastr, 'error', sinon.fake());

            // act
            const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

            // assert
            expect(result).toBeFalsy();
            expect(window.toastr.error.callCount).toEqual(1);
            const toastrArgs = window.toastr.error.getCall(0).args;
            expect(toastrArgs[0]).toEqual(expectedErrors);
            expect(toastrArgs[1]).toBeNull();
            expect(toastrArgs[2].showAsHtml).toBeTruthy();
        });
    });

    allColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];
    testCases = [
        //[[]],
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', '', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', '', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']],
        [['RATECARDID', 'SRID', '', 'YEAR', 'PRICE PERIOD NAME', '', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', '', 'F5564', 'F65+', 'M2-5', 'M6-8', '', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']]
    ];
    testCases.forEach(([parsedColumns], index) => {
        it(`validateFileContentWithSpecificValidationMessages returns false for missing nonDemoColumns (#${allColumns.map((el, ind, array) => { if (!parsedColumns.includes(el)) return ind; else return -1; }).filter((el) => el !== -1).toString()})`, () => {
            // arrange
            const rows = [];
            const nonDemoColumns = {
                SellingRotationId: "SRID",
                Quarter: "QTR",
                Year: "YEAR",
                PPName: "PRICE PERIOD NAME",
                DeliveryStream: "STREAM",
                RatecardId: 'RATECARDID'
            };

            //dynamic expectedErrors
            var undefinedNullOrEmptyColumnIndexes = [];
            for (var i = 0; i < parsedColumns.length; i++) {
                if (typeof parsedColumns[i] === 'undefined' || parsedColumns[i] === null || parsedColumns[i] === '')
                    undefinedNullOrEmptyColumnIndexes.push(i);
            }

            var missingNonDemographicHeaderNames = [];
            var nonDemoColumsValues = Object.values(nonDemoColumns);
            nonDemoColumsValues.forEach((el, ind, arr) => {
                if (!parsedColumns.includes(el))
                    missingNonDemographicHeaderNames.push(el);
            });

            var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
            if (undefinedNullOrEmptyColumnIndexes.length > 0) {
                expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`The column names for these column indexes (${undefinedNullOrEmptyColumnIndexes.toString()}) have a null or empty value in the header`));
            }
            if (missingNonDemographicHeaderNames.length > 0) {
                expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`There are missing non demographic columns (${missingNonDemographicHeaderNames.toString()})`));
            }

            sinon.replace(window.toastr, 'error', sinon.fake());

            // act
            const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

            // assert
            expect(result).toBeFalsy();
            expect(window.toastr.error.callCount).toEqual(1);
            const toastrArgs = window.toastr.error.getCall(0).args;
            expect(toastrArgs[0]).toEqual(expectedErrors);
            expect(toastrArgs[1]).toBeNull();
            expect(toastrArgs[2].showAsHtml).toBeTruthy();
        });
    });

    allColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];
    testCases = [
        //[[]],
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820_', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']],
        [['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', '**F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044*', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+']]
    ];
    testCases.forEach(([parsedColumns], index) => {
        it(`validateFileContentWithSpecificValidationMessages returns false for having header values with special characters`, () => {
            // arrange
            const rows = [];
            //const fakeShowValidationErrorToast = sinon.fake();     
            const nonDemoColumns = {
                SellingRotationId: "SRID",
                Quarter: "QTR",
                Year: "YEAR",
                PPName: "PRICE PERIOD NAME",
                DeliveryStream: "STREAM",
                RatecardId: 'RATECARDID'
            };
            const validHeader = /^[a-z A-Z0-9\-\+]+$/;

            //dynamic expectedErrors
            var headerWithSpetialCharactersIndexes = [];
            for (var i = 0; i < parsedColumns.length; i++) {
                if (parsedColumns[i] && parsedColumns[i].toString().length > 0 && !validHeader.test(parsedColumns[i]))
                    headerWithSpetialCharactersIndexes.push(i);
            }

            var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
            expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`The column names for these column indexes (${headerWithSpetialCharactersIndexes.toString()}) have a special character in the header`));

            sinon.replace(window.toastr, 'error', sinon.fake());

            // act
            const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

            // assert
            expect(result).toBeFalsy();
            expect(window.toastr.error.callCount).toEqual(1);
            const toastrArgs = window.toastr.error.getCall(0).args;
            expect(toastrArgs[0]).toEqual(expectedErrors);
            expect(toastrArgs[1]).toBeNull();
            expect(toastrArgs[2].showAsHtml).toBeTruthy();
        });
    });

    it('validateFileContentWithSpecificValidationMessages returns false for more than one row for a combination of columns: selling rotation id, quarter, year, ppname, delivery stream and ratecard id', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            PPName: "PRICE PERIOD NAME",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`There are 2 rows for the combination of these values: selling rotation id (49999), quarter (4), year (2021), ppname (PB2), delivery stream (PL) and ratecard id (16)`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`There are 2 rows for the combination of these values: selling rotation id (50000), quarter (4), year (2021), ppname (null), delivery stream (C3) and ratecard id (16)`));

        sinon.replace(window.toastr, 'error', sinon.fake());

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContentWithSpecificValidationMessages returns false due to having null or empty values in rows', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            PPName: "PRICE PERIOD NAME",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': null, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': null, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'PL', 'HH': 316156, 'F2-5': null, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For these columns (SRID,F1517) values are null in this row: 4`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For these columns (F2-5) values are null in this row: 6`));

        sinon.replace(window.toastr, 'error', sinon.fake());

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContentWithSpecificValidationMessages returns false due to having format value errors in rows', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            PPName: "PRICE PERIOD NAME",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 'pp5', 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': '44*', 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'C 3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'C3*', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3-', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)*', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For these numeric columns (SRID,F6-8) values contain characters in this row: 2`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For the Delivery Stream column values contain special characters in this row: 3`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For the Delivery Stream column values contain special characters in this row: 4`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For the Price Period Name column values contain not allowed characters in this row: 7`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For the Price Period Name column values contain not allowed characters in this row: 8`));

        sinon.replace(window.toastr, 'error', sinon.fake());

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContentWithSpecificValidationMessages returns false due to having invalid row quarters values', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            PPName: "PRICE PERIOD NAME",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 3, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2020, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        var expectedErrors = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following File validations failed. Upload cannot be completed.');
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For the quarter / year columns values are less than the current quarter / year in this row: 4`));
        expectedErrors.append($('<li style="margin: 5px 0;"></li>').text(`For the quarter / year columns values are less than the current quarter / year in this row: 7`));

        sinon.replace(window.toastr, 'error', sinon.fake());
        sinon.replace(window, 'currQtr', '4Q/2021');

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeFalsy();
        expect(window.toastr.error.callCount).toEqual(1);
        const toastrArgs = window.toastr.error.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedErrors);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].showAsHtml).toBeTruthy();
    });

    it('validateFileContentWithSpecificValidationMessages returns true, no data validations found', () => {
        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            PPName: "PRICE PERIOD NAME",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const rows = [
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421, 'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202, 'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB2', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB3', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB4 (3N)', 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'C3', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 },
            { 'RATECARDID': 16, 'SRID': 50000, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': null, 'STREAM': 'PL', 'HH': 316156, 'F2-5': 8099, 'F6-8': 4052, 'F911': 3476, 'F1214': 5626, 'F1517': 6326, 'F1820': 5937, 'F2124': 6365, 'F2529': 22262, 'F3034': 28753, 'F3539': 20551, 'F4044': 23340, 'F4549': 30537, 'F5054': 37828, 'F5564': 80718, 'F65+': 114792, 'M2-5': 8349, 'M6-8': 7888, 'M911': 13818, 'M1214': 9598, 'M1517': 8552, 'M1820': 17762, 'M2124': 18555, 'M2529': 40589, 'M3034': 48984, 'M3539': 53507, 'M4044': 41145, 'M4549': 58067, 'M5054': 66773, 'M5564': 178362, 'M65+': 238311 }
        ];
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        // act
        const result = window.uploadEstimates.testingOnly.validateFileContentWithSpecificValidationMessages(nonDemoColumns, rows, parsedColumns);

        // assert
        expect(result).toBeTruthy();
    });

    it('showConfirmationDialog returns promise with toastr dialog filled out', (done) => {
        // arrange
        let fakeMessage = 'test';

        const fakeWarning = sinon.stub().returnsThis();
        const fakeAddButton = sinon.stub().returnsThis();
        const fakeDialog = {
            warning: fakeWarning,
            addButton: fakeAddButton
        };

        sinon.replace(window.toastr, 'dialog', fakeDialog);
        // act
        var result = window.uploadEstimates.testingOnly.showConfirmationDialog(fakeMessage);

        // assert
        expect(result instanceof Promise).toBeTrue();
        expect(typeof fakeWarning).toEqual('function');
        expect(fakeWarning.getCall(0).args[0]).toEqual(fakeMessage);
        expect(typeof fakeAddButton).toEqual('function');
        expect(fakeAddButton.getCall(0).args[0]).toEqual('Cancel');
        expect(typeof fakeAddButton.getCall(0).args[1]).toEqual('function');
        expect(fakeAddButton.getCall(0).args[2]).toBeTrue();
        expect(fakeAddButton.getCall(1).args[0]).toEqual('Ok');
        expect(typeof fakeAddButton.getCall(1).args[1]).toEqual('function');
        done();
    });

    it('convertToDto returns object for false value in featureFlagPricePeriodEnabledForCsvUploadFile', () => {

        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const row = {
            'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421,
            'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202,
            'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879
        };
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549',
            'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        window.uploadEstimates.testingOnly.override.featureFlagPricePeriodEnabledForCsvUploadFile(false);

        // act
        const result = window.uploadEstimates.testingOnly.convertToDto(nonDemoColumns, parsedColumns, row);

        // assert
        expect(result.Id).toEqual(null);
        expect(result.ConcurrencyVersion).toEqual(null);
        expect(result.Rate).toEqual(null);
        expect(result.Comments).toEqual(null);
        expect(result.DeliveryStream).toEqual('C3');
        expect(result.SellingRotationId).toEqual(49999);
        expect(result.RatecardId).toEqual(16);
        expect(result.Quarter.Year).toEqual(2021);
        expect(result.Quarter.QuarterNumber).toEqual(4);
        expect(result.PricePeriod).toEqual(undefined);
        expect(result.BaseDemographics.length).toEqual(31);
        //expect(result.BaseDemographics[0]).toEqual(6);
    });

    it('convertToDto returns object for true value in featureFlagPricePeriodEnabledForCsvUploadFile', () => {

        // arrange
        const nonDemoColumns = {
            SellingRotationId: "SRID",
            Quarter: "QTR",
            Year: "YEAR",
            PPName: "PRICE PERIOD NAME",
            DeliveryStream: "STREAM",
            RatecardId: 'RATECARDID'
        };
        const row = {
            'RATECARDID': 16, 'SRID': 49999, 'QTR': 4, 'YEAR': 2021, 'PRICE PERIOD NAME': 'PB1', 'STREAM': 'C3', 'HH': 311331, 'F2-5': 7848, 'F6-8': 3436, 'F911': 2933, 'F1214': 4405, 'F1517': 6421,
            'F1820': 5582, 'F2124': 5971, 'F2529': 21672, 'F3034': 28651, 'F3539': 20189, 'F4044': 23228, 'F4549': 31825, 'F5054': 38772, 'F5564': 81884, 'F65+': 118362, 'M2-5': 11202,
            'M6-8': 7805, 'M911': 13677, 'M1214': 10628, 'M1517': 9064, 'M1820': 16730, 'M2124': 18433, 'M2529': 39989, 'M3034': 47383, 'M3539': 52237, 'M4044': 40678, 'M4549': 59026, 'M5054': 67276, 'M5564': 176305, 'M65+': 231879
        };
        const parsedColumns = ['RATECARDID', 'SRID', 'QTR', 'YEAR', 'PRICE PERIOD NAME', 'STREAM', 'HH', 'F2-5', 'F6-8', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549',
            'F5054', 'F5564', 'F65+', 'M2-5', 'M6-8', 'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'M65+'];

        window.uploadEstimates.testingOnly.override.featureFlagPricePeriodEnabledForCsvUploadFile(true);


        // act
        const result = window.uploadEstimates.testingOnly.convertToDto(nonDemoColumns, parsedColumns, row);

        // assert
        expect(result.Id).toEqual(null);
        expect(result.ConcurrencyVersion).toEqual(null);
        expect(result.Rate).toEqual(null);
        expect(result.Comments).toEqual(null);
        expect(result.DeliveryStream).toEqual('C3');
        expect(result.SellingRotationId).toEqual(49999);
        expect(result.RatecardId).toEqual(16);
        expect(result.Quarter).toEqual(undefined);
        expect(result.PricePeriod.YearNumber).toEqual(2021);
        expect(result.PricePeriod.QuarterNumber).toEqual(4);
        expect(result.PricePeriod.Name).toEqual('PB1');
        expect(result.BaseDemographics.length).toEqual(31);
        //expect(result.BaseDemographics[0]).toEqual(6);
    });

    it('validateEstimateUpload shows error toast for errors during upload', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            responseText: '["test", "test2"]'
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ validationFail }) => {
            validationFail(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });
        var estimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            PricePeriod: { YearNumber: 2021, QuarterNumber: 4, Name: 'PB1' },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };

        var expectedToastMessage = ["test", "test2"];

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'error', sinon.fake());
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.validateEstimateUpload(estimates);

        // assert
        expect(result).toBeUndefined();
        expect($('#toast-container').children().length).toEqual(0);
        expect(fakeRateCardAjax.callCount).toEqual(1);

        expect(window.toastr.error.callCount).toEqual(1);
        expect(window.toastr.error.getCall(0).args[0]).toEqual(expectedToastMessage);

        return mockAJaxPromise.then(() => {
            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
        });
    });

    it('validateEstimateUpload shows error toast for invalid response validation data', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            isValid: false,
            responseText: '["test", "test2"]',
            ValidationErrors: {
                OneStandardAdvisorValidationMessage: '["test"]'
            }
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ done }) => {
            done(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });
        var estimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            PricePeriod: { YearNumber: 2021, QuarterNumber: 4, Name: 'PB1' },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };
        var fakeUploadEstimate = sinon.fake();
        var fakeShowConfirmationDialog = sinon.fake();

        var expectedToastMessage = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('One or more of the following AdVisor validations failed. Upload cannot be completed.');
        expectedToastMessage.append($('<li style="margin: 5px 0;"></li>').text("test"));


        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'error', sinon.fake());
        sinon.replace(window.toastr, 'success', sinon.fake());
        sinon.replace(window.toastr, 'info', sinon.fake());
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.showConfirmationDialog(fakeShowConfirmationDialog);
        window.uploadEstimates.testingOnly.override.uploadEstimate(fakeUploadEstimate);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.validateEstimateUpload(estimates);

        // assert
        expect(result).toBeUndefined();
        expect($('#toast-container').children().length).toEqual(0);
        expect(fakeRateCardAjax.callCount).toEqual(1);

        expect(window.toastr.error.callCount).toEqual(1);
        expect(window.toastr.error.getCall(0).args[0]).toEqual(expectedToastMessage);

        expect(window.toastr.success.callCount).toEqual(0);
        expect(fakeShowConfirmationDialog.callCount).toEqual(0);
        expect(window.toastr.info.callCount).toEqual(0);
        expect(fakeUploadEstimate.callCount).toEqual(0);

        return mockAJaxPromise.then(() => {
            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
        });
    });

    it('validateEstimateUpload calls showConfirmationDialog, but is not uploaded yet', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            IsValid: true,
            responseText: '["test", "test2"]',
            ValidationErrors: {
                OneStandardAdvisorValidationMessage: '["test"]'
            },
            ValidationMessages: {
                WorkingDraftFoundMessage: 'test'
            }
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ done }) => {
            done(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });

        const toastrDialogWarningConfirmationFake = Promise.reject();
        const fakeShowOverrideDialog = sinon.fake(() => {
            return toastrDialogWarningConfirmationFake;
        });
        var expectedEstimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            PricePeriod: { YearNumber: 2021, QuarterNumber: 4, Name: 'PB1' },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };
        const fakeUploadEstimate = sinon.fake();
        const toastInfoMessage = "Upload  is in progress.";
        var fakeWindowConfirm = sinon.fake.returns(true);

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'info', sinon.fake());

        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.showConfirmationDialog(fakeShowOverrideDialog);
        window.uploadEstimates.testingOnly.override.uploadEstimate(fakeUploadEstimate);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.validateEstimateUpload(expectedEstimates);

        // assert
        expect(result).toBeUndefined();

        return Promise.all([mockAJaxPromise, toastrDialogWarningConfirmationFake]).catch(() => { }).finally(() => {
            expect($('#toast-container').children().length).toEqual(0);
            expect(fakeRateCardAjax.callCount).toEqual(1);

            expect(fakeShowOverrideDialog.callCount).toEqual(1);
            expect(fakeShowOverrideDialog.getCall(0).args[0]).toEqual('test');
            expect(window.toastr.info.callCount).toEqual(0);
            expect(fakeUploadEstimate.callCount).toEqual(0);

            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
        });
    });

    it('validateEstimateUpload calls showConfirmationDialog, but is not uploaded yet - second path', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            IsValid: true,
            responseText: '["test", "test2"]',
            ValidationErrors: {
                OneStandardAdvisorValidationMessage: '["test"]'
            },
            ValidationMessages: {
                UploadConfirm: 'test'
            }
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ done }) => {
            done(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });

        const toastrDialogWarningConfirmationFake = Promise.reject();
        const fakeShowOverrideDialog = sinon.fake(() => {
            return toastrDialogWarningConfirmationFake;
        });
        var expectedEstimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            PricePeriod: { YearNumber: 2021, QuarterNumber: 4, Name: 'PB1' },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };
        const fakeUploadEstimate = sinon.fake();
        const toastInfoMessage = "Upload  is in progress.";
        var fakeWindowConfirm = sinon.fake.returns(true);

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'info', sinon.fake());

        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.showConfirmationDialog(fakeShowOverrideDialog);
        window.uploadEstimates.testingOnly.override.uploadEstimate(fakeUploadEstimate);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.validateEstimateUpload(expectedEstimates);

        // assert
        expect(result).toBeUndefined();

        return Promise.all([mockAJaxPromise, toastrDialogWarningConfirmationFake]).catch(() => { }).finally(() => {
            expect($('#toast-container').children().length).toEqual(0);
            expect(fakeRateCardAjax.callCount).toEqual(1);

            expect(fakeShowOverrideDialog.callCount).toEqual(1);
            expect(fakeShowOverrideDialog.getCall(0).args[0]).toEqual('test');

            //expect(fakeUploadEstimate.callCount).toEqual(1);
            //expect(fakeUploadEstimate.getCall(0).args[0]).toEqual(expectedEstimates);

            expect(window.toastr.info.callCount).toEqual(0);
            expect(fakeUploadEstimate.callCount).toEqual(0);

            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
        });
    });

    it('validateEstimateUpload calls showConfirmationDialog, and uploadEstimate is called', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            IsValid: true,
            responseText: '["test", "test2"]',
            ValidationErrors: {
                OneStandardAdvisorValidationMessage: '["test"]'
            },
            ValidationMessages: {
                UploadConfirm: 'test'
            }
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ done }) => {
            done(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });

        const toastrDialogWarningConfirmationFake = Promise.resolve();
        const fakeShowOverrideDialog = sinon.fake(() => {
            return toastrDialogWarningConfirmationFake;
        });
        var expectedEstimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            PricePeriod: { YearNumber: 2021, QuarterNumber: 4, Name: 'PB1' },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };
        const fakeUploadEstimate = sinon.fake();
        const toastInfoMessage = "Upload is in progress.";
        var fakeWindowConfirm = sinon.fake.returns(true);

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'info', sinon.fake());

        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.showConfirmationDialog(fakeShowOverrideDialog);
        window.uploadEstimates.testingOnly.override.uploadEstimate(fakeUploadEstimate);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.validateEstimateUpload(expectedEstimates);

        // assert
        expect(result).toBeUndefined();

        return Promise.all([mockAJaxPromise, toastrDialogWarningConfirmationFake]).catch(() => { }).finally(() => {
            expect($('#toast-container').children().length).toEqual(0);
            expect(fakeRateCardAjax.callCount).toEqual(1);

            expect(fakeShowOverrideDialog.callCount).toEqual(1);
            expect(fakeShowOverrideDialog.getCall(0).args[0]).toEqual('test');

            expect(window.toastr.info.callCount).toEqual(1);
            expect(window.toastr.info.getCall(0).args[0]).toEqual(toastInfoMessage);
            expect(window.toastr.info.getCall(0).args[1]).toEqual(null);
            expect(window.toastr.info.getCall(0).args[2].tapToDismiss).toBeFalsy();
            expect(window.toastr.info.getCall(0).args[2].extendedTimeOut).toEqual(0);
            expect(window.toastr.info.getCall(0).args[2].timeOut).toEqual(0);

            expect(fakeUploadEstimate.callCount).toEqual(1);
            expect(fakeUploadEstimate.getCall(0).args[0]).toEqual(expectedEstimates);

            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
        });
    });

    it('validateEstimateUpload valid path', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            IsValid: true,
            responseText: '["test", "test2"]',
            ValidationErrors: {
                OneStandardAdvisorValidationMessage: '["test"]'
            },
            ValidationMessages: {
                UploadSuccess: 'test'
            }
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ done }) => {
            done(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });
        var expectedEstimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            PricePeriod: { YearNumber: 2021, QuarterNumber: 4, Name: 'PB1' },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };
        const fakeUploadEstimate = sinon.fake();
        const toastInfoMessage = "Upload is in progress.";
        const toastrDialogWarningConfirmationFake = Promise.resolve();
        const fakeShowOverrideDialog = sinon.fake(() => {
            return toastrDialogWarningConfirmationFake;
        });

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'info', sinon.fake());
        sinon.replace(window.toastr, 'success', sinon.fake());
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.showConfirmationDialog(fakeShowOverrideDialog);
        window.uploadEstimates.testingOnly.override.uploadEstimate(fakeUploadEstimate);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.validateEstimateUpload(expectedEstimates);

        // assert
        expect(result).toBeUndefined();
        expect($('#toast-container').children().length).toEqual(0);
        expect(fakeRateCardAjax.callCount).toEqual(1);

        expect(window.toastr.success.callCount).toEqual(1);
        expect(window.toastr.success.getCall(0).args[0]).toEqual('test');

        expect(fakeShowOverrideDialog.callCount).toEqual(0);
        expect(window.toastr.info.callCount).toEqual(0);
        expect(fakeUploadEstimate.callCount).toEqual(0);

        return mockAJaxPromise.then(() => {
            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
        });
    });

    it('uploadEstimate fail path', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = {
            responseText: '["test"]'
        };
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ validationFail }) => {
            validationFail(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });
        var fakeEstimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            Quarter: { QuarterNumber: 4, Year: 2021 },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };
        var expectedErrorDialog = $('<ul style="list-style: circle; margin-left: 10px;"></ul>').text('Estimate upload failed:');
        expectedErrorDialog.append($('<li style="margin: 5px 0;"></li>').text(["test"]));

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'error', sinon.fake());
        sinon.replace(rateCard.mask, 'remove', sinon.fake());
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.uploadEstimate(fakeEstimates);

        // assert
        expect(result).toBeUndefined();
        expect($('#toast-container').children().length).toEqual(0);
        expect(fakeRateCardAjax.callCount).toEqual(1);

        expect(window.toastr.error.callCount).toEqual(1);
        expect(window.toastr.error.getCall(0).args[0]).toEqual(expectedErrorDialog);
        expect(window.toastr.error.getCall(0).args[1]).toEqual(null);
        expect(window.toastr.error.getCall(0).args[2].showAsHtml).toBeTruthy();

        return mockAJaxPromise.then(() => {
            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
            expect(rateCard.mask.remove.callCount).toEqual(1);
        });
    });

    it('uploadEstimate right path', () => {
        // arrange
        const fakeFileInput = {
            val: sinon.fake()
        };
        const mockAjaxResult = ['test'];
        const mockAJaxPromise = Promise.resolve();
        const fakeRateCardAjax = sinon.fake(({ done }) => {
            done(mockAjaxResult);

            // return a promise to test chained 'then'.
            return mockAJaxPromise;
        });
        var fakeEstimates = {
            Id: null,
            ConcurrencyVersion: null,
            Rate: null,
            Comments: null,
            DeliveryStream: 'C3',
            SellingRotationId: 49999,
            RatecardId: 16,
            Quarter: { QuarterNumber: 4, Year: 2021 },
            BaseDemographics: [{ Code: 'HH', Impressions: 311331, Ota: null }, { Code: 'F2-5', Impressions: 7848, Ota: null }]
        };

        sinon.replace(window.rateCard, 'ajax', fakeRateCardAjax);
        sinon.replace(window.toastr, 'success', sinon.fake());
        sinon.replace(rateCard.mask, 'remove', sinon.fake());
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);

        $('body').append('<div id="toast-container"><div></div></div>');

        // act
        const result = window.uploadEstimates.testingOnly.uploadEstimate(fakeEstimates);

        // assert
        expect(result).toBeUndefined();
        expect($('#toast-container').children().length).toEqual(0);
        expect(fakeRateCardAjax.callCount).toEqual(1);

        expect(window.toastr.success.callCount).toEqual(1);
        expect(window.toastr.success.getCall(0).args[0]).toEqual('test');

        return mockAJaxPromise.then(() => {
            expect(fakeFileInput.val.callCount).toEqual(1);
            expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
            expect(rateCard.mask.remove.callCount).toEqual(1);
        });
    });

    it('handleChange shows toastr error for non-CSV file', () => {
        // arrange
        const fakeFileInput = {
            0: {
                files: [
                    {
                        name: 'test.txt' // ending in anything other than '.csv'
                    }
                ]
            }
        };
        const expectedErrorMessage = 'CSV file type expected';

        sinon.replace(window.toastr, 'error', sinon.fake());
        sinon.replace(window.Papa, 'parse', sinon.fake());
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);

        // act
        const result = window.uploadEstimates.testingOnly.handleChange();

        // assert
        expect(result).toBeUndefined();
        expect(window.toastr.error.callCount).toEqual(1);
        expect(window.toastr.error.getCall(0).args[0]).toEqual(expectedErrorMessage);
        expect(window.Papa.parse.callCount).toEqual(0);
    });

    it('handleChange shows toastr error for invalid file', () => {
        // arrange
        const fakeFileInput = {
            0: {
                files: [
                    {
                        name: 'test.csv'
                    }
                ]
            },
            val: sinon.fake()
        };
        const mockParseResult = {
            errors: [
                { code: '1', type: '2', message: '3' }, // type != "FieldMismatch"
                { code: '4', type: 'FieldMismatch', message: '5' } // test filter
            ]
        };
        const expectedErrorMessage = $('<ul style="list-style: circle; margin-left: 10px;"></ul>')
            .text('Unable to read file:')
            .append($('<li style="margin: 5px 0;"></li>').text('3'));

        sinon.replace(window.toastr, 'error', sinon.fake());
        sinon.replace(window.Papa, 'parse', sinon.fake(({ }, { complete }) => {
            complete(mockParseResult);
        }));
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);

        // act
        const result = window.uploadEstimates.testingOnly.handleChange();

        // assert
        expect(result).toBeUndefined();
        expect(window.Papa.parse.callCount).toEqual(1);
        expect(window.toastr.error.callCount).toEqual(1);
        expect(window.toastr.error.getCall(0).args[0]).toEqual(expectedErrorMessage);
        expect(fakeFileInput.val.callCount).toEqual(1);
        expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
    });

    it('handleChange does no further processing for invalid data calling validateFileContents', () => {
        // arrange
        const mockFileName = 'test.csv';
        const mockFile = {
            name: mockFileName
        };
        const fakeFileInput = {
            0: {
                files: [
                    mockFile
                ]
            },
            val: sinon.fake()
        };
        const fakeValidateFileContents = sinon.fake.returns(false);
        const fakeValidateFileContentWithSpecificValidationMessages = sinon.fake.returns(false);
        const fakeConvertToDto = sinon.fake();
        const fakeValidateEstimateUpload = sinon.fake();
        const mockParseResult = {
            errors: [],
            data: [
                {
                    'F2-5': 7848,
                    'F6-8': 3436,
                    'F65+': 118362,
                    'F911': 2933,
                    'F1214': 4405,
                    'F1517': 6421,
                    'F1820': 5582,
                    'F2124': 5971,
                    'F2529': 21672,
                    'F3034': 28651,
                    'F3539': 20189,
                    'F4044': 23228,
                    'F4549': 31825,
                    'F5054': 38772,
                    'F5564': 81884,
                    'HH': 311331,
                    'M2-5': 11202,
                    'M6-8': 7805,
                    'M65+': 231879,
                    'M911': 13677,
                    'M1214': 10628,
                    'M1517': 9064,
                    'M1820': 16730,
                    'M2124': 18433,
                    'M2529': 39989,
                    'M3034': 47383,
                    'M3539': 52237,
                    'M4044': 40678,
                    'M4549': 59026,
                    'M5054': 67276,
                    'M5564': 176305,
                    'QTR': 4,
                    'RATECARDID': 16,
                    'SRID': 49999,
                    'STREAM': "C3",
                    'YEAR': 2021
                }
            ]
        };

        sinon.replace(window.toastr, 'info', sinon.fake());
        sinon.replace(window.Papa, 'parse', sinon.fake(({ }, { complete }) => {
            complete(mockParseResult);
        }));
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.validateFileContents(fakeValidateFileContents);
        window.uploadEstimates.testingOnly.override.convertToDto(fakeConvertToDto);
        window.uploadEstimates.testingOnly.override.validateEstimateUpload(fakeValidateEstimateUpload);
        window.uploadEstimates.testingOnly.override.featureFlagPricePeriodEnabledForCsvUploadFile(false);

        // act
        const result = window.uploadEstimates.testingOnly.handleChange();

        // assert
        expect(result).toBeUndefined();
        expect(window.Papa.parse.callCount).toEqual(1);
        expect(window.Papa.parse.getCall(0).args[0]).toEqual(mockFile);

        const parseOptions = window.Papa.parse.getCall(0).args[1];
        expect(parseOptions.header).toBeTruthy();
        expect(parseOptions.skipEmptyLines).toBeTruthy();
        expect(parseOptions.dynamicTyping).toBeTruthy();
        expect(typeof parseOptions.complete).toEqual('function');

        expect(fakeValidateFileContents.callCount).toEqual(1);
        expect(fakeValidateFileContents.getCall(0).args[0]).toEqual({ SellingRotationId: "SRID", Quarter: "QTR", Year: "YEAR", DeliveryStream: "STREAM", RatecardId: 'RATECARDID' });
        expect(fakeValidateFileContents.getCall(0).args[1]).toEqual(mockParseResult.data);
        expect(fakeValidateFileContents.getCall(0).args[2]).toEqual(['F2-5', 'F6-8', 'F65+', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'HH', 'M2-5', 'M6-8', 'M65+',
            'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'QTR', 'RATECARDID', 'SRID', 'STREAM', 'YEAR']);

        expect(window.toastr.info.callCount).toEqual(0);
        expect(fakeConvertToDto.callCount).toEqual(0);
        expect(fakeValidateEstimateUpload.callCount).toEqual(0);

        expect(fakeFileInput.val.callCount).toEqual(1);
        expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
    });

    it('handleChange does no further processing for invalid data calling ValidateFileContentWithSpecificValidationMessages', () => {
        // arrange
        const mockFileName = 'test.csv';
        const mockFile = {
            name: mockFileName
        };
        const fakeFileInput = {
            0: {
                files: [
                    mockFile
                ]
            },
            val: sinon.fake()
        };
        //const fakeValidateFileContents = sinon.fake.returns(false);
        const fakeValidateFileContentWithSpecificValidationMessages = sinon.fake.returns(false);
        const fakeConvertToDto = sinon.fake();
        const fakeValidateEstimateUpload = sinon.fake();
        const mockParseResult = {
            errors: [],
            data: [
                {
                    'F2-5': 7848,
                    'F6-8': 3436,
                    'F65+': 118362,
                    'F911': 2933,
                    'F1214': 4405,
                    'F1517': 6421,
                    'F1820': 5582,
                    'F2124': 5971,
                    'F2529': 21672,
                    'F3034': 28651,
                    'F3539': 20189,
                    'F4044': 23228,
                    'F4549': 31825,
                    'F5054': 38772,
                    'F5564': 81884,
                    'HH': 311331,
                    'M2-5': 11202,
                    'M6-8': 7805,
                    'M65+': 231879,
                    'M911': 13677,
                    'M1214': 10628,
                    'M1517': 9064,
                    'M1820': 16730,
                    'M2124': 18433,
                    'M2529': 39989,
                    'M3034': 47383,
                    'M3539': 52237,
                    'M4044': 40678,
                    'M4549': 59026,
                    'M5054': 67276,
                    'M5564': 176305,
                    'PRICE PERIOD NAME': "PB1",
                    'QTR': 4,
                    'RATECARDID': 16,
                    'SRID': 49999,
                    'STREAM': "C3",
                    'YEAR': 2021
                }
            ]
        };

        sinon.replace(window.toastr, 'info', sinon.fake());
        sinon.replace(window.Papa, 'parse', sinon.fake(({ }, { complete }) => {
            complete(mockParseResult);
        }));
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.validateFileContentWithSpecificValidationMessages(fakeValidateFileContentWithSpecificValidationMessages);
        window.uploadEstimates.testingOnly.override.convertToDto(fakeConvertToDto);
        window.uploadEstimates.testingOnly.override.validateEstimateUpload(fakeValidateEstimateUpload);
        window.uploadEstimates.testingOnly.override.featureFlagPricePeriodEnabledForCsvUploadFile(true);

        // act
        const result = window.uploadEstimates.testingOnly.handleChange();

        // assert
        expect(result).toBeUndefined();
        expect(window.Papa.parse.callCount).toEqual(1);
        expect(window.Papa.parse.getCall(0).args[0]).toEqual(mockFile);

        const parseOptions = window.Papa.parse.getCall(0).args[1];
        expect(parseOptions.header).toBeTruthy();
        expect(parseOptions.skipEmptyLines).toBeTruthy();
        expect(parseOptions.dynamicTyping).toBeTruthy();
        expect(typeof parseOptions.complete).toEqual('function');

        expect(fakeValidateFileContentWithSpecificValidationMessages.callCount).toEqual(1);
        expect(fakeValidateFileContentWithSpecificValidationMessages.getCall(0).args[0]).toEqual({ SellingRotationId: "SRID", Quarter: "QTR", Year: "YEAR", PPName: "PRICE PERIOD NAME", DeliveryStream: "STREAM", RatecardId: 'RATECARDID' });
        expect(fakeValidateFileContentWithSpecificValidationMessages.getCall(0).args[1]).toEqual(mockParseResult.data);
        expect(fakeValidateFileContentWithSpecificValidationMessages.getCall(0).args[2]).toEqual(['F2-5', 'F6-8', 'F65+', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'HH', 'M2-5', 'M6-8', 'M65+',
            'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'PRICE PERIOD NAME', 'QTR', 'RATECARDID', 'SRID', 'STREAM', 'YEAR']);

        expect(window.toastr.info.callCount).toEqual(0);
        expect(fakeConvertToDto.callCount).toEqual(0);
        expect(fakeValidateEstimateUpload.callCount).toEqual(0);

        expect(fakeFileInput.val.callCount).toEqual(1);
        expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
    });

    it('handleChange uploads valid data calling validateFileContents', () => {
        // arrange
        const mockFileName = 'test.csv';
        const mockFile = {
            name: mockFileName
        };
        const fakeFileInput = [
            {
                files: [
                    mockFile
                ]
            }
        ];
        const fakeValidateFileContents = sinon.fake.returns(true);
        const fakeConvertToDto = sinon.fake.returns('dto');
        const fakeUploadEstimate = sinon.fake();
        const fakeValidateEstimateUpload = sinon.fake();
        const mockDataItem = {
            'F2-5': 7848,
            'F6-8': 3436,
            'F65+': 118362,
            'F911': 2933,
            'F1214': 4405,
            'F1517': 6421,
            'F1820': 5582,
            'F2124': 5971,
            'F2529': 21672,
            'F3034': 28651,
            'F3539': 20189,
            'F4044': 23228,
            'F4549': 31825,
            'F5054': 38772,
            'F5564': 81884,
            'HH': 311331,
            'M2-5': 11202,
            'M6-8': 7805,
            'M65+': 231879,
            'M911': 13677,
            'M1214': 10628,
            'M1517': 9064,
            'M1820': 16730,
            'M2124': 18433,
            'M2529': 39989,
            'M3034': 47383,
            'M3539': 52237,
            'M4044': 40678,
            'M4549': 59026,
            'M5054': 67276,
            'M5564': 176305,
            'QTR': 4,
            'RATECARDID': 16,
            'SRID': 49999,
            'STREAM': "C3",
            'YEAR': 2021
        };
        const mockParseResult = {
            errors: [],
            data: [
                mockDataItem
            ]
        };
        const expectedToastrMessage = 'Upload is in progress.';

        fakeFileInput.val = sinon.fake();
        sinon.replace(window.toastr, 'info', sinon.fake());
        sinon.replace(window.Papa, 'parse', sinon.fake(({ }, { complete }) => {
            complete(mockParseResult);
        }));
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.validateFileContents(fakeValidateFileContents);
        window.uploadEstimates.testingOnly.override.convertToDto(fakeConvertToDto);
        window.uploadEstimates.testingOnly.override.validateEstimateUpload(fakeValidateEstimateUpload);
        window.uploadEstimates.testingOnly.override.featureFlagPricePeriodEnabledForCsvUploadFile(false);

        // act
        const result = window.uploadEstimates.testingOnly.handleChange();

        // assert
        expect(result).toBeUndefined();
        expect(window.Papa.parse.callCount).toEqual(1);
        expect(window.Papa.parse.getCall(0).args[0]).toEqual(mockFile);

        const parseOptions = window.Papa.parse.getCall(0).args[1];
        expect(parseOptions.header).toBeTruthy();
        expect(parseOptions.skipEmptyLines).toBeTruthy();
        expect(parseOptions.dynamicTyping).toBeTruthy();
        expect(typeof parseOptions.complete).toEqual('function');

        expect(fakeValidateFileContents.callCount).toEqual(1);
        expect(fakeValidateFileContents.getCall(0).args[0]).toEqual({ SellingRotationId: "SRID", Quarter: "QTR", Year: "YEAR", DeliveryStream: "STREAM", RatecardId: 'RATECARDID' });
        expect(fakeValidateFileContents.getCall(0).args[1]).toEqual(mockParseResult.data);
        expect(fakeValidateFileContents.getCall(0).args[2]).toEqual(['F2-5', 'F6-8', 'F65+', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'HH', 'M2-5', 'M6-8', 'M65+',
            'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'QTR', 'RATECARDID', 'SRID', 'STREAM', 'YEAR']);

        expect(window.toastr.info.callCount).toEqual(1);
        const toastrArgs = window.toastr.info.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedToastrMessage);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].tapToDismiss).toBeFalsy();
        expect(toastrArgs[2].extendedTimeOut).toEqual(0);
        expect(toastrArgs[2].timeOut).toEqual(0);

        expect(fakeConvertToDto.callCount).toEqual(1);
        expect(fakeConvertToDto.getCall(0).args[0]).toEqual({ SellingRotationId: "SRID", Quarter: "QTR", Year: "YEAR", DeliveryStream: "STREAM", RatecardId: 'RATECARDID' });
        expect(fakeConvertToDto.getCall(0).args[1]).toEqual(['F2-5', 'F6-8', 'F65+', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'HH', 'M2-5', 'M6-8', 'M65+',
            'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'QTR', 'RATECARDID', 'SRID', 'STREAM', 'YEAR']);
        expect(fakeConvertToDto.getCall(0).args[2]).toEqual(mockDataItem);

        //expect(fakeValidateEstimateUpload.callCount).toEqual(1);
        //expect(fakeValidateEstimateUpload.getCall(0).args[0]).toEqual(['dto']);

        expect(fakeFileInput.val.callCount).toEqual(1);
        expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
    });

    it('handleChange uploads valid data calling ValidateFileContentWithSpecificValidationMessages', () => {
        // arrange
        const mockFileName = 'test.csv';
        const mockFile = {
            name: mockFileName
        };
        const fakeFileInput = [
            {
                files: [
                    mockFile
                ]
            }
        ];
        const fakeValidateFileContentWithSpecificValidationMessages = sinon.fake.returns(true);
        const fakeConvertToDto = sinon.fake.returns('dto');
        //const fakeUploadEstimate = sinon.fake();
        const fakeValidateEstimateUpload = sinon.fake();
        const mockDataItem = {
            'F2-5': 7848,
            'F6-8': 3436,
            'F65+': 118362,
            'F911': 2933,
            'F1214': 4405,
            'F1517': 6421,
            'F1820': 5582,
            'F2124': 5971,
            'F2529': 21672,
            'F3034': 28651,
            'F3539': 20189,
            'F4044': 23228,
            'F4549': 31825,
            'F5054': 38772,
            'F5564': 81884,
            'HH': 311331,
            'M2-5': 11202,
            'M6-8': 7805,
            'M65+': 231879,
            'M911': 13677,
            'M1214': 10628,
            'M1517': 9064,
            'M1820': 16730,
            'M2124': 18433,
            'M2529': 39989,
            'M3034': 47383,
            'M3539': 52237,
            'M4044': 40678,
            'M4549': 59026,
            'M5054': 67276,
            'M5564': 176305,
            'PRICE PERIOD NAME': "PB1",
            'QTR': 4,
            'RATECARDID': 16,
            'SRID': 49999,
            'STREAM': "C3",
            'YEAR': 2021
        };
        const mockParseResult = {
            errors: [],
            data: [
                mockDataItem
            ]
        };
        const expectedToastrMessage = 'Upload is in progress.';

        fakeFileInput.val = sinon.fake();
        sinon.replace(window.toastr, 'info', sinon.fake());
        sinon.replace(window.Papa, 'parse', sinon.fake(({ }, { complete }) => {
            complete(mockParseResult);
        }));
        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInput);
        window.uploadEstimates.testingOnly.override.validateFileContentWithSpecificValidationMessages(fakeValidateFileContentWithSpecificValidationMessages);
        window.uploadEstimates.testingOnly.override.convertToDto(fakeConvertToDto);
        window.uploadEstimates.testingOnly.override.validateEstimateUpload(fakeValidateEstimateUpload);
        window.uploadEstimates.testingOnly.override.featureFlagPricePeriodEnabledForCsvUploadFile(true);

        // act
        const result = window.uploadEstimates.testingOnly.handleChange();

        // assert
        expect(result).toBeUndefined();
        expect(window.Papa.parse.callCount).toEqual(1);
        expect(window.Papa.parse.getCall(0).args[0]).toEqual(mockFile);

        const parseOptions = window.Papa.parse.getCall(0).args[1];
        expect(parseOptions.header).toBeTruthy();
        expect(parseOptions.skipEmptyLines).toBeTruthy();
        expect(parseOptions.dynamicTyping).toBeTruthy();
        expect(typeof parseOptions.complete).toEqual('function');

        expect(fakeValidateFileContentWithSpecificValidationMessages.callCount).toEqual(1);
        expect(fakeValidateFileContentWithSpecificValidationMessages.getCall(0).args[0]).toEqual({ SellingRotationId: "SRID", Quarter: "QTR", Year: "YEAR", PPName: "PRICE PERIOD NAME", DeliveryStream: "STREAM", RatecardId: 'RATECARDID' });
        expect(fakeValidateFileContentWithSpecificValidationMessages.getCall(0).args[1]).toEqual(mockParseResult.data);
        expect(fakeValidateFileContentWithSpecificValidationMessages.getCall(0).args[2]).toEqual(['F2-5', 'F6-8', 'F65+', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'HH', 'M2-5', 'M6-8', 'M65+',
            'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'PRICE PERIOD NAME', 'QTR', 'RATECARDID', 'SRID', 'STREAM', 'YEAR']);

        expect(window.toastr.info.callCount).toEqual(1);
        const toastrArgs = window.toastr.info.getCall(0).args;
        expect(toastrArgs[0]).toEqual(expectedToastrMessage);
        expect(toastrArgs[1]).toBeNull();
        expect(toastrArgs[2].tapToDismiss).toBeFalsy();
        expect(toastrArgs[2].extendedTimeOut).toEqual(0);
        expect(toastrArgs[2].timeOut).toEqual(0);

        expect(fakeConvertToDto.callCount).toEqual(1);
        expect(fakeConvertToDto.getCall(0).args[0]).toEqual({ SellingRotationId: "SRID", Quarter: "QTR", Year: "YEAR", PPName: "PRICE PERIOD NAME", DeliveryStream: "STREAM", RatecardId: 'RATECARDID' });
        expect(fakeConvertToDto.getCall(0).args[1]).toEqual(['F2-5', 'F6-8', 'F65+', 'F911', 'F1214', 'F1517', 'F1820', 'F2124', 'F2529', 'F3034', 'F3539', 'F4044', 'F4549', 'F5054', 'F5564', 'HH', 'M2-5', 'M6-8', 'M65+',
            'M911', 'M1214', 'M1517', 'M1820', 'M2124', 'M2529', 'M3034', 'M3539', 'M4044', 'M4549', 'M5054', 'M5564', 'PRICE PERIOD NAME', 'QTR', 'RATECARDID', 'SRID', 'STREAM', 'YEAR']);
        expect(fakeConvertToDto.getCall(0).args[2]).toEqual(mockDataItem);

        //expect(fakeValidateEstimateUpload.callCount).toEqual(1);
        //expect(fakeValidateEstimateUpload.getCall(0).args[0]).toEqual(['dto']);

        expect(fakeFileInput.val.callCount).toEqual(1);
        expect(fakeFileInput.val.getCall(0).args[0]).toEqual('');
    });

    it('initialize throws error for missing selector', () => {
        // arrange
        const expectedErrorMessage = 'upload module needs file input.';
        const options = {};

        window.uploadEstimates.testingOnly.override.handleChange(undefined);

        // act & assert
        expect(() => window.uploadEstimates.initialize(options)).toThrow(new Error(expectedErrorMessage));
        window.uploadEstimates.testingOnly.restore('handleChange');
    });

    it('initialize sets up change handler and sets true in featureFlagPricePeriodEnabledForCsvUploadFile', () => {
        // arrange
        $('body').append('<input class="test-uploadEstimates-0" />');

        const fakeHandleChange = sinon.fake();
        const settings = {
            selector: '.test-uploadEstimates-0'
        };
        const fileInput = $(settings.selector);

        var fakeAdvisorSettings = {
            featureFlagPricePeriodEnabledForCsvUploadFile: true
        }
        var advisorSettingsRightValue = window.advisorSettings;

        window.advisorSettings = fakeAdvisorSettings;   //mocking        
        window.uploadEstimates.testingOnly.override.handleChange(fakeHandleChange);

        // act
        const result = window.uploadEstimates.initialize(settings);
        fileInput.trigger('change');

        // assert
        expect(result).toBeUndefined();
        expect(fakeHandleChange.callCount).toEqual(1);

        window.advisorSettings = advisorSettingsRightValue; //restore 
        var inputs = document.querySelectorAll(".test-uploadEstimates-0");
        if (inputs) {
            inputs.forEach((el) => el.remove());
        }
    });

    it('initialize sets up change handler and sets false in featureFlagPricePeriodEnabledForCsvUploadFile due to the feature flag false value in web.config', () => {
        // arrange
        $('body').append('<input class="test-uploadEstimates-0" />');

        const fakeHandleChange = sinon.fake();
        const settings = {
            selector: '.test-uploadEstimates-0'
        };
        const fileInput = $(settings.selector);
        var fakeAdvisorSettings = {
            featureFlagPricePeriodEnabledForCsvUploadFile: false
        }
        var advisorSettingsRightValue = window.advisorSettings;

        window.advisorSettings = fakeAdvisorSettings;   //mocking        
        window.uploadEstimates.testingOnly.override.handleChange(fakeHandleChange);

        // act
        const result = window.uploadEstimates.initialize(settings);
        fileInput.trigger('change');

        // assert
        expect(result).toBeUndefined();
        expect(fakeHandleChange.callCount).toEqual(1);
        window.advisorSettings = advisorSettingsRightValue; //restore 
        var inputs = document.querySelectorAll(".test-uploadEstimates-0");
        if (inputs) {
            inputs.forEach((el) => el.remove());
        }
    });

    it('initialize sets up change handler and sets undefined in featureFlagPricePeriodEnabledForCsvUploadFile due to missing feature flag in web.config', () => {
        // arrange
        $('body').append('<input class="test-uploadEstimates-0" />');

        const fakeHandleChange = sinon.fake();
        const settings = {
            selector: '.test-uploadEstimates-0'
        };
        const fileInput = $(settings.selector);
        var fakeAdvisorSettings = {
            featureFlagPricePeriodEnabledForCsvUploadFile: undefined
        }
        var advisorSettingsRightValue = window.advisorSettings;

        window.advisorSettings = fakeAdvisorSettings;   //mocking 
        window.uploadEstimates.testingOnly.override.handleChange(fakeHandleChange);

        // act
        const result = window.uploadEstimates.initialize(settings);
        fileInput.trigger('change');

        // assert
        expect(result).toBeUndefined();
        expect(fakeHandleChange.callCount).toEqual(1);
        window.advisorSettings = advisorSettingsRightValue; //restore 
        var inputs = document.querySelectorAll(".test-uploadEstimates-0");
        if (inputs) {
            inputs.forEach((el) => el.remove());
        }
    });

    it('openFileSelector throws error for falsy element', () => {
        // arrange
        const expectedErrorMessage = 'upload module has not been initialized.';

        window.uploadEstimates.testingOnly.override.$fileInput(undefined);

        // act & assert
        expect(window.uploadEstimates.openFileSelector).toThrow(new Error(expectedErrorMessage));
        window.uploadEstimates.testingOnly.restore('$fileInput');
    });

    it('openFileSelector fires click event', () => {
        // arrange
        const fakeClick = sinon.fake();
        const fakeFileInputElement = {
            click: fakeClick
        };

        window.uploadEstimates.testingOnly.override.$fileInput(fakeFileInputElement);

        // act
        window.uploadEstimates.openFileSelector();

        // assert
        expect(fakeClick.callCount).toEqual(1);
        window.uploadEstimates.testingOnly.restore('$fileInput');
    });
});



