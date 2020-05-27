# Clicker Clone Project Notes

## Problem Description
The goal of this project was to create a browser-based clone of the idle game [Adventure Capitalist](http://en.gameslol.net/adventure-capitalist-1086.html). My implementation is local only - it doesn't save anything to a server, but it does persist your state between sessions, while you look at other tabs, and while you sleep.

Behind the scenes, the game is running on Phaser (a javascript library written for making games) and architectured with an MVC pattern. State is stored using the browser's `localStorage` store.

In general, this particular implementation, while not flashy, is well-structured, and set up to be built upon further. It is a very solid base for implementing a fully featured version of a clicker complete with flashy UI and back-end storage. I focused on creating a structure that would make it easy to create changes and implement new features moving forward. While kind of an odd paradox in a gamejam-like project to be completed over two days, I'm happy with the result. It is MVP feature-complete and ready for more.

## Technical Choices
### React vs Phaser
The first big technical choice to make was whether to go with a game engine like Phaser or a native web framework like React. On first glance, I was thinking React - the game itself is totally data driven, and there's not much animation at all. It's easy to visualize the UI as just reacting to state changes - exactly what React & Redux are great at!
Plus, working in DOM elements (vs the canvas for Phaser) would make our game responsive and very mobile-friendly which is really nice.

However, on second glance, once the game gets going at high speeds, the state is changing every frame (as in, every 1/60th of a second). I know that Phaser is excellent at running at this speed, but I haven't ever made a *game* in React, so that would be a big risk for this project. I did not want to implement the entire game and then have it slow to a crawl at the end simply because we were trying to make the framework do something it's not meant to do.

So I decided to go with Phaser. It's a slightly different paradigm in terms of how state gets stored. In my game, there's an update loop. I'm updating the state with events on user input and then checking the state on every update.

Again, this is driven because of the assumption that we will be updating the state (and score) every update after playing the game for a few minutes. Thus, it's easier to keep our logic as contained as possible to the update loop rather than having bi-directional spaghetti code. 

### MVC
The next architecture decision was to separate the code into some semblance of MVC concerns. I wanted the project to be structured in a way so that if multiple people were working on it, they'd be able to jump in easily. For me, the best way to do this is for each piece of code to do one thing.

Views in this solution are as strictly presentational as possible. They dispatch events when they're clicked. They play sound effects. They can query models for values, but they don't modify models and they don't perform complex calculations.

Controllers handle clicks and user input from the views and then tell the models to do things. They're also in charge of creating views.

Models store the data. This game is largely data-driven, so I wanted to make sure that there was a robust data system in place. I'm pretty happy with the result, but of course, there's always room for improvement.

## Room for Improvement
 - UI & Layout
 For starters, the look of this game is pretty barebones. It would benefit greatly from an animator coming on and taking a pass at it. (For a look at some of my more animation-heavy work, please check out (Chemex: The Game)[www.chemexthegame.com]). However, because the views are separated nicely, it's easy to get in there and make things prettier.
 - Component library
 I'd definitely add a better component library for the views. As is, they're not very DRY. In addition, there are some places where I've stored sprite file names in the view files themselves, and some places where I've put it in a config file. This should be standardized.
 - More robust testing and saving
 TDD was not followed for this game, and that is a definite area for improvement. Another benefit of separating out concerns though is that the models are prime for unit tests and the logic for manipulating the guts of the game is contained therein.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |


