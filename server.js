const Canvas = require('canvas');
const planet = require('./planet');

const makePlanet = ({seed, size = 256, mode = 'icon'}) => {
  const width = size;
  const height = mode === 'icon' ? width : (width / 4);
  const canvas = new Canvas(width, height);

  planet.draw(canvas, {
    seed,
    mode,
  });

  return canvas;
};

module.exports = {
  makePlanet,
};

if (!module.parent) {
  const args = process.argv.slice(2);

  const opts = {};
  const seed = args[0];
  if (seed) {
    opts.seed = seed;
  }
  const size = parseInt(args[1], 10);
  if (size) {
    opts.size = size;
  }
  const mode = (() => {
    if (args[2] === 'icon' || args[2] === 'skybox') {
      return args[2];
    } else {
      return 'icon';
    }
  })();
  if (mode) {
    opts.mode = mode;
  }

  const canvas = makePlanet(opts);
  canvas.pngStream().pipe(process.stdout);
}
