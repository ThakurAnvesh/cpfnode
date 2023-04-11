const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQP1pQOUl1OBvQIWQzZk3DvUmfA57YMYz_HFPS5vj5WvvYmBDdEDej7t3eq9JFKh0vcVD19jkEjS9SvatQg9UJG3y61Bk"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const updateAccount = async(id ,name, shippingCity) => {
    let requestBody = {
            "Name" : name,
            "ShippingCity" : shippingCity,
    }   
    let error = '';
    await axios.patch(`https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Account/${id}`, requestBody, config)
    .catch(err => {error = err.code});
    return error;
}

const updateLead = async(id,firstName, lastName, company) => {
    let requestBody = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "Company": company
    }
    let error = '';
    await axios.post(`https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Lead/${id}`, requestBody, config)
        .catch(err => error = err.code);
        return error; 
}

const updateContact = async(id,firstName, lastName, accountId) => {
    let requestBody = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "AccountId": accountId
    }
    let error = ''; 
    await axios.post(`https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Contact/${id}`, requestBody, config)
        .catch(err => error = err.code);
        return error; 
}

const updateOpportunity = async(id,name, stageName, closeDate) => {
        let requestBody = {
                "Name" : name,
                "StageName" : stageName,
                "CloseDate" : closeDate
        }
        let error = '';
        await axios.post(`https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Opportunity/${id}`, requestBody, config)
        .catch(err => error = err.code);
        return error;  
    }
module.exports = {updateAccount, updateContact, updateLead, updateOpportunity}