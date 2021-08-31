import React, { Component } from 'react';

class Restart extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id='reset'>
				<span id='undo'>undo</span>
				<span id='restart'>restart</span>
			</div>
		);
	}
}


export default Restart;
