require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const User = require('./models/User');
const paths = require('./services/paths');
const { 
  firstEntrance, 
  commandList, 
  showUserData,
  successExclude,
  welcomeBack,
  invalidCommand,
  dontUnderstand,
} = require('./utils/messages');
 
const token = process.env.BOT_TOKEN;
 
const bot = new TelegramBot(token, { polling: true });

const users = [];
 
bot.on('message', async (message) => {
  const chatId = message.chat.id;

  let userIndex = users.findIndex(user => user.getId() === chatId);

  if (userIndex === -1) {
    users.push(new User(
      chatId, 
      message.chat.first_name + ' ' + message.chat.last_name
    ));
    
    userIndex = 0;
  }

  if (!users[userIndex].getBotChatUnlocked()) {
    if (message.text === '/start') {
      bot.sendMessage(chatId, firstEntrance);
      return;
    }

    const userResponse = paths['lockPath'](
      chatId, 
      bot, 
      message.text, 
      users[userIndex]
    );
    users[userIndex] = userResponse;
    return;
  }

  if (message.text.charAt(0) === '/' || users[userIndex].getPath() !== '') {
    if (message.text.toLowerCase() === '/start') {
      bot.sendMessage(chatId, welcomeBack);
      users[userIndex].setPath('');
      return;
    }

    if (message.text.toLowerCase() === '/ajuda') {
      bot.sendMessage(chatId, commandList);
      users[userIndex].setPath('');
      return;
    }

    if (message.text.toLowerCase() === '/meusdados') {
      bot.sendMessage(chatId, showUserData(users[userIndex]));
      users[userIndex].setPath('');
      return;
    }

    if (message.text.toLowerCase() === '/excluir') {
      users.splice(userIndex, 1);
      bot.sendMessage(chatId, successExclude);
      return;
    }

    let command = '';

    (
      message.text.toLowerCase() === '/addnovabusca' || 
      users[userIndex].getPath() === 'addNewSearchPath'
    ) && (command = 'addNewSearchPath');

    (
      message.text.toLowerCase() === '/removerbusca' || 
      users[userIndex].getPath() === 'removeSearchPath'
    ) && (command = 'removeSearchPath');

    (
      message.text.toLowerCase() === '/programarnumerodesugestoes' || 
      users[userIndex].getPath() === 'programNumberOfSuggestionsPath'
    ) && (command = 'programNumberOfSuggestionsPath');
      
    (
      message.text.toLowerCase() === '/programarhorario' || 
      users[userIndex].getPath() === 'programTimePath'
    ) && (command = 'programTimePath');

    (
      message.text.toLowerCase() === '/programardias' || 
      users[userIndex].getPath() === 'programDaysPath'
    ) && (command = 'programDaysPath');

    (
      message.text.toLowerCase() === '/querosugestaoagora' || 
      users[userIndex].getPath() === 'getSuggestionNowPath'
    ) && (command = 'getSuggestionNowPath');

    if (!paths[command]) {
      bot.sendMessage(
        chatId, 
        message.text.charAt(0) === '/' ? invalidCommand : dontUnderstand
      );
      users[userIndex].setPath('');
      return;
    }

    const userResponse = await paths[command](
      chatId,
      bot,
      message.text,
      users[userIndex]
    );
    users[userIndex] = userResponse;
    return;
  }

  bot.sendMessage(chatId, dontUnderstand);
  return;
});

