const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQPkTEfJlusmrFwL2ANFwPzYspXHZdGpkZqDLNhRlwNUwncqb1WvMcxkCEg35IG6Uvhp1wX2nV90Lby0e3K4QEUzfGjAf"
const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v52.0/sobjects"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const createAccount = async(...args) => {

    let error = '';
    await axios.post(`${URL}/Account`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.response.data);
         return error; 
}

const createLead = async(...args) => {     
    let error = '';
    await axios.post(`${URL}/Lead`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.response.data);
        return error; 
}

const createContact = async(...args) => {
    let error = '';
    await axios.post(`${URL}/Contact`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.response.data);
        return error;  
}

const createOpportunity = async(...args) => {
        let error = '';
        await axios.post(`${URL}/Opportunity`, ...args, config)
            .then(res => console.log(res.status))
            .catch(err => error = err.response.data);
             return error; 
    }

    
module.exports = {createAccount, createLead, createContact,createOpportunity}