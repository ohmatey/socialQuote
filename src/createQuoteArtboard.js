import sketch from 'sketch/dom'

import fetchQuote from './fetchQuote'

const QUOTE_API_KEY = 'qLlVlqLAVts5_i6PTO76ZQeF'

const { Text, Rectangle, Artboard, Image } = sketch

export default ({
  category,
  rowNumber,
  columnNumber,
  document,
  page
}) => {
  return fetchQuote({
    category: category,
    apiKey: QUOTE_API_KEY
  })
  .then(({
    quote,
    author,
    id,
    permalink,
    requested_category,
    categories
  }) => {
    const quoteAlignments = [
      Text.Alignment.left,
      Text.Alignment.center,
      Text.Alignment.right
    ]

    const quoteTextLayer = new Text({
      alignment: quoteAlignments[columnNumber - 1],
      text: quote,
      frame: {
        x: 100,
        y: 100,
        width: 440
      },
      fixedWidth: true
    })

    quoteTextLayer.systemFontSize = 48
    quoteTextLayer.adjustToFit()

    const authorTextLayer = new Text({
      alignment: Text.Alignment.center,
      text: author,
      frame: {
        x: 100,
        y: 600,
        width: 440
      },
      fixedWidth: true
    })

    authorTextLayer.systemFontSize = 24
    authorTextLayer.adjustToFit()

    const artBoard = new Artboard({
      name: quote,
      frame: {
        x: 0 + columnNumber * 1000,
        y: 0 + rowNumber * 1000,
        height: 640,
        width: 640
      },
      parent: page,
      layers: [
        quoteTextLayer,
        authorTextLayer
      ]
    })

    document.centerOnLayer(artBoard)
  })
}
