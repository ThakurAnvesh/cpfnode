const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQF_dVID68S733jreC4vIdGsBCai6irhryAxwjEeI1e8WSEhEHKMQcHKojtvuAv.O5ADq.5U7rQYRtSLwCJd4x5jqbZjz"
const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const createAccount = async(name,shippingCity) => {
    let requestBody = {
            "Name" : name,
            "ShippingCity" : shippingCity,
    }
    let error = '';
    await axios.post(`${URL}/Account`, requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
         return error; 
}

const createLead = async(firstName, lastName, company) => {
    let requestBody = {
             firstName,
             lastName,
            company,
    }
        
    let error = '';
    await axios.post(`${URL}/Lead`, requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error; 
}

const createContact = async(firstName, lastName, accountId) => {
    let requestBody = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "AccountId": accountId
    }
    let error = '';
    await axios.post(`${URL}/Contact`, requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => error = err.code);
        return error;  
}

const createOpportunity = async(name, stageName, closeDate) => {
        let requestBody = {
                "Name" : name,
                "StageName" : stageName,
                "CloseDate" : closeDate
        }
        let error = '';
        await axios.post(`${URL}/Opportunity`, requestBody, config)
            .then(res => console.log(res.status))
            .catch(err => error = err.code);
             return error; 
    }

    
module.exports = {createAccount, createLead, createContact,createOpportunity}