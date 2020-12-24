const User = require('../../models/User');
const { 
  programDays, 
  programDaysTable,
  successSet, 
  errorSet,
} = require('../../utils/messages');
const cronAction = require('../cronAction');

const programDaysPath = (chatId, bot, message, user = new User()) => {
  if (message.toLowerCase() === '/programardias') {
    bot.sendMessage(chatId, programDays);
    bot.sendMessage(chatId, programDaysTable);
    user.setPath('programDaysPath');
    return user;
  } else {
    const days = message.split('\n');

    if (days.length !== 7) {
      bot.sendMessage(chatId, errorSet);
      return user;
    }

    const programArr = [];

    for (let i = 0; i < 7; i++) {
      const choice = days[i]
        .split(' ')
        .slice(2, 4)
        .map(item => {
          if (item.toLowerCase().search('x') !== -1) {
            return true;
          } else {
            return false;
          }
        });
      
      if ((choice[0] && choice[1]) || (!choice[0] && !choice[1])) {
        bot.sendMessage(chatId, errorSet);
        return user;
      }
      
      programArr.push(choice[0]);
    }

    user.setDaysToSendMessage(programArr);

    if (
      user.getDaysToSendMessage().findIndex(item => item) !== -1
      && user.getTimeToSendMessage() !== ''  
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

module.exports = programDaysPath;