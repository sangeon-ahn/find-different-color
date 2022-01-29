import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';

const EASY_MODE = 0.05;
const NORMAL_MODE = 0.1;
const HARD_MODE = 0.2;

const GameBoardBlock = styled.div`
  position: relative;
  display: flex;
  width: 360px;
  height: 360px;
  flex-wrap: wrap;
`;

const TileBlock = styled.div`
  position: relative;
  width: ${props => (360 / Math.sqrt(parseInt(props.numberOfTiles))) - 4}px;
  height: ${props => (360 / Math.sqrt(parseInt(props.numberOfTiles))) - 4}px;
  margin: 2px;
  background-color: ${props => props.id === props.randomId ?
    `rgb(${props.similarRgbList})` :
    `rgb(${props.randomRgbList})`
  };
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;

  button {
    padding: 5px;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    background-color: wheat;
    font-weight: 600;
    cursor: pointer;
  }

`;

const GameBoard = React.memo(({
  stage,
  randomRgbList,
  randomId,
  tiles,
  handleGameBoardClick,
  numberOfTiles
}) => {
  const [red, green, blue] = randomRgbList;
  const [difficulty, setDifficulty] = useState(EASY_MODE);

  const createAnswerTileRgbList = () => {
    const colorCoefficient = (2 / Math.PI) * Math.atan(stage * difficulty);

    return [colorCoefficient * red, colorCoefficient * green, colorCoefficient * blue];
  };

  return (
    <GameBoardBlock
      onClick={handleGameBoardClick}
    >
      {tiles.map(tile => {
        return (
          <TileBlock
            key={tile.id}
            id={tile.id}
            numberOfTiles={numberOfTiles}
            randomId={randomId}
            randomRgbList={randomRgbList}
            similarRgbList={createAnswerTileRgbList()}
          />
        );
      })}
      <ButtonsContainer>
        <button onClick={() => setDifficulty(HARD_MODE)}>어려움</button>
        <button onClick={() => setDifficulty(NORMAL_MODE)}>중간</button>
        <button onClick={() => setDifficulty(EASY_MODE)}>쉬움</button>
      </ButtonsContainer>
    </GameBoardBlock>
  );
});

export default GameBoard;

// 랜덤성 부여
  // 1. 랜덤 색
  // 2. 랜덤한 위치에 다른 색 타일

// 스테이지 구현
  // 맞는 타일 고르면 true 출력
  // 맞는 타일 고르면 같은 크기 리렌더링
  // 맞는 타일 고르면 상위 스테이지 리렌더링
  // 상위 스테이지로 갈 수록 색 차이가 줄어드는 것 구현
