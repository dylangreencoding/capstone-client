// blank map template
export const blankMap : any = {
  id: "",
  maker: "",
  name: "blank",

  x: 0,
  y: 0,
  scale: 25,
  selected: { x: undefined, y: undefined },
  entities: {
    'qwertyuiopasdfghjklzxcvbnm': {
      id: "",
      maker: "qwertyuiopasdfghjklzxcvbnm",
      name: "guest",
    
      x: -100,
      y: -100,
    
      level: 10,
      actions: ['move', 'shoot'],
      color: 'grey',
    },
  },
  tool: "none",

  width: 30,
  height: 20,

  lines: [],

  // FOR GAMES ONLY // FOR OFFLINE DEVELOPMENT
  messages: [],
  players: { o: "host", "qwertyuiopasdfghjklzxcvbnm": "guest" },
};
// blank char template
export const blankChar : any = {
  id: "",
  maker: "",
  name: "blank",

  x: -100,
  y: -100,

  level: 10,
  actions: ['move', 'shoot'],
  color: 'grey',
};

export const mapToolDescriptions : any = {
  "none": "Select a location on the map by clicking",
  "add location": "Place a piece on the map by clicking",
  "add line": "Draw a wall on the map by clicking",
  "undo line": "Removes last line",
  "move": "Move the selected piece by clicking",
  "shoot": "Use the selected piece to shoot another, removing it from the map",
}