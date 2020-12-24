const User = require('../../models/User');
const {
  removeSearch,
  successSet,
  errorSet,
} = require('../../utils/messages');

const removeSearchPath = (chatId, bot, message, user = new User()) => {
  if (message.toLowerCase() === '/removerbusca') {
    bot.sendMessage(chatId, removeSearch);
    user.setPath('removeSearchPath');
    return user;
  } else {
    if (user.removeWordToSearch(message)) {
      user.setPath('');
      bot.sendMessage(chatId, successSet);
      return user;
    } else {
      bot.sendMessage(chatId, errorSet);
      return user;
    }
  }
}

module.exports = removeSearchPath;