const planet = require('./planet');

const makePlanetIcon = (size = 256, seed) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = canvas.width;

  planet.draw(canvas, {
    seed,
    mode: 'icon',
  });

  return canvas;
};

const makePlanetSkybox = (size = 1024, seed) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  planet.draw(canvas, {
    seed,
    mode: 'skybox',
  });

  return canvas;
};

module.exports = {
  makePlanetIcon,
  makePlanetSkybox,
};
