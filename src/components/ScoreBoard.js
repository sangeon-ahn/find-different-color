import styled from "styled-components";

const ScoreBoardBlock = styled.div`
  position: relative;
  display: flex;
  width: 360px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: wheat;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  
  div {
    flex: 1;
  }

  & > div:nth-child(2) {
    font-size: 30px;
  }
`;

const ScoreBoard = ({ stage, timeCount, score }) => {

  return (
    <ScoreBoardBlock>
      <div>스테이지 {stage}</div>
      <div>{timeCount}</div>
      <div>점수 {score}</div>
    </ScoreBoardBlock>
  );
};

export default ScoreBoard;