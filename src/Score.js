import React, { Component } from 'react';

class Score extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="TitleScore">
				<span className="veryj">
					<span className="text-style-1">2048</span>ver.yj
				</span>
				<span>
					<span className="scorebox">Score
						{this.props.score}</span>
					<span className="bestbox">Best
						{this.props.best}</span>
				</span>
			</div>
		);
	}
}


export default Score;
