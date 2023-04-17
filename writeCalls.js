const { default: axios } = require("axios")

const URL = "https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects"


const createAccount = async(token,name,shippingCity,...args) => {
    if(!name || !shippingCity) return "Provide all fields";
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };

    let error = '';
    await axios.post(`${URL}/Account`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
         return error; 
}

const createLead = async(token,firstName, lastName, company, ...args) => {

    if(!firstName || !lastName || !company ) return "Provide all fields";  
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };      
    let error = '';
    await axios.post(`${URL}/Lead`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error; 
}

const createContact = async(token, firstName, lastName, accountId, ...args) => {
    if(!firstName || !lastName || !accountId) return "Provide all fields";
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    }; 
    let error = '';
    await axios.post(`${URL}/Contact`, ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error;  
}

const createOpportunity = async(token,name, stageName, closeDate , ...args) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`  } 
        }; 
        if(!name || !stageName || !closeDate) return "Provide all fields";
        let error = '';
        await axios.post(`${URL}/Opportunity`, ...args, config)
            .then(res => console.log(res.status))
            .catch(err => error = err.code);
             return error; 
    }

    
module.exports = {createAccount, createLead, createContact,createOpportunity}