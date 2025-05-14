import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Toolbar from './Toolbar';
import SpreadsheetHeader from './SpreadsheetHeader';
import SpreadsheetBody from './SpreadsheetBody';
import { evaluateFormula } from '../utils/formulaEngine';
import {
	copySelectionToClipboard,
	pasteClipboardToCells,
	applyBoldToSelection,
	applyColorToSelection,
	handleJsonLoad,
} from '../utils/spreadsheetUtils';

const defaultCell = () => ({
	value: '',
	computed: '',
	format: { bold: false, bgColor: '' },
});

const Spreadsheet = () => {
	const [cells, setCells] = useState(Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => defaultCell())));
	const [selection, setSelection] = useState(null);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const computeAll = useCallback((inputCells) => {
		const getFromInput = (row, col) => inputCells?.[row]?.[col]?.value ?? '';
		return inputCells.map((row) =>
			row.map((cell) => {
				if (cell.value.startsWith('=')) {
					return {
						...cell,
						computed: evaluateFormula(cell.value, getFromInput),
					};
				}
				return { ...cell, computed: cell.value };
			}),
		);
	}, []);

	const updateCell = useCallback(
		(row, col, value) => {
			setCells((prev) => {
				const updated = [...prev];
				updated[row][col] = { ...updated[row][col], value };
				return computeAll(updated);
			});
		},
		[computeAll],
	);

	const isSelected = useCallback(
		(row, col) => {
			if (!selection) return false;
			const [startRow, startCol] = selection.start;
			const [endRow, endCol] = selection.end;
			return (
				row >= Math.min(startRow, endRow) &&
				row <= Math.max(startRow, endRow) &&
				col >= Math.min(startCol, endCol) &&
				col <= Math.max(startCol, endCol)
			);
		},
		[selection],
	);

	const addRow = () => {
		const updated = [...cells, Array.from({ length: cells[0].length }, () => defaultCell())];
		setCells(computeAll(updated));
	};

	const addColumn = () => {
		const updated = cells.map((row) => [...row, defaultCell()]);
		setCells(computeAll(updated));
	};

	const applyBold = () => {
		const updated = applyBoldToSelection(cells, selection);
		setCells([...updated]);
	};

	const applyColor = (color) => {
		const updated = applyColorToSelection(cells, selection, color);
		setCells([...updated]);
	};

	const pasteFromClipboard = async () => {
		const text = await navigator.clipboard.readText();
		const updated = pasteClipboardToCells(cells, selection, text, defaultCell);
		setCells(computeAll(updated));
	};

	const handleSave = () => {
		const blob = new Blob([JSON.stringify(cells, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'spreadsheet.json';
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleLoad = (e) => {
		handleJsonLoad(e, computeAll, setCells);
	};

	useEffect(() => {
		const handleKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
				e.preventDefault();
				copySelectionToClipboard(cells, selection);
			} else if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
				e.preventDefault();
				pasteFromClipboard();
			}
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [selection, cells]);

	return (
		<div className='spreadsheet' onMouseDown={() => setIsMouseDown(true)} onMouseUp={() => setIsMouseDown(false)}>
			<Toolbar onBold={applyBold} onColor={applyColor} onSave={handleSave} onLoad={handleLoad} />
			<div className='button-group'>
				<button className='toolbar-button' onClick={addRow}>
					Add Row
				</button>
				<button className='toolbar-button' onClick={addColumn}>
					Add Column
				</button>
			</div>
			<table className='spreadsheet-table'>
				<SpreadsheetHeader columnCount={cells[0].length} />
				<SpreadsheetBody
					cells={cells}
					isSelected={isSelected}
					updateCell={updateCell}
					setSelection={setSelection}
					selection={selection}
					isMouseDown={isMouseDown}
				/>
			</table>
		</div>
	);
};

export default Spreadsheet;
