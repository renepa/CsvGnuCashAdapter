import {ParsedRow, VolksbankSplit} from "./types";

const csvparser = require('csv-parse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csvWriter = createCsvWriter({
    path: 'files/out.csv',
    header: [
        {id: 'datum', title: 'Datum'},
        {id: 'beschreibung', title: 'Beschreibung'},
        {id: 'ausgabe', title: 'Ausgabe'},
        {id: 'einnahme', title: 'Einnahme'}
    ]
});

readSplitCsv();

function readSplitCsv(): Array<VolksbankSplit> {
    var result: Array<VolksbankSplit> = new Array<VolksbankSplit>();

    let inputFilePath: string = getInputFilePath();
    let readstream = fs.createReadStream(inputFilePath);
    readstream.pipe(csvparser({columns: true, skip_empty_lines: true, delimiter: ";", from_line: 12}))
        .on('data', (parsedSplit) => {
            result.push(mapImportedSplit(parsedSplit));
        })
        .on('end', () => {
            writeSplits(result);
        });
    return result;
}


function mapImportedSplit(parsedRow: ParsedRow): VolksbankSplit {
    let split = new VolksbankSplit();
    split.datum = parsedRow.Buchungstag;
    split.type = parsedRow[" "];
    if (split.type === "S") {
        split.ausgabe = parsedRow.Umsatz;
        split.beschreibung = parsedRow["Empfänger/Zahlungspflichtiger"] + " : "+parsedRow["Vorgang/Verwendungszweck"];
    } else {
        split.einnahme = parsedRow.Umsatz;
        split.beschreibung = parsedRow["Auftraggeber/Zahlungsempfänger"] + " : "+parsedRow["Vorgang/Verwendungszweck"];
    }

    return split;
}

function writeSplits(splits: Array<VolksbankSplit>) {
    csvWriter.writeRecords(splits);
}

function getInputFilePath(): string {
    let allArguments: string[] = process.argv.slice(2);
    if (allArguments.length === 0) throw new Error("File path to source file needed");
    return allArguments[0];
}