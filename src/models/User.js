const CronJob = require("cron").CronJob;

const cronAction = require('../services/cronAction');

module.exports = class User {
  constructor (id = 0, name = '') {
    this.id = id;
    this.name = name;
  }

  id = 0;
  name = '';
  botChatUnlocked = false;
  numberOfSuggestions = 5;
  wordsToSearch = [];

  // 00:00
  timeToSendMessage = '';

  // [sun, mon, tue, wed, thu, fri, sat]
  daysToSendMessage = [false, false, false, false, false, false, false];

  // ex.: 'addNewSearch'
  path = '';

  cronJob = '';

  getId = () => this.id;
  getName = () => this.name;
  getBotChatUnlocked = () => this.botChatUnlocked;
  getNumberOfSuggestions = () => this.numberOfSuggestions;
  getWordsToSearch = () => this.wordsToSearch;
  getTimeToSendMessage = () => this.timeToSendMessage;
  getDaysToSendMessage = () => this.daysToSendMessage;
  getPath = () => this.path;
  getCronJob = () => this.cronJob;

  unlockBotChat = () => this.botChatUnlocked = true;
  setNumberOfSuggestions = (number = 5) => this.numberOfSuggestions = number;
  addNewWordToSearch = (newWord = '') => {
    !this.wordsToSearch.find(item => item === newWord) && 
    this.wordsToSearch.push(newWord);
  }
  setTimeToSendMessage = (newTime = '') => this.timeToSendMessage = newTime;
  setDaysToSendMessage = (newDays = this.daysToSendMessage) => {
    this.daysToSendMessage = newDays;
  }
  setPath = (newPath = '') => this.path = newPath;
  setCronJob = (cronAction) => {
    const minutes = this.timeToSendMessage.split(':')[1];
    const hours = this.timeToSendMessage.split(':')[0];
    const daysOfWeek = this.daysToSendMessage.map(
      (item, index) => item ? index : -1
    ).filter(item => item !== -1).join(',');

    this.cronJob = new CronJob(
      `${minutes} ${hours} * * ${daysOfWeek}`, 
      async () =>  await cronAction(),
      null, 
      undefined, 
      'America/Sao_Paulo',
    );
  }
  startCronJob = () => {
    this.cronJob.start();
  }
  stopCronJob = () => {
    this.cronJob.stop();
  }

  removeWordToSearch = (removeWord) => {
    const index = this.wordsToSearch.findIndex(item => item === removeWord);
    if (index !== -1) {
      this.wordsToSearch.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}