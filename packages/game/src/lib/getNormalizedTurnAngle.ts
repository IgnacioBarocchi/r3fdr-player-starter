export default function getNormalizedTurnAngle(angle: number): number {
  let aTanAngle = Math.atan2(Math.sin(angle), Math.cos(angle));

  if (aTanAngle < 0) {
    aTanAngle += Math.PI * 2;
  }

  aTanAngle = parseFloat(aTanAngle.toFixed(3));

  if (aTanAngle === 0) {
    return parseFloat((Math.PI * 2).toFixed(3));
  }

  return aTanAngle;
}
