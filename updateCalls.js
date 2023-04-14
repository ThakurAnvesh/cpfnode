const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQNcGqPTotE7rBr4hc0SYAwwFbVJmXjyu0h6vV.gURv3WjCTVIbqGa65AjeI2zQwkhG9L504VmIvp28CAs.u3xH6rasl."
const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects"

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