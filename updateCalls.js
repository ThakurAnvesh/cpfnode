const { default: axios } = require("axios");

const makeGraphQLURL = (url,entity,id) => {
    return `${url}/services/data/v57.0/sobjects/${entity}/${id}`
}

const updateAccount = async(token ,url,id , ...args) => {
    let error = '';
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    await axios.patch(makeGraphQLURL(url,'Account',id), ...args, config)
    .catch(err => {error = err.code});
    return error;
}

const updateLead = async(token,url,id,...args) => {
    let error = '';
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    await axios.patch(makeGraphQLURL(url,'Lead',id), ...args, config)
        .catch(err => error = err.code);
        return error; 
}

const updateContact = async(token,url,id,...args) => {
    let error = ''; 
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    await axios.patch(makeGraphQLURL(url,'Contact',id), ...args, config)
        .catch(err => error = err.code);
        return error; 
}

const updateOpportunity = async(token,url,id,...args) => {
        let error = '';
        const config = {
            headers: { Authorization: `Bearer ${token}`  } 
        };
        await axios.patch(makeGraphQLURL(url,'Opportunity',id), ...args, config)
        .catch(err => error = err.code);
        return error;  
    }
    
module.exports = {updateAccount, updateContact, updateLead, updateOpportunity}