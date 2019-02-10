import sketch from 'sketch/dom'
import UI from 'sketch/ui'

import createQuoteArtboard from './createQuoteArtboard'

const quoteCategories = [
  'inspire',
  'management',
  'sports',
  'life',
  'funny',
  'love',
  'art',
  'students'
]

const amounts = [1, 3, 6, 9, 12, 15, 30]

export default context => {
  context.document.showMessage("It's alive1 🙌")
  const document = sketch.fromNative(context.document)
  const page = document.selectedPage

  const amountPrompt = UI.getSelectionFromUser(
    "How many quote artboards?",
    amounts
  )

  const categoryPrompt = UI.getSelectionFromUser(
    "Which category?",
    quoteCategories
  )

  const amount = amounts[amountPrompt[1]]
  const category = quoteCategories[categoryPrompt[1]]

  let rowTally = 0
  let rowColumnTally = 0
  let createQuoteArtboardPromises = []

  for (let i = 0; i < amount; i++) {
    if (i % 3 === 0) {
      rowTally++
      rowColumnTally = 0
    }

    rowColumnTally++

    createQuoteArtboardPromises.push(
      createQuoteArtboard({
        category,
        rowNumber: rowTally,
        columnNumber: rowColumnTally,
        document,
        page
      })
    )
  }

  Promise.all(createQuoteArtboardPromises)
    .then(_ => console.log('done'))
    .catch(console.log)
}
