import React from 'react';
import Cell from './Cell';

const SpreadsheetBody = ({ cells, isSelected, updateCell, setSelection, selection, isMouseDown }) => {
	return (
		<tbody>
			{cells.map((row, rowIndex) => (
				<tr key={rowIndex}>
					<th>{rowIndex + 1}</th>
					{row.map((cell, colIndex) => (
						<Cell
							key={colIndex}
							cell={cell}
							isSelected={isSelected(rowIndex, colIndex)}
							onChange={(val) => updateCell(rowIndex, colIndex, val)}
							onMouseDown={() => setSelection({ start: [rowIndex, colIndex], end: [rowIndex, colIndex] })}
							onMouseEnter={() => {
								if (isMouseDown && selection) {
									setSelection({ ...selection, end: [rowIndex, colIndex] });
								}
							}}
						/>
					))}
				</tr>
			))}
		</tbody>
	);
};

export default SpreadsheetBody;
