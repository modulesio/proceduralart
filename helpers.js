const scene = require('./scene');
const noise = require('./perlin');
const Alea = require('alea');

const api = {};

// http://stackoverflow.com/a/1099670/895589
api.getQueryParams = function(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// http://stackoverflow.com/a/17243070/895589

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
api.getRGB = function(h, s, v) {
    while (h > 1) h -= 1;
    while (h < 0) h += 1;

    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

// General random & noise functions
api.getRandomSeed = function() {
    return Math.round(Math.random() * 9007199254740991);
}

api.getSeed = function(text) {
  const rng = new Alea(text);
  return Math.round(rng() * 9007199254740991);
}

api.getInt = function(max, pivot) {
	return (scene.seed % pivot) % max;
}

api.getBool = function(pivot) {
	return api.getInt(2, pivot) == 1;
}

api.getFloat = function(pivot, from, to) {
	if (!from)
		from = 0;
	if (!to)
		to = 1;
	var x = ((scene.seed % pivot) % 100000) / 100000;
	return from + (to - from) * x;
}

api.getPivot = function(text) {
	var myrng = new Alea(text);
	return Math.round(myrng() * 100000000);
}

api.simplex = function(x, y, octaves, lowercap, uppercap) {
	if (!octaves) octaves = 6;
	if (!lowercap) lowercap = 0;
	if (!uppercap) uppercap = 1;
	
	var v = 0;
	for (var i = 1; i <= octaves; i++) {
		var s = noise.simplex2(x * Math.pow(2, i-1),y * Math.pow(2, i-1)) / 2 + 0.5;
		v += s * Math.pow(2, -i);
	}
	
	if (v < lowercap)
		return 0;
	if (v > uppercap)
		return 1;
	return (v - lowercap) / (uppercap - lowercap);
}

api.getColorString = function(color, alpha) {
	if (alpha === undefined) 
		alpha = 1;
	return 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + alpha + ')';
}

module.exports = api;
