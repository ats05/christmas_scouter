import React, {Component} from 'react';
import styled from 'styled-components';

export default class Score extends Component {
    render() {
        // 0.1まで表示
        const score = this.props.score
        return (
            <ScoreArea>
                <div>Christmas Level</div>
                {score} %
            </ScoreArea>
        )
    }
}

const ScoreArea = styled.div`
font-family: 'Exo 2', sans-serif;
position: absolute;
top: 0;
left: 0;
padding-top: 100px;
width: 100vw;
height: 20px;
font-size: 5rem;
text-align: center;
color: #ffffff;
`
