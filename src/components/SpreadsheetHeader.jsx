import React from 'react';

const SpreadsheetHeader = ({ columnCount }) => {
	return (
		<thead>
			<tr>
				<th></th>
				{Array.from({ length: columnCount }).map((_, i) => (
					<th key={i}>{String.fromCharCode(65 + i)}</th>
				))}
			</tr>
		</thead>
	);
};

export default React.memo(SpreadsheetHeader);
