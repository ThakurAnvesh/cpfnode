const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQNcGqPTotE7rBr4hc0SYAwwFbVJmXjyu0h6vV.gURv3WjCTVIbqGa65AjeI2zQwkhG9L504VmIvp28CAs.u3xH6rasl."
const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects"

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