const { default: axios } = require("axios")

const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects"

const updateAccount = async(token ,id , ...args) => {
    let error = '';
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    await axios.patch(`${URL}/Account/${id}`, ...args, config)
    .catch(err => {error = err.code});
    return error;
}

const updateLead = async(token,id,...args) => {
    let error = '';
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    await axios.patch(`${URL}/Lead/${id}`, ...args, config)
        .catch(err => error = err.code);
        return error; 
}

const updateContact = async(token,id,...args) => {
    let error = ''; 
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    await axios.patch(`${URL}/Contact/${id}`, ...args, config)
        .catch(err => error = err.code);
        return error; 
}

const updateOpportunity = async(token,id,...args) => {
        let error = '';
        const config = {
            headers: { Authorization: `Bearer ${token}`  } 
        };
        await axios.patch(`${URL}/Opportunity/${id}`, ...args, config)
        .catch(err => error = err.code);
        return error;  
    }
    
module.exports = {updateAccount, updateContact, updateLead, updateOpportunity}