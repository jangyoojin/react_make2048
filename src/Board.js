import React, { Component } from 'react';

const getRandom = (min,max) => Math.floor(Math.random()*(max-min)+min);

class Board extends Component {
    constructor(props) {	
		super(props);
        this.state = {
            classNa: [['block0','block0','block0','block0'],
            ['block0','block0','block0','block0'],
            ['block0','block0','block0','block0'],
            ['block0','block0','block0','block0']],
            word : [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
            key: 0,
        };
        this.NewBlock = this.NewBlock.bind(this);
        this.moveBlocks = this.moveBlocks.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveLeft2 = this.moveLeft2.bind(this);
	}

    componentDidMount(){
        this.NewBlock();
        this.NewBlock();
    }

    //make new blocks
    //블럭이 들어있지 않은 자리에 숫자2 블럭을 추가함
    NewBlock() {
        var i, j;
        do{
            i = getRandom(0,3);
            j = getRandom(0,3);
        } while(this.state.classNa[i][j] !== 'block0')      
        const classNameUpdate = [...this.state.classNa];
        const wordUpdate = [...this.state.word];
        classNameUpdate[i][j] = 'block2';
        wordUpdate[i][j] = 2;
        this.setState({classNa: classNameUpdate});
        this.setState({word: wordUpdate});
    }

    //block moving function
    moveBlocks(e) {
        switch(e.keyCode) {
            case 37://left
                this.moveLeft2();
                break;
            case 38: //up
                this.moveUp();
                break;
            case 39: //right
                console.log("right");
                break;
            case 40: //down
                console.log("down");    
                break;
        }
    }

    //move blocks function
    //충돌 시 병합 여부 체크하기
    // setState하기
    moveLeft() {
        const classNameUpdate = [...this.state.classNa];
        const wordUpdate = [...this.state.word];
        //병합할 것들 병합하기
        for (var i=0;i<4;i++){
            for(var j=1;j<4;j++){
                if(classNameUpdate[i][j] !== 'block0'){
                    var leftest;
                    for(leftest=col-1;leftest>0;leftest--){
                        if(classNameUpdate[i][leftest]!=='block0'){
                            break;
                        }
                    }
                    if(classNameUpdate[i][j]===classNameUpdate[i][leftest]){
                        if(wordUpdate[i][j] !== 0){
                            wordUpdate[i][leftest] = wordUpdate[i][leftest]*2;
                            classNameUpdate[i][leftest] = 'block'+wordUpdate[i][j];
                            wordUpdate[i][j] = 0;
                            classNameUpdate[i][j] = 'block0';
                            j++;
                        }
                    }                    
                }
            }
        }
        //병합으로 생긴 빈공간 따라 이동
        for (var row=0;row<4;row++){
            for(var col=1;col<4;col++){
                if(classNameUpdate[row][col] !== 'block0'){
                    var leftest;
                    for(leftest=col-1;leftest>0;leftest--){
                        if(classNameUpdate[row][leftest]!=='block0'){
                            break;
                        }
                    }
                    classNameUpdate[row][leftest+1] = classNameUpdate[row][col];
                    wordUpdate[row][leftest+1] = wordUpdate[row][col];
                    classNameUpdate[row][col] = 'block0';
                    wordUpdate[row][col] = 0;
                }
            }
        }
        this.setState({className: classNameUpdate});
        this.setState({word: wordUpdate});
        this.NewBlock();
    }

    moveUp() {
        const classNameUpdate = [...this.state.classNa];
        const wordUpdate = [...this.state.word];
        //병합할 것들 병합하기
        for (var i=0;i<4;i++){ 
            for(var j=1;j<4;j++){
                if(classNameUpdate[j][i] !== 'block0'){
                    var upest;
                    for(upest=j-1;upest>0;upest--){
                        if(classNameUpdate[upest][i]!=='block0' || upest === 0){
                            break;
                        }
                    }
                    console.log(upest);
                    if(classNameUpdate[j][i]===classNameUpdate[upest][i]){
                        if(classNameUpdate[j][i] !== 0){
                            wordUpdate[upest][i] = wordUpdate[j][i]*2;
                            classNameUpdate[upest][i] = 'block'+wordUpdate[j][i];
                            wordUpdate[j][i]= 0;
                            classNameUpdate[j][i] = 'block0';
                            j++;
                        }
                    }                    
                }
            }
        }
        //병합으로 생긴 빈공간 따라 이동
        for (var col=0;col<4;col++){
            for(var row=1;row<4;row++){
                if(classNameUpdate[row][col] !== 'block0'){
                    var upest;
                    for(upest=col-1;upest>0;upest--){
                        if(classNameUpdate[upest][col]!=='block0'){
                            break;
                        }
                    }
                    classNameUpdate[upest+1][col] = classNameUpdate[row][col];
                    wordUpdate[upest+1][col] = wordUpdate[row][col];
                    classNameUpdate[row][col] = 'block0';
                    wordUpdate[row][col] = 0;
                }
            }
        }
        this.setState({className: classNameUpdate});
        this.setState({word: wordUpdate});
        this.NewBlock();    
    }

    moveLeft2() {
        const classNameUpdate = [...this.state.classNa];
        const wordUpdate = [...this.state.word];
        //병합
        for(var i=0;i<4;i++){
            //한 줄에 병합을 두 번 하는 경우
            if(classNameUpdate[i][0]===classNameUpdate[i][1] && classNameUpdate[i][2]===classNameUpdate[i][3]){
                if(classNameUpdate[i][0]!=='block0'){
                    wordUpdate[i][0] *= 2;
                    classNameUpdate[i][0] = 'block'+wordUpdate[i][0];
                    wordUpdate[i][1]=0;
                    classNameUpdate[i][1] = 'block0';
                }
                if(classNameUpdate[i][2]!=='block0'){
                    wordUpdate[i][2] *= 2;
                    classNameUpdate[i][2] = 'block'+wordUpdate[i][2];
                    wordUpdate[i][3]=0;
                    classNameUpdate[i][3] = 'block0';
                }
            }
            //한 줄에 병합 한 번 하는 경우
            else{
                for(var j=1;j<4;j++){
                    var left;
                    if(classNameUpdate[i][j]==='block0') continue;//빈칸이면 패스하기
                    for(left=j-1;left>=0;left--){
                        if(classNameUpdate[i][left]!=='block0' || left === 0) break;
                    }
                    if(classNameUpdate[i][j]===classNameUpdate[i][left]){
                        wordUpdate[i][left] *= 2;
                        classNameUpdate[i][left] = 'block'+wordUpdate[i][left];
                        wordUpdate[i][j]=0;
                        classNameUpdate[i][j] = 'block0';
                        break;
                    }
                }
            }
        }
        //이동
        for(var i=0;i<4;i++){
            for(var j=1;j<4;j++){
                var left;
                if(classNameUpdate[i][j]==='block0') continue;//빈칸이면 넘어가기
                if(classNameUpdate[i][0]==='block0'){
                    classNameUpdate[i][0] = classNameUpdate[i][j];
                    wordUpdate[i][0] = wordUpdate[i][j];
                    classNameUpdate[i][j] = 'block0';
                    wordUpdate[i][j] = 0;
                }
                for(left=j-1;left>=0;left--){
                    if(classNameUpdate[i][left]!=='block0' || left === 0) break;
                }
                if(left !== j-1) {
                    classNameUpdate[i][left+1] = classNameUpdate[i][j];
                    wordUpdate[i][left+1] = wordUpdate[i][j];
                    classNameUpdate[i][j] = 'block0';
                    wordUpdate[i][j] = 0;
                }
            }
        }
        this.setState({classNa: classNameUpdate});
        this.setState({word: wordUpdate});
        this.NewBlock();
    }



	render() {
        window.addEventListener("keydown", e => {set});
		return (
            <div className="background">
			    <table id='board'>
                    <tr>
                        <td className={this.state.classNa[0][0]}>{this.state.word[0][0]}</td>
                        <td className={this.state.classNa[0][1]}>{this.state.word[0][1]}</td>
                        <td className={this.state.classNa[0][2]}>{this.state.word[0][2]}</td>
                        <td className={this.state.classNa[0][3]}>{this.state.word[0][3]}</td>
                    </tr>
                    <tr>
                        <td className={this.state.classNa[1][0]}>{this.state.word[1][0]}</td>
                        <td className={this.state.classNa[1][1]}>{this.state.word[1][1]}</td>
                        <td className={this.state.classNa[1][2]}>{this.state.word[1][2]}</td>
                        <td className={this.state.classNa[1][3]}>{this.state.word[1][3]}</td>
                    </tr>
                    <tr>
                        <td className={this.state.classNa[2][0]}>{this.state.word[2][0]}</td>
                        <td className={this.state.classNa[2][1]}>{this.state.word[2][1]}</td>
                        <td className={this.state.classNa[2][2]}>{this.state.word[2][2]}</td>
                        <td className={this.state.classNa[2][3]}>{this.state.word[2][3]}</td>
                    </tr>
                    <tr>
                        <td className={this.state.classNa[3][0]}>{this.state.word[3][0]}</td>
                        <td className={this.state.classNa[3][1]}>{this.state.word[3][1]}</td>
                        <td className={this.state.classNa[3][2]}>{this.state.word[3][2]}</td>
                        <td className={this.state.classNa[3][3]}>{this.state.word[3][3]}</td>
                    </tr>
            </table>
            </div>
		);
	}
}


export default Board;
