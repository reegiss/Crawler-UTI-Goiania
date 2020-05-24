const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.goiania.go.gov.br/sistemas/siscv/asp/siscvg0930f0.asp";

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);

    const result = $(".tabela > tbody > tr").map((i, element) => ({
        unitDesc: $(element).find('td:nth-of-type(1)').text().trim(),
        descriptionBed: $(element).find('td:nth-of-type(2)').text().trim(),
        busyAmount: $(element).find('td:nth-of-type(3)').text().trim(),
        freeAmount: $(element).find('td:nth-of-type(4)').text().trim(),
        reservAmount: $(element).find('td:nth-of-type(5)').text().trim(),
        totalOffered: $(element).find('td:nth-of-type(7)').text().trim()
    })).get();

    const filterResult = result.filter((item) => {
        return item.unitDesc != '' &&
            item.descriptionBed != '' &&
            item.busyAmount != '' &&
            item.freeAmount != '' && 
            item.reservAmount != '' &&
            item.totalOffered != '';
    });
    
    console.log(JSON.stringify(filterResult));
})

async function fetchData(url){
    console.log("Crawling data...")

    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));
    
    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;

}