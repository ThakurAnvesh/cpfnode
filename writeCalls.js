const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQP1pQOUl1OBvQIWQzZk3DvUmfA57YMYz_HFPS5vj5WvvYmBDdEDej7t3eq9JFKh0vcVD19jkEjS9SvatQg9UJG3y61Bk"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const createAccount = async(name, shippingCity) => {
    let requestBody = {
            "Name" : name,
            "ShippingCity" : shippingCity,
    }
        
    await axios.post("https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Account", requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => console.log(err)) 
}

const createLead = async(firstName, lastName, company) => {
    let requestBody = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "Company": company
    }
        
    await axios.post("https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Lead", requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => console.log(err)) 
}

const createContact = async(firstName, lastName, accountId) => {
    let requestBody = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "AccountId": accountId
    }
        
    await axios.post("https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Contact", requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => console.log(err)) 
}

const createOpportunity = async(name, stageName, closeDate) => {
        let requestBody = {
                "Name" : name,
                "StageName" : stageName,
                "CloseDate" : closeDate
        }
            
        await axios.post("https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Opportunity", requestBody, config)
            .then(res => console.log(res.status))
            .catch(err => console.log(err)) 
    }
module.exports = {createAccount, createLead, createContact,createOpportunity}