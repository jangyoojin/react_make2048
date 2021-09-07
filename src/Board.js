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
        this.merge = this.merge.bind(this);
        this.move = this.move.bind(this);
        this.checkMove = this.checkMove.bind(this);
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
        let twoOrfour = getRandom(0, 11);
        if (twoOrfour === 10) {
            classNameUpdate[i][j] = 'block4';
            wordUpdate[i][j] = 4;
        } else {
            classNameUpdate[i][j] = 'block2';
            wordUpdate[i][j] = 2;
        }
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
        let newClassNa, newWord, point, check;
        switch (e.keyCode) {
            case 37://left
                check = this.checkMove([...this.state.classNa]);
                if (check) [newClassNa, newWord, point] = this.moveLeft([...this.state.classNa], [...this.state.word]);
                console.log('left')
                break;
            case 38: //up
                [newClassNa, newWord] = this.turnArray([...this.state.classNa], [...this.state.word], 3);
                check = this.checkMove(newClassNa);
                if (check) [newClassNa, newWord, point] = this.moveLeft(newClassNa, newWord);
                [newClassNa, newWord] = this.turnArray(newClassNa, newWord, 1);
                console.log('up');
                break;
            case 39: //right
                // this.moveRight();
                [newClassNa, newWord] = this.turnArray([...this.state.classNa], [...this.state.word], 2);
                check = this.checkMove(newClassNa);
                if (check) [newClassNa, newWord, point] = this.moveLeft(newClassNa, newWord);
                [newClassNa, newWord] = this.turnArray(newClassNa, newWord, 2);
                break;
            case 40: //down
                //this.moveDown();
                [newClassNa, newWord] = this.turnArray([...this.state.classNa], [...this.state.word], 1);
                check = this.checkMove(newClassNa);
                if (check) [newClassNa, newWord, point] = this.moveLeft(newClassNa, newWord);
                [newClassNa, newWord] = this.turnArray(newClassNa, newWord, 3);
                break;
            default:
                return;
        }
        //보드판이 가득 찼는지 확인
        let isFull = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (newClassNa[i][j] === 'block0') {
                    isFull = false;
                    break;
                }
            }
        }
        //이동할 블럭이 있다면 setState
        if (check) {
            this.setState({ classNa: newClassNa });
            this.setState({ word: newWord });
            this.props.calcScore(point);
            if (!isFull) this.NewBlock();
        }
        //2048 만들어졌는지 체크하기
        let finish = false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (newClassNa[i][j] === 'block2048') {
                    isFull = true;
                    break;
                }
            }
        }
        if (finish) {
            this.props.updateBest();
            alert("게임 종료: 2048을 완성했습니다!!");
        }
        //보드판이 가득 찼는데 더이상 이동할 수 없다면 게임 종료
        if (!check && isFull) {
            //best 점수 업데이트
            this.props.updateBest();
            //보드 판이 가득 차면 alert 띄우기
            alert("게임 종료: 보드가 가득 찼습니다!!");
        }
    }

    checkMove(newClassNa) {
        let check = false;
        //병합
        for (var i = 0; i < 4; i++) {
            //한 줄에 병합을 두 번 하는 경우
            if (newClassNa[i][0] === newClassNa[i][1] && newClassNa[i][2] === newClassNa[i][3]) {
                for (let c = 0; c < 2; c++) {
                    const idx = c * 2;
                    if (newClassNa[i][idx] !== 'block0') {
                        // 병합
                        check = true;
                        return check;
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
                        //병합
                        check = true;
                        return check;
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
                    check = true;
                    return check;
                }
                for (left = j - 1; left >= 0; left--) {
                    if (newClassNa[i][left] !== 'block0' || left === 0) break;
                }
                // left = 왼쪽 중에 비어 있지 않은 가장 큰 index
                if (left !== j - 1) {
                    check = true;
                    return check;
                }
            }
        }
        return check;
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
                        point += this.merge(newWord, newClassNa, i, idx, i, idx + 1);
                    }
                }
                console.log(newClassNa);
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
                        //병합
                        point += this.merge(newWord, newClassNa, i, left, i, j);
                        break;
                    }
                }
            }
            console.log('move');
        }
        //이동
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                let left;
                // 빈칸이면 이동x
                if (newClassNa[i][j] === 'block0') continue;
                // 왼쪽 끝이 비었으면 현재값 넣어주기
                if (newClassNa[i][0] === 'block0') {
                    this.move(newClassNa, newWord, i, 0, j);
                    continue;
                }
                for (left = j - 1; left >= 0; left--) {
                    if (newClassNa[i][left] !== 'block0' || left === 0) break;
                }
                // left = 왼쪽 중에 비어 있지 않은 가장 큰 index
                if (left !== j - 1) {
                    this.move(newClassNa, newWord, i, left + 1, j);
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
        return arr[X][Y];
    }

    move(newClassNa, newWord, X, Y, y) {
        newClassNa[X][Y] = newClassNa[X][y];
        newWord[X][Y] = newWord[X][y];
        newClassNa[X][y] = 'block0';
        newWord[X][y] = 0;
    }

    render() {
        return (
            <div className="background">
                <table id='board'>
                    <tbody>
                        {Array(4).fill(null).map((e, row) =>
                            <tr key={row}>
                                {Array(4).fill(null).map((e, col) =>
                                    <td className={this.state.classNa[row][col]} key={col}>
                                        {this.state.word[row][col]}
                                    </td>)}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default Board;
