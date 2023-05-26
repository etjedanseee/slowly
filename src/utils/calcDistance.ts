import { IСoordinates } from '../types/Auth/auth'

export function coordsToDistance(coords1: IСoordinates, coords2: IСoordinates): number {
  let lat1 = coords1.latitude
  let lat2 = coords2.latitude
  let long1 = coords1.longitude
  let long2 = coords2.longitude
  //радиус Земли
  const R = 6372795;
  //перевод коордитат в радианы
  lat1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  long1 *= Math.PI / 180;
  long2 *= Math.PI / 180;
  //вычисление косинусов и синусов широт и разницы долгот
  const cl1 = Math.cos(lat1);
  const cl2 = Math.cos(lat2);
  const sl1 = Math.sin(lat1);
  const sl2 = Math.sin(lat2);
  const delta = long2 - long1;
  const cdelta = Math.cos(delta);
  const sdelta = Math.sin(delta);
  //вычисления длины большого круга
  const y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;
  const ad = Math.atan2(y, x);
  const dist = Math.round((ad * R) / 1000); //расстояние между двумя координатами в км
  return dist
}