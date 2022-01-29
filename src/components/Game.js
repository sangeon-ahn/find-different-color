import { useCallback, useRef, useState, React } from "react";
import GameBoard from "./GameBoard";
import ScoreBoard from './ScoreBoard';
import createRandomColor from "../utils/createRandomColor";
import createRandomId from "../utils/createRandomId";
import createEndMessage from "../utils/createEndMessage";
import useInterval from "../hooks/useInterval";
import styled from 'styled-components';

const INITAL_NUMBER_OF_TILES = 4;
const INITIAL_TIME_COUNT = 15;
const PENALTY_TIME = 3

const initialState = {
  tiles: [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ],
  stage: 1,
  randomId: createRandomId(INITAL_NUMBER_OF_TILES),
  randomRgbList: createRandomColor(),
  timeCount: INITIAL_TIME_COUNT,
  score: 0
};

const GameBlock = styled.div`
  display: flex;
  width: 600px;
  height: 600px;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
`;

const Game = () => {
  const [state, setState] = useState(initialState);

  const { tiles, stage, randomId, randomRgbList, timeCount, score } = state;

  const numberOfTiles = useRef(INITAL_NUMBER_OF_TILES);

  useInterval(() => {
    if (timeCount <= 0) {
      window.alert(createEndMessage(stage, score));
      setState({
        ...initialState,
        randomId: createRandomId(INITAL_NUMBER_OF_TILES),
        randomRgbList: createRandomColor(),
      });
      numberOfTiles.current = INITAL_NUMBER_OF_TILES;
      return null;
    }

    setState(state => ({
      ...state,
      timeCount: state.timeCount - 1
    }));

  }, 1000);

  const handleGameBoardClick = useCallback((e) => {
    if (parseInt(e.target.id) !== randomId) {
      setState(state => ({
        ...state,
        timeCount: state.timeCount - PENALTY_TIME < 0 ? 0 : state.timeCount - PENALTY_TIME
      }));

      return null;
    }

    numberOfTiles.current = Math.pow(Math.round((stage + 1 + 0.5) / 2) + 1, 2);

    setState(state => {
      const newTiles = [];

      for (let i = 0; i < numberOfTiles.current; i++) {
        newTiles.push({ id: i + 1 });
      }

      return {
        ...state,
        randomId: createRandomId(numberOfTiles.current),
        randomRgbList: createRandomColor(),
        stage: state.stage + 1,
        tiles: newTiles,
        timeCount: INITIAL_TIME_COUNT,
        score: state.score + Math.pow(state.stage, 3) * state.timeCount
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomId]);

  return (
    <GameBlock>
      <ScoreBoard
        stage={stage}
        timeCount={timeCount}
        score={score}
      />
      <GameBoard
        stage={stage}
        randomRgbList={randomRgbList}
        randomId={randomId}
        tiles={tiles}
        handleGameBoardClick={handleGameBoardClick}
        numberOfTiles={numberOfTiles.current}
      />
    </GameBlock>
  );
};

export default Game;

