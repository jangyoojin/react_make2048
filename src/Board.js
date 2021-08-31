import React, { Component } from 'react';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classNa: Array(4).fill('block0').map((e) => { return Array(4).fill('block0') }),
            word: Array(4).fill(0).map((e) => { return Array(4).fill(0) }),
        };
        this.NewBlock = this.NewBlock.bind(this);
        this.moveBlocks = this.moveBlocks.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.turnArrayImplement = this.turnArrayImplement.bind(this);
        this.NewBlock();
        this.NewBlock();
    }

    //make new blocks
    //블럭이 들어있지 않은 자리에 숫자2 블럭을 추가함
    NewBlock() {
        let i, j;
        do {
            i = getRandom(0, 4);
            j = getRandom(0, 4);
        } while (this.state.classNa[i][j] !== 'block0')
        const classNameUpdate = [...this.state.classNa];
        const wordUpdate = [...this.state.word];
        classNameUpdate[i][j] = 'block2';
        wordUpdate[i][j] = 2;
        this.setState({ classNa: classNameUpdate });
        this.setState({ word: wordUpdate });
    }

    componentDidMount() {
        window.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {
        window.addEventListener("keydown", this.onKeyDown);
    }

    onKeyDown(e) {
        this.moveBlocks(e)
    }

    turnArray(newClassNa, newWord, count) {
        let check = 0;
        while (check < count) {
            [newClassNa, newWord] = this.turnArrayImplement(newClassNa, newWord);
            check++;
        }
        return [newClassNa, newWord];
    }

    turnArrayImplement(newClassNa, newWord) {
        const turnClassNa = Array(4).fill(null).map((e) => { return Array(4).fill(null) });
        const turnWord = Array(4).fill(null).map((e) => { return Array(4).fill(null) });
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                turnClassNa[i][j] = newClassNa[3 - j][i];
                turnWord[i][j] = newWord[3 - j][i];
            }
        }
        return [turnClassNa, turnWord];
    }

    //block moving function
    moveBlocks(e) {
        let newClassNa, newWord, point;
        switch (e.keyCode) {
            case 37://left
                [newClassNa, newWord, point] = this.moveLeft([...this.state.classNa], [...this.state.word]);
                break;
            case 38: //up
                //this.moveUp2();
                [newClassNa, newWord] = this.turnArray([...this.state.classNa], [...this.state.word], 3);
                [newClassNa, newWord, point] = this.moveLeft(newClassNa, newWord);
                [newClassNa, newWord] = this.turnArray(newClassNa, newWord, 1);
                break;
            case 39: //right
                // this.moveRight();
                [newClassNa, newWord] = this.turnArray([...this.state.classNa], [...this.state.word], 2);
                [newClassNa, newWord, point] = this.moveLeft(newClassNa, newWord);
                [newClassNa, newWord] = this.turnArray(newClassNa, newWord, 2);
                break;
            case 40: //down
                //this.moveDown();
                [newClassNa, newWord] = this.turnArray([...this.state.classNa], [...this.state.word], 1);
                [newClassNa, newWord, point] = this.moveLeft(newClassNa, newWord);
                [newClassNa, newWord] = this.turnArray(newClassNa, newWord, 3);
                break;
            default:
                return;
        }
        this.setState({ classNa: newClassNa });
        this.setState({ word: newWord });
        this.props.calcScore(point);
        let isFull = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (newClassNa[i][j] === 'block0') {
                    isFull = false;
                    break;
                }
            }
        }
        if (!isFull) {
            this.NewBlock();
        } else {
            //best 점수 업데이트
            this.props.updateBest();
            //보드 판이 가득 차면 alert 띄우기
            alert("게임 종료: 보드가 가득 찼습니다!!");
        }

    }

    //move blocks function
    //충돌 시 병합 여부 체크하기
    // setState하기
    moveLeft(newClassNa, newWord) {
        //추가 점수 저장할 변수
        let point = 0;
        //병합
        for (var i = 0; i < 4; i++) {
            //한 줄에 병합을 두 번 하는 경우
            if (newClassNa[i][0] === newClassNa[i][1] && newClassNa[i][2] === newClassNa[i][3]) {
                for (let c = 0; c < 2; c++) {
                    const idx = c * 2;
                    if (newClassNa[i][idx] !== 'block0') {
                        // 병합
                        newWord[i][idx] *= 2;
                        newClassNa[i][idx] = 'block' + newWord[i][idx];
                        // 초기화
                        newWord[i][idx + 1] = 0;
                        newClassNa[i][idx + 1] = 'block0';
                        //점수 추가
                        point += newWord[i][idx];
                    }
                }
            }
            //한 줄에 병합 한 번 하는 경우 + 병합하는 것이 없는 경우
            else {
                for (var j = 1; j < 4; j++) {
                    var left;
                    //빈칸이면 패스하기
                    if (newClassNa[i][j] === 'block0') continue;
                    // 중간에 빈 블럭이 있는지 확인
                    for (left = j - 1; left >= 0; left--) {
                        if (newClassNa[i][left] !== 'block0' || left === 0) break;
                    }
                    // left = j보다 작은 채워진 가장 가까운 blocK의 col index
                    if (newClassNa[i][j] === newClassNa[i][left]) {
                        newWord[i][left] *= 2;
                        newClassNa[i][left] = 'block' + newWord[i][left];
                        newWord[i][j] = 0;
                        newClassNa[i][j] = 'block0';
                        point += newWord[i][left];
                        break;
                    }
                }
            }
        }
        //이동
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                let left;
                // 빈칸이면 이동x
                if (newClassNa[i][j] === 'block0') continue;
                // 왼쪽 끝이 비었으면 현재값 넣어주기
                if (newClassNa[i][0] === 'block0') {
                    newClassNa[i][0] = newClassNa[i][j];
                    newWord[i][0] = newWord[i][j];
                    newClassNa[i][j] = 'block0';
                    newWord[i][j] = 0;
                    continue;
                }
                for (left = j - 1; left >= 0; left--) {
                    if (newClassNa[i][left] !== 'block0' || left === 0) break;
                }
                // left = 왼쪽 중에 비어 있지 않은 가장 큰 index
                if (left !== j - 1) {
                    newClassNa[i][left + 1] = newClassNa[i][j];
                    newWord[i][left + 1] = newWord[i][j];
                    newClassNa[i][j] = 'block0';
                    newWord[i][j] = 0;
                }
            }
        }
        return [newClassNa, newWord, point];
    }


    merge(arr, arr2, X, Y, x, y) {
        arr[X][Y] *= 2;
        arr2[X][Y] = 'block' + arr[X][Y];
        arr[x][y] = 0;
        arr2[x][y] = 'block0';
    }

    render() {
        return (
            <div className="background">
                <table id='board'>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        );
    }
}


export default Board;
