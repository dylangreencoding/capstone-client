// blank map template
export const blankMap = {
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
export const blankChar = {
  id: "",
  maker: "",
  name: "please choose a character",

  x: -100,
  y: -100,

  level: 5,
};