const planet = require('./planet');

const makePlanet = ({seed, size = 256, mode = 'icon'}) => {
  const canvas = new Canvas(size, size);

  planet.draw(canvas, {
    seed,
    mode,
  });

  return canvas;
};

module.exports = {
  makePlanet,
};
