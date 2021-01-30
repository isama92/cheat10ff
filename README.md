# Cheat10FF
#### A cheat for [10 fast fingers](https://10fastfingers.com/) game

## Use
Add the javascript of the `Cheat10ff.js` file in the Console.

Then write
```
// initialize with default parameters
const cheat = new Cheat10ff();

// initialize with custom parameters
const cheat = new Cheat10ff(0.05, 300);

// run the cheat
cheat.run();
```

## Options
Cheat19ff class' constructor accept 2 parameters:
- the first is the percentage of getting the wrong word, defaults to `0.04`.
- the second is the time between words in milliseconds, defaults to `700`.


## Notes
Works only on browsers that support classes (modern browsers like Google Chrome or Firefox).

### TODOS
- Implement a way to have a dynamic interval between words, based on the word complexity.
