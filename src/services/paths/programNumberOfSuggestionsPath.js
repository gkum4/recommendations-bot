const User = require('../../models/User');
const { 
  programNumberOfSuggestions,
  successSet, 
  errorSet,
} = require('../../utils/messages');

const programNumberOfSuggestionsPath = (chatId, bot, message, user = new User()) => {
  if (message.toLowerCase() === '/programarnumerodesugestoes') {
    bot.sendMessage(chatId, programNumberOfSuggestions);
    user.setPath('programNumberOfSuggestionsPath');
    return;
  } else {
    if (isNaN(message) || message === ' ' || Number(message) > 10) {
      bot.sendMessage(chatId, errorSet);
      return user;
    } 

    user.setNumberOfSuggestions(Number(message));
    user.setPath('');
    bot.sendMessage(chatId, successSet);
    return user;
  }
}

module.exports = programNumberOfSuggestionsPath;