const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xlsx = require('xlsx');
const cheerio = require('cheerio');


const saveData = (data) => {
  fs.writeFile(path.resolve(__dirname, 'output.txt'), data, function(err) {
      if (err) throw err;
  })
}

function findTable($, allTables) {
    // 查找最内部的 table
    let innermostTable = null;
    allTables.each((index, table) => {
      if ($(table).find("table").length === 0) {
        // 如果该 table 没有子 table，则为最内部的 table
        innermostTable = $(table);
      }
    });

    // 检查是否找到了最内部的 table
    if (!innermostTable) {
      console.error('No innermost table found.');
      return;
    }
    // console.log(`find table is:`, innermostTable)
    const dataArr = $(innermostTable).find("tbody").children('tr')
    
    return dataArr
}

const fetchData = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // console.log(`find ${allTables} table`)
    const allTables = $("table");
    const dataArr = findTable($, allTables)
    // 排除前三个
    const selectedElements = dataArr.slice(3);
    // console.log(`选择有效内部tr个数：`, selectedElements.length)

    const resultArray = []; // 最终结果， 用于存储结果的二维数组

    // 遍历每个 tr
    selectedElements.each((index, element) => {
      const rowArray = []; // 每一行的数组
      $(element).find("td").each((i, td) => {
        let cellText = $(td).text().trim();// 获取 td 的文本内容并去除多余的空格
        if(cellText) {
          rowArray.push(cellText)
        }
      });
      resultArray.push(rowArray); // 将每一行的数组加入到结果数组中
    });

    // console.log(`最终结果打印>>> \n`, resultArray)
    return resultArray
  }
  catch (error) {
    console.error('Error fetching data:', error.message);
  }

}

const fetchAllData = async () => {
  const allData = []; // 用于存储所有页面的数据

  for (let i = 1; i <= 83; i++) {
    const url = `http://www.apta.gov.cn/Officer/Summary?examid=378&&&type=&pcode=&pi=${i}`;
    console.log(`Fetching data from: ${url}`);
    const pageData = await fetchData(url);
    allData.push(...pageData); // 将当前页面的数据合并到总数据中
  }

  // console.log('All data fetched:', allData);

  return allData
}

const __main = () => {
  const saveToExcel = (data) => {
    // 创建一个工作表
    const worksheet = xlsx.utils.aoa_to_sheet(data);
    // 创建一个工作簿
    const workbook = xlsx.utils.book_new();
    // 将工作表添加到工作簿
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Data');
    // 保存工作簿到文件
    xlsx.writeFile(workbook, 'output.xlsx');
  };
  
  // 调用函数
  fetchAllData()
    .then(allData => {
      console.log('All data number is :', allData.length);
      saveToExcel(allData); // 保存到 Excel 文件
    })
    .catch(err => {
      console.error('Caught an error:', err.message);
    });
}

__main()