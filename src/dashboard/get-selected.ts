export const locationToString = (location: any) => {
  const x = location.x.toString();
  const y = location.y.toString();
  const xy = x.concat(" ", y);
  return xy;
};


export const getSelected = (map_: any) => {
  let selected;
  if (
    map_.selected.x !== undefined &&
    map_.selected.y !== undefined
  ) {
    selected =
      map_.entities[
        locationToString({
          x: map_.selected.x - map_.x,
          y: map_.selected.y - map_.y,
        })
      ];

    
    if (selected != undefined) {
      return selected;
    } else {
      return {
        name: "empty",
        x: map_.selected.x - map_.x,
        y: map_.selected.y - map_.y,
        level: 0,
        actions: [],
      };
    }
  } else {
    return {
      name: "none",
      x: 'x',
      y: 'y',
      level: 0,
      actions: [],
    };
  }
};