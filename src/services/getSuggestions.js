const getScieloSearchResults = require('./getScieloSearchResults');

module.exports = async (words = [], numberOfSuggestions = 5) => {
  const suggestionsList = [];
  const suggestionsArr = [];

  for (const word of words) {
    const resultsArr = await getScieloSearchResults(word);
    suggestionsList.push(resultsArr);
  }

  for (let i = 0; i < suggestionsList[0].length; i++) {
    if (suggestionsArr.length >= numberOfSuggestions) {
      break;
    }
    for (let j = 0; j < suggestionsList.length; j++) {
      if (suggestionsArr.length >= numberOfSuggestions) {
        break;
      }
        suggestionsArr.push(suggestionsList[j][i]);
    }
  }

  return suggestionsArr.map(item => {
    return `${item.title} ${item.date}
    ${item.link}`;
  }).join('\n\n');
}