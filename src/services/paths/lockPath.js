const {
   firstWelcome,
  incorrectPassword,
} = require('../../utils/messages');

const lockPath = (chatId, bot, message, user = new User()) => {
  if (message === process.env.BOT_PASSWORD) {
    bot.sendMessage(chatId, firstWelcome);
    user.unlockBotChat();
    return user;
  } else {
    bot.sendMessage(chatId, incorrectPassword);
    return user;
  }
}

module.exports = lockPath;