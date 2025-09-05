// decodePolyline (Google polyline algorithm) - basic decoder
export function decodePolyline(encoded) {
  if(!encoded) return [];
  let points = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;
  while(index < len) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;
    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }
  return points;
}

// simple smoothing / point-thinning
export function smoothRoutePoints(points, step=3){
  if(!points || points.length===0) return [];
  const out = [];
  for(let i=0;i<points.length;i+=step) out.push(points[i]);
  // ensure last point exists
  if(JSON.stringify(out[out.length-1]) !== JSON.stringify(points[points.length-1])) out.push(points[points.length-1]);
  return out;
}
