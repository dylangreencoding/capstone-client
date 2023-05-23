// blank map template
export const blankMap : any = {
  id: "",
  maker: "",
  name: "please choose a map",

  x: 0,
  y: 0,
  scale: 25,
  selected: { x: undefined, y: undefined },
  entities: {},
  tool: "none",

  width: 20,
  height: 20,

  lines: [],

  // FOR GAMES ONLY // FOR OFFLINE DEVELOPMENT
  messages: [],
  players: { o: "host" },
};
// blank char template
export const blankChar : any = {
  id: "",
  maker: "",
  name: "please choose a character",

  x: -100,
  y: -100,

  level: 10,
  actions: ['move', 'shoot'],
  color: 'blue',
};

export const mapToolDescriptions : any = {
  "none": "Select a location on the map by clicking",
  "add location": "Place a piece on the map by clicking",
  "add line": "Draw a wall on the map by clicking",
  "undo line": "Removes last line",
  "move": "Move the selected piece by clicking",
  "shoot": "Use the selected piece to shoot another, removing it from the map",
}