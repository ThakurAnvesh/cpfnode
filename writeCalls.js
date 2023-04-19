const { default: axios } = require("axios");

const makeGraphQLURL = (url,entity) => {
    return `${url}/services/data/v57.0/sobjects/${entity}`
}
const createAccount = async(token,url,...args) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };

    let error = '';
    await axios.post(makeGraphQLURL(url,'Account'), ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.response.data);
         return error; 
}

const createLead = async(token,url,...args) => {     
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    let error = '';
    await axios.post(makeGraphQLURL(url,'Lead'), ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.response.data);
        return error; 
}

const createContact = async(token,url,...args) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
    let error = '';
    await axios.post(makeGraphQLURL(url,'Contact'), ...args, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.response.data);
        return error;  
}

const createOpportunity = async(token,url,...args) => {
    const config = {
        headers: { Authorization: `Bearer ${token}`  } 
    };
        let error = '';
        await axios.post(makeGraphQLURL(url,'Opportunity'), ...args, config)
            .then(res => console.log(res.status))
            .catch(err => error = err.response.data);
             return error; 
    }
   
module.exports = {createAccount, createLead, createContact,createOpportunity}