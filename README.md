# Cybersecurity Flashcards

Submitted by: **Olabode Jimoh**

Time spent: **5 hours**

Repository: [https://github.com/Jimbol2023/web102-unit2-flashcards](https://github.com/Jimbol2023/web102-unit2-flashcards)

## Description

A beginner-friendly cybersecurity flashcard app built with React and Vite. Users can study common cybersecurity terms, type guesses before revealing answers, track their streak, move through cards in order, and shuffle the study set when they want a fresh order.

## Required Features

The following **required** functionality is completed:

- [x] The user can enter their guess in a box before seeing the flipside of the card
- [x] Clicking on a submit button shows visual feedback about whether the answer was correct or incorrect
- [x] A back button is displayed on the card and can be used to return to the previous card in a set sequence
- [x] A next button is displayed on the card and can be used to navigate to the next card in a set sequence
- [x] The next and back buttons should have a visual indication when the user is at the beginning or end of the list
- [x] The user answer, feedback, and flipped card state reset when the user moves to another card

## Stretch Features

The following **stretch** functionality is completed:

- [x] Cards have different visual styles based on their category
- [x] Cards have simple hover/flip styling
- [x] A shuffle button randomizes the order of the cards
- [x] Fuzzy matching accepts answers regardless of capitalization and punctuation
- [x] Fuzzy matching allows reasonable partial matches
- [x] A current streak counter is shown
- [x] A longest streak counter is shown
- [ ] A mastered-card feature is available

## Video Walkthrough

Loom Demo:
https://www.loom.com/share/d4c9284da673496696f9cdcffa39275d

## Notes

This project uses React state to track the current flashcard order, flipped state, guess input, answer feedback, and streak totals. Navigation moves through the current card order without wrapping, while the shuffle button randomizes the order only when clicked.

## License

Copyright 2026 Olabode Jimoh

Licensed under the Apache License, Version 2.0. You may not use this file except in compliance with the License.
