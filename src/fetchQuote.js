import fetch from 'sketch-module-fetch-polyfill'

export default ({
  category,
  apiKey
}) => {
  return fetch(`https://quotes.rest/quote/search?minlength=5&category=${category}`, {
    headers: {
      // name of the header, in single quotes
      'X-TheySaidSo-Api-Secret': apiKey
    }
  })
  .then(res => res.json())
  .then(data => data.contents)
  .catch(err => err)
}
