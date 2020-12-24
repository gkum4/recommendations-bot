const puppeteer = require('puppeteer');

const getScieloSearchResults = async (keyword, pageNumber='1') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    process.env.BASE_SCIELO_SEARCH_URL +
    `page=${pageNumber}&q=${keyword.replace(/\ /g, '+')}`
  );
  
  const values = await page.evaluate(() => {
    const itemsArr = document.getElementsByClassName('item');

    const valuesArr = [];
    
    for (const item of itemsArr) {
      const title = item
        .getElementsByTagName('div')[1]
        .getElementsByClassName('line')[0]
        .getElementsByTagName('a')[0]
        .getElementsByTagName('strong')[0]
        .innerText;
      
      const link = item
        .getElementsByTagName('div')[1]
        .getElementsByClassName('line')[0]
        .getElementsByTagName('a')[0]
        .href;

      const month = (!!item
        .getElementsByTagName('div')[1]
        .getElementsByClassName('line source')[0]
        .getElementsByTagName('span')[1]) ?
          (item
        .getElementsByTagName('div')[1]
        .getElementsByClassName('line source')[0]
        .getElementsByTagName('span')[1]
        .innerText) :
        '';
      
      const year = (!!item
        .getElementsByTagName('div')[1]
        .getElementsByClassName('line source')[0]
        .getElementsByTagName('span')[2]) ?
          (item
        .getElementsByTagName('div')[1]
        .getElementsByClassName('line source')[0]
        .getElementsByTagName('span')[2]
        .innerText.replace(', ', '')) :
        '';
        
      valuesArr.push({
        title,
        link,
        date: (!!month ? month + ' ' : '') + (!!year ? year : ''), 
      });
    }

    return valuesArr;
  });

  await browser.close();

  return values;
}

module.exports = getScieloSearchResults;