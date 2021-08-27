import React, { Component } from 'react';

class Board extends Component {
    constructor(props) {	
		super(props);
        this.state = {
            zz : 'block0',
            zo : 'block0',
            zt : 'block0',
            zth : 'block0',
            oz : 'block0',
            oo : 'block0',
            ot : 'block0',
            oth : 'block0',
            tz : 'block0',
            to : 'block0',
            tt : 'block0',
            tth : 'block0',
            thz : 'block0',
            tho : 'block0',
            tht : 'block0',
            thth : 'block0',
            word : [,,,,,,,,,,,,,,,],
        };
	}
    
    //block moving function
    moveBlocks(e) {
        switch(e.keyCode) {
            case 37://left
                break;
            case 38: //up
                break;
            case 39: //right
                break;
            case 40: //down
                break;
        }
    }

    //move blocks function
    //충돌 시 병합 여부 체크하기
    // setState하기
    


	render() {
		return (
            <div className="background">
                <input onKeyPress={this.moveBlocks} />
			    <table id='board'>
                    <tr>
                        <td className={this.state.zz}>{this.state.word[0]}</td>
                        <td className={this.state.zo}>{this.state.word[1]}</td>
                        <td className={this.state.zt}>{this.state.word[2]}</td>
                        <td className={this.state.zth}>{this.state.word[3]}</td>
                    </tr>
                    <tr>
                        <td className={this.state.oz}>{this.state.word[4]}</td>
                        <td className={this.state.oo}>{this.state.word[5]}</td>
                        <td className={this.state.ot}>{this.state.word[6]}</td>
                        <td className={this.state.oth}>{this.state.word[7]}</td>
                    </tr>
                    <tr>
                        <td className={this.state.tz}>{this.state.word[8]}</td>
                        <td className={this.state.to}>{this.state.word[9]}</td>
                        <td className={this.state.tt}>{this.state.word[10]}</td>
                        <td className={this.state.tth}>{this.state.word[11]}</td>
                    </tr>
                    <tr>
                        <td className={this.state.thz}>{this.state.word[12]}</td>
                        <td className={this.state.tho}>{this.state.word[13]}</td>
                        <td className={this.state.tht}>{this.state.word[14]}</td>
                        <td className={this.state.thth}>{this.state.word[15]}</td>
                    </tr>
            </table>
            </div>
		);
	}
}


export default Board;
