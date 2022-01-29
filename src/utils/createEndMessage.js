const createEndMessage = (stage, score) => {
  console.log(stage, score);
  return (`GAME OVER! \n스테이지: ${stage}, 점수: ${score}`);
};

export default createEndMessage;