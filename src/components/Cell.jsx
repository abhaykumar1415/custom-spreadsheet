import React, { useState } from 'react';

const Cell = ({ cell, onChange, isSelected, onMouseDown, onMouseEnter }) => {
	const [isEditing, setIsEditing] = useState(false);

	const cellClass = `cell ${isSelected ? 'selected' : 'unselected'}`;

	const tdStyle = {
		backgroundColor: isSelected ? '#cce5ff' : cell.format.bgColor || 'white',
		padding: 0,
		margin: 0,
	};

	const inputStyle = {
		fontWeight: cell.format.bold ? 'bold' : 'normal',
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		border: 'none',
		backgroundColor: 'transparent',
		textAlign: 'left',
		padding: '4px',
		fontSize: '14px',
		outline: isSelected ? '2px solid #3c77ff' : 'none',
	};

	return (
		<td className={cellClass} style={tdStyle} onMouseDown={onMouseDown} onMouseEnter={onMouseEnter}>
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
