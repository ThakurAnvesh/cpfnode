const { default: axios } = require("axios")

const Token  = "00D2w00000RskIo!AQkAQIFI4vgWVigvieo4raJtDYdY2mPeXLU7p1vZh8Cr3vz27__sKLVFEm6ELI5MeW31iGhdgNatUqxqqsRtAP77nKNPkBR4"
const URL = "https://nineleapstechnologysolutio2-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"
const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const updateAccount = async(id , ...args) => {
    let error = '';
    await axios.patch(`${URL}/Account/${id}`, ...args, config)
    .catch(err => {error = err.code});
    return error;
}

const updateLead = async(id,...args) => {
    let error = '';
    await axios.patch(`${URL}/Lead/${id}`, ...args, config)
        .catch(err => error = err.code);
        return error; 
}

const updateContact = async(id,...args) => {
    let error = ''; 
    await axios.patch(`${URL}/Contact/${id}`, ...args, config)
        .catch(err => error = err.code);
        return error; 
}

const updateOpportunity = async(id,...args) => {
        let error = '';
        await axios.patch(`${URL}/Opportunity/${id}`, ...args, config)
        .catch(err => error = err.code);
        return error;  
    }
    
module.exports = {updateAccount, updateContact, updateLead, updateOpportunity}