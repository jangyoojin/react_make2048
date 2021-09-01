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
					<span className="boxTitle">Score</span>
					<div className="boxText">{this.props.score}</div>
				</span>
				<span>
					<span className="boxTitle" style={{ padding: "5px 13px 5px 12px" }}>Best</span>
					<div className="boxText" >{this.props.best}</div>
				</span>
			</div >
		);
	}
}


export default Score;
