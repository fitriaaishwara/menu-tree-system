import { route } from 'ziggy-js';
import { Ziggy } from './ziggy.generated.js'; // pastikan .js di akhir

export default function(name, params = {}, absolute = true) {
  return route(name, params, absolute, Ziggy);
}
