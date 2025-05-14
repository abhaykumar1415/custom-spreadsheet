export function copySelectionToClipboard(cells, selection) {
	if (!selection) return;
	const [startRow, startCol] = selection.start;
	const [endRow, endCol] = selection.end;

	let copied = '';
	for (let i = startRow; i <= endRow; i++) {
		let row = [];
		for (let j = startCol; j <= endCol; j++) {
			row.push(cells[i]?.[j]?.value || '');
		}
		copied += row.join('\t') + '\n';
	}

	navigator.clipboard.writeText(copied.trim());
}

export function pasteClipboardToCells(cells, selection, text, defaultCell) {
	const [startRow, startCol] = selection.start;
	const lines = text.split('\n');
	const updated = [...cells];

	lines.forEach((line, i) => {
		const values = line.split('\t');
		values.forEach((val, j) => {
			const row = startRow + i;
			const col = startCol + j;
			if (!updated[row]) updated[row] = [];
			updated[row][col] = { ...defaultCell(), value: val };
		});
	});

	return updated;
}

export function applyBoldToSelection(cells, selection) {
	const [startRow, startCol] = selection.start;
	const [endRow, endCol] = selection.end;
	const updated = [...cells];
	for (let i = startRow; i <= endRow; i++) {
		for (let j = startCol; j <= endCol; j++) {
			updated[i][j].format.bold = !updated[i][j].format.bold;
		}
	}
	return updated;
}

export function applyColorToSelection(cells, selection, color) {
	const [startRow, startCol] = selection.start;
	const [endRow, endCol] = selection.end;
	const updated = [...cells];
	for (let i = startRow; i <= endRow; i++) {
		for (let j = startCol; j <= endCol; j++) {
			updated[i][j].format.bgColor = color;
		}
	}
	return updated;
}

export function handleJsonLoad(event, computeAll, setCells) {
	const file = event.target.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = (e) => {
		try {
			const loaded = JSON.parse(e.target.result);
			if (Array.isArray(loaded)) {
				const recalculated = computeAll(loaded);
				setCells(recalculated);
			} else {
				alert('Invalid JSON file.');
			}
		} catch {
			alert('Failed to load JSON.');
		}
	};
	reader.readAsText(file);
}
