export function evaluateFormula(formula, getCellValue) {
	try {
		if (!formula.startsWith('=')) return formula;

		const expression = formula.slice(1).toUpperCase();

		if (expression.startsWith('SUM(') || expression.startsWith('AVERAGE(')) {
			return evaluateFunction(expression, getCellValue);
		}

		return 'ERROR';
	} catch {
		return 'ERROR';
	}
}

function evaluateFunction(expression, getCellValue) {
	const functionName = expression.split('(')[0];
	const rangeMatch = expression.match(/([A-Z]+\d+):?([A-Z]+\d+)?/);

	if (!rangeMatch) return 'ERROR';

	const startCell = rangeMatch[1];
	const endCell = rangeMatch[2] || startCell;

	const startCol = columnLetterToIndex(startCell.match(/[A-Z]+/)[0]);
	const startRow = parseInt(startCell.match(/\d+/)[0], 10) - 1;
	const endCol = columnLetterToIndex(endCell.match(/[A-Z]+/)[0]);
	const endRow = parseInt(endCell.match(/\d+/)[0], 10) - 1;

	const values = [];

	for (let row = startRow; row <= endRow; row++) {
		for (let col = startCol; col <= endCol; col++) {
			const raw = getCellValue(row, col);
			const value = parseFloat(raw);
			if (!isNaN(value)) {
				values.push(value);
			}
		}
	}

	if (functionName === 'SUM') {
		return values.reduce((a, b) => a + b, 0);
	}

	if (functionName === 'AVERAGE') {
		return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
	}

	return 'ERROR';
}

function columnLetterToIndex(letters) {
	return letters.split('').reduce((acc, char) => acc * 26 + (char.charCodeAt(0) - 64), 0) - 1;
}
