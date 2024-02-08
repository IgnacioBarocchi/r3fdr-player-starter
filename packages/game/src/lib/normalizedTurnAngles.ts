const NORMALIZED_ANGLES = {
  NORMALIZED_ROTATION_SPEED: Math.PI / 4 / 7,
  // 3.927
  TOP_LEFT: parseFloat(((225 * Math.PI) / 180).toFixed(3)),
  // 5.498
  BOTTOM_LEFT: parseFloat(((315 * Math.PI) / 180).toFixed(3)),
  // 2.356
  TOP_RIGHT: parseFloat(((135 * Math.PI) / 180).toFixed(3)),
  // 0.785
  BOTTOM_RIGHT: parseFloat(((45 * Math.PI) / 180).toFixed(3)),
} as const;

export default NORMALIZED_ANGLES;
