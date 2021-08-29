import React, { Component } from 'react';

class Score extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="TitleScore">
				<span class="veryj">
					<span class="text-style-1">2048</span>ver.yj
				</span>
				<span>
					<span class="scorebox">Score</span>
					<span class="bestbox">Best</span>
				</span>
			</div>
		);
	}
}


export default Score;
