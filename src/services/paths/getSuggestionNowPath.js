const User = require('../../models/User');
const { searchResult, emptySearchWords, errorSearch } = require('../../utils/messages');
const getSuggestions = require('../getSuggestions');

const getSuggestionNowPath = async (chatId, bot, message, user = new User()) => {
  if (message.toLowerCase() === '/querosugestaoagora') {
    const words = user.getWordsToSearch();

    if (words.length === 0) {
      bot.sendMessage(chatId, emptySearchWords);
      return user;
    }

    bot.sendMessage(chatId, searchResult);

    try {
      const suggestionsStr = await getSuggestions(
        words, 
        user.getNumberOfSuggestions(),
      );

      bot.sendMessage(chatId, suggestionsStr);
      return user;

    } catch (error) {
      bot.sendMessage(chatId, errorSearch);
      return user;
    }
  }
}

module.exports = getSuggestionNowPath;