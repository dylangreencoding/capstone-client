
export const getSelected = (map_: any) => {
  const locationToString = (location: any) => {
    const x = location.x.toString();
    const y = location.y.toString();
    const xy = x.concat(" ", y);
    return xy;
  };

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
    if (selected != undefined && selected.type) {
      return selected.type;
    } else if (selected != undefined && selected.name) {
      return selected.name;
    } else {
      return "empty square";
    }
  } else {
    return "none selected";
  }
};