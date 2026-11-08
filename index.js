const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    //correctLetters - an array containing correctly guessed letters
    //incorrectLetters - an array containing incorrectly guessed letters
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    //Correctly guessed letters should replace their corresponding underscores as the game progresses
    //checks if answer word has the guessed letter in it
    if(this.word.includes(letter)){
      //makes array of displayed word so we can mutate it
      var lettersArr = this.displayWord.split('')
      //checks each letter if it needs to be updated cause of guess
      for(var i=0; i<lettersArr.length; i++){
        if(this.word[i]==letter){
          lettersArr[i] = letter
        }
      }
      //updates display word and arrays
      this.displayWord = lettersArr.join('')
      if(!this.correctLetters.includes(letter)){
            this.correctLetters.push(letter)
        }
    }
    else{
        if(!this.incorrectLetters.includes(letter)){
            this.incorrectLetters.push(letter)
            this.remainingGuesses--
        }
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    var wordToGuess = document.getElementById('word-to-guess')
    wordToGuess.textContent = this.displayWord
    var guessDisplay = document.getElementById('remaining-guesses')
    guessDisplay.textContent = this.remainingGuesses
    var incorrectDisplay = document.getElementById('incorrect-letters')
    incorrectDisplay.textContent = this.incorrectLetters
  }

  // implement the isGameOver function:
  isGameOver() {
    if(this.remainingGuesses<=0 || this.word==this.displayWord){
      return true
    }
    return false
  }

  // implement the getWinOrLoss function:
   getWinOrLoss() {
    if(this.word==this.displayWord && this.remainingGuesses>0){
      return "win"
    }
    else if(this.displayWord!=this.word && this.remainingGuesses<=0){
      return "loss"
    }
    else{
      return null
    }
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()