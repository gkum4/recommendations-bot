const User = require('../models/User');
const getSuggestions = require('./getSuggestions');
const { 
  emptySearchWords, 
  searchResult, 
  errorSearch 
} = require('../utils/messages');

module.exports = async (chatId, bot, user = new User()) => {
  const words = user.getWordsToSearch();

  if (words.length === 0) {
    bot.sendMessage(chatId, emptySearchWords);
    return;
  }

  bot.sendMessage(chatId, searchResult);

  try {
    const suggestionsStr = await getSuggestions(
      words, 
      user.getNumberOfSuggestions(),
    );

    bot.sendMessage(chatId, suggestionsStr);
    return;

  } catch (error) {
    bot.sendMessage(chatId, errorSearch);
    return;
  }
}