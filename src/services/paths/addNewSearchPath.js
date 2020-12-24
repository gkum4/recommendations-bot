const User = require('../../models/User');
const {
  addNewSearch,
  successSet,
} = require('../../utils/messages');

const addNewSearchPath = (chatId, bot, message, user = new User()) => {
  if (message.toLowerCase() === '/addnovabusca') {
    bot.sendMessage(chatId, addNewSearch);
    user.setPath('addNewSearchPath');
    return user;
  } else {
    user.addNewWordToSearch(message);
    user.setPath('');
    bot.sendMessage(chatId, successSet);
    return user;
  }
}

module.exports = addNewSearchPath;