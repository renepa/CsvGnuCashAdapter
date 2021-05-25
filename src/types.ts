
export class ParsedRow {
    Buchungstag: Date;
    Umsatz: string;
    "Vorgang/Verwendungszweck": string
    "Auftraggeber/Zahlungsempfänger": string;
    "Empfänger/Zahlungspflichtiger": string;
}

export class VolksbankSplit {
    datum: Date;
    ausgabe: string;
    einnahme: string;
    beschreibung: string;
    type: "S" | "H";
}
