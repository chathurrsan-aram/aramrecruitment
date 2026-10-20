// Keep free-text cells as text on initial spreadsheet import. CSV quotation by
// itself only escapes separators; it does not neutralise formula-like values.
// Amounts remain numeric, including negative deployment values.
function csvCell(value) {
    let text = typeof value === 'number' ? value.toFixed(2) : value;
    if (typeof value === 'string' && (/^[\t\r\n]/u.test(text) || /^[\s\uFEFF]*[=+\-@＝＋－＠]/u.test(text)))
        text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
}
export function ledgerCsv(state) {
    const rows = [['Demonstration data only — not actual Aram financial records'], ['Date', 'Description', 'Project', 'Kind', 'Amount GBP'], ...state.transactions.map(t => [t.date, t.description, state.projects.find(p => p.id === t.projectId)?.title || 'Community fund', t.kind, t.amountPence / 100])];
    return rows.map(row => row.map(csvCell).join(',')).join('\r\n');
}
