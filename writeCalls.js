const { default: axios } = require("axios")

const Token  = "00D2w00000RskIo!AQkAQIFI4vgWVigvieo4raJtDYdY2mPeXLU7p1vZh8Cr3vz27__sKLVFEm6ELI5MeW31iGhdgNatUqxqqsRtAP77nKNPkBR4"
const URL = "https://nineleapstechnologysolutio2-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const createAccount = async(name,shippingCity,...args) => {
    if(!name || !shippingCity) return "Provide all fields";

    let error = '';
    await axios.post(`${URL}/Account`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
         return error; 
}

const createLead = async(firstName, lastName, company, ...args) => {

    if(!firstName || !lastName || !company ) return "Provide all fields";        
    let error = '';
    await axios.post(`${URL}/Lead`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error; 
}

const createContact = async(firstName, lastName, accountId, ...args) => {
    if(!firstName || !lastName || !accountId) return "Provide all fields";
    let error = '';
    await axios.post(`${URL}/Contact`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error;  
}

const createOpportunity = async(name, stageName, closeDate , ...args) => {
        if(!name || !stageName || !closeDate) return "Provide all fields";
        let error = '';
        await axios.post(`${URL}/Opportunity`, ...args, config)
            .then(res => console.log(res.status))
            .catch(err => error = err.code);
             return error; 
    }

    
module.exports = {createAccount, createLead, createContact,createOpportunity}