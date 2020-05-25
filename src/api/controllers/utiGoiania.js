module.exports = app => {

  const craw = require('../services/utiGoiania');
  const cheerio = require('cheerio');
  const uuidv4 = require('uuid/v4');
  const db = app.data.utiGoiania;


  const controller = {};


  controller.listUtiGoiania = async (req, res) => {
    const apiRetorno = await craw.fetchData()
      .then(res => {

        const html = res.data;
        const $ = cheerio.load(html);
        const result = $(".tabela > tbody > tr").map((i, element) => ({
          id: uuidv4(),
          unitDesc: $(element).find('td:nth-of-type(1)').text().trim(),
          descriptionBed: $(element).find('td:nth-of-type(2)').text().trim(),
          busyAmount: $(element).find('td:nth-of-type(3)').text().trim(),
          freeAmount: $(element).find('td:nth-of-type(4)').text().trim(),
          reservAmount: $(element).find('td:nth-of-type(5)').text().trim(),
          totalOffered: $(element).find('td:nth-of-type(7)').text().trim()
        })).get();

        const responseFinal = {
          utiGoiania: {
            data: result.filter((item) => {
              return item.unitDesc != '' &&
                item.descriptionBed != '' &&
                item.busyAmount != '' &&
                item.freeAmount != '' &&
                item.reservAmount != '' &&
                item.totalOffered != '';
            }),
            updateTime: Date.now()
          }
        }
        return responseFinal;
      }).catch(err => {
        return db;
      });
    return res.status(200).json(apiRetorno);
  }

  return controller;
}