# Capstone Front End

Visit the live website here:

https://capstone-tabletop.herokuapp.com

## A note from the developer

Things I will do differently next time, in the next version of this project or any React project:

1. Design, then build. This was a massive learning experience. I designed it as I built it because I didn't know what would work well and what wouldn't. Most of what is listed below is a direct product of a combined design and build phase.

2. Use an atomic CSS paradigm (or possibly Tailwind).

3. Build small reusable components first, then incorporate them into the overall layout.

4. Give more consideration to how variables are named. I did alright but definitely made some questionable calls in a few places.

5. Use React.useContext to aid in state management, particularly to avoid props drilling.

6. Rethink the data objects (user, map, character, and game) during the design phase, with the goal of making them as concise as possible.

7. Optimize data fetching. Possibly use react-router's loader functions, but need to look into this more.

8. Rethink games connectivity. Make it possible to invite players to games by inputting their username. Trade out socket.IO for vanilla websockets and/or harperDB custom functions / AWS lambda functions.

9. More comments! I will add when I have time. In the meantime, I am happy to walk you through it.

## Brief Guide

index.html is the entry point and contains a script in the head that redirects to https on page load

src/main.css contains all the styles

src/main.tsx contains the react root component and the router object

src/pages/ contains the pages routed using react-router

src/pages/app/ contains the dashboard, and handles user authentication

src/custom-hooks/ contains the hook used to fetch the user's data (used in src/pages/app/)

src/expressAPI/ contains the calls made to the back end

src/dashboard/ is where the main UI can be found

src/dashboard/main-panel/ contains the larger area where the map-grid or character sheet can be viewed

src/dashboard/quarter-panel/ contains the sidebar where buttons and things live

src/dashboard/quarter-panel/panel/options/ contains the 'home' view on the sidebar

src/dashboard/quarter-panel/panel/current/ contains the tools associated with the current main-panel view

## Known Bug

It is an elusive bug. See capstone-server readme.
