import React, { useState } from 'react';

const Cell = ({ cell, onChange, isSelected, onMouseDown, onMouseEnter }) => {
	const [isEditing, setIsEditing] = useState(false);

	const cellClass = `cell ${isSelected ? 'selected' : 'unselected'}`;
	const inputStyle = {
		fontWeight: cell.format.bold ? 'bold' : 'normal',
	};

	return (
		<td className={cellClass} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}>
			<input
				type='text'
				value={isEditing ? cell.value : cell.computed}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setIsEditing(true)}
				onBlur={() => setIsEditing(false)}
				style={inputStyle}
				title={cell.computed}
			/>
		</td>
	);
};

export default React.memo(Cell);
