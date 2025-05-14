const Toolbar = ({ onBold, onColor, onSave, onLoad }) => {
	return (
		<div className='toolbar left-margin'>
			<button className='toolbar-button' onClick={onBold}>
				Bold
			</button>
			<input
				type='color'
				className='toolbar-color'
				title='Pick background color'
				onChange={(e) => onColor(e.target.value)}
			/>
			<button className='toolbar-button' onClick={onSave}>
				Save JSON
			</button>
			<label className='toolbar-button' style={{ display: 'inline-block' }}>
				Load JSON
				<input type='file' accept='.json' onChange={onLoad} style={{ display: 'none' }} />
			</label>
		</div>
	);
};

export default Toolbar;
