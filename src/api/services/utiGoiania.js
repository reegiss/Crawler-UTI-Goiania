const axios = require('axios');

const url = "https://www.goiania.go.gov.br/sistemas/siscv/asp/siscvg0930f0.asp";

async function fetchData() {
    console.log("Crawling data...")

    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error occurred while fetching data");
        return;
    }

    return response;

}

module.exports = {
    fetchData
};