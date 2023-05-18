// Given three collinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
export function onSegment ( p: any, q: any, r: any ) {
  if ( q.x <= Math.max ( p.x, r.x ) && q.x >= Math.min ( p.x, r.x ) && q.y <= Math.max ( p.y, r.y ) && q.y >= Math.min ( p.y, r.y ) ) {
    return true;
  } else {
    return false;
  }   
}
  
// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
export function orientation_ ( p: any, q: any, r: any ) {
  const val = ( q.y - p.y ) * ( r.x - q.x ) - ( q.x - p.x ) * ( r.y - q.y );
    
  if ( val === 0 ) {
    return 0; // collinear
  } else { 
    return ( val > 0 )? 1: 2; // clock or counterclock wise
  }
}
  
// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
export function doIntersect ( p1: any, q1: any, p2: any, q2: any ) {

  // Find the four orientations needed for general and
  // special cases
  const o1 = orientation_ ( p1, q1, p2 );
  const o2 = orientation_ ( p1, q1, q2 );
  const o3 = orientation_ ( p2, q2, p1 );
  const o4 = orientation_ ( p2, q2, q1 );
    
  // General case
  if ( o1 != o2 && o3 != o4 ) {
    return true;
  }
    
  // Special Cases
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1
  if (  o1 === 0 && onSegment ( p1, p2, q1 ) ) {
    return true;
  }
  
  // p1, q1 and q2 are collinear and q2 lies on segment p1q1
  if ( o2 === 0 && onSegment ( p1, q2, q1 ) ) {
    return true;
  }

  // p2, q2 and p1 are collinear and p1 lies on segment p2q2
  if ( o3 === 0 && onSegment ( p2, p1, q2 ) ) {
    return true;
  }

  // p2, q2 and q1 are collinear and q1 lies on segment p2q2
  if ( o4 === 0 && onSegment ( p2, q1, q2 ) ) {
    return true;
  }

  return false; // Doesn't fall in any of the above cases
}