# CyberQuiz — Security Briefing

A small multiple-choice quiz built with vanilla HTML, CSS, and JavaScript, themed as a "security briefing" case file. Built as a first hands-on project to practice core JavaScript fundamentals.

## Live demo
Open `index.html` in any browser — no build step or dependencies required.

## Concepts practiced
- **Arrays** — the quiz questions are stored as an array of objects (`questions`)
- **Strings** — question text, option text, and feedback messages
- **Numbers** — tracking the current question index and score
- **Booleans** — an `hasAnswered` flag prevents double-answering a question
- **If/else statements** — checking whether the selected answer is correct, and choosing a final verdict message
- **Functions** — each piece of behaviour (`startQuiz`, `loadQuestion`, `checkAnswer`, `nextQuestion`, `endQuiz`) is broken into its own function

## Project structure
```
cyberquiz/
├── index.html   # Page structure and content
├── style.css    # Visual styling (case-file / redacted document theme)
├── script.js    # Quiz logic
└── README.md
```

## Possible next steps
- Add more questions to the `questions` array
- Add a timer per question
- Persist high scores using `localStorage`
- Randomize question order and option order
