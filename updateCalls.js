const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQPttXQ4xdmvYTDx1k9_u48Za_v3gaRwscwFViu3btO8G56NcgHDSujXAny4v4xvjZU_Ye3Sy3tIwh_cebMWQ7dG5Xp5E"
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