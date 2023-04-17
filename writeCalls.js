const { default: axios } = require("axios");

const makeGraphQLURL = (url,entity) => {
    return `${url}/services/data/v57.0/sobjects/${entity}`
}

const createAccount = async(token,url,name,shippingCity,...args) => {
    if(!name || !shippingCity) return "Provide all fields";
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };

    let error = '';
    await axios.post(makeGraphQLURL(url,'Account'), ...args, config)
        .then(res => console.log(res.status))
        .catch(err => {
            console.log(err);
            error = err.code
        });
         return error; 
}

const createLead = async(token,url,firstName, lastName, company, ...args) => {

    if(!firstName || !lastName || !company ) return "Provide all fields";  
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };      
    let error = '';
    await axios.post(makeGraphQLURL(url,'Lead'), ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error; 
}

const createContact = async(token,url, firstName, lastName, accountId, ...args) => {
    if(!firstName || !lastName || !accountId) return "Provide all fields";
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    }; 
    let error = '';
    await axios.post(makeGraphQLURL(url,'Contact'), ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error;  
}

const createOpportunity = async(token,url,name, stageName, closeDate , ...args) => {
        const config = {
            headers: { Authorization: `Bearer ${token}`  } 
        }; 
        if(!name || !stageName || !closeDate) return "Provide all fields";
        let error = '';
        await axios.post(makeGraphQLURL(url,'Opportunity'), ...args, config)
            .then(res => console.log(res.status))
            .catch(err => error = err.code);
             return error; 
    }

    
module.exports = {createAccount, createLead, createContact,createOpportunity}