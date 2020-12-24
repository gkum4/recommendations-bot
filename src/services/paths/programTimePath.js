const User = require('../../models/User');
const {
  programTime,
  successSet, 
  errorSet,
} = require('../../utils/messages');
const cronAction = require('../cronAction');

const programTimePath = (chatId, bot, message, user = new User()) => {
  if (message.toLowerCase() === '/programarhorario') {
    bot.sendMessage(chatId, programTime);
    user.setPath('programTimePath');
    return user;
  } else {
    const timeArr = message.split(':');

    if (timeArr.length !== 2) {
      bot.sendMessage(chatId, errorSet);
      return user;
    }

    if (
      (Number(timeArr[0]) < 0 || Number(timeArr[0]) > 23) ||
      (Number(timeArr[1]) < 0 || Number(timeArr[1]) > 59)
    ) {
      bot.sendMessage(chatId, errorSet);
      return user;
    }

    user.setTimeToSendMessage(message);

    if (
      user.getDaysToSendMessage().findIndex(item => item) !== -1 &&
      user.getTimeToSendMessage() !== ''  
    ) {
      user.getCronJob() !== '' && user.stopCronJob();
      user.setCronJob(() => cronAction(chatId, bot, user));
      user.startCronJob();
    } else {
      user.getCronJob() !== '' && user.stopCronJob();
    }

    user.setPath('');
    bot.sendMessage(chatId, successSet);
    return user;
  }
}

module.exports = programTimePath;