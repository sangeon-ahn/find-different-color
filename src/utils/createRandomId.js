const createRandomId = (numberOfTiles) => {
  const randomId = Math.ceil(Math.random() * numberOfTiles)

  return randomId;
};

export default createRandomId;