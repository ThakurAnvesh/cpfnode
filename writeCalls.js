const { default: axios } = require("axios")

const Token  = "00D2w00000RsbQL!ARIAQJ90WwnmLu..mbmt4JVVDslDdY_sebec4uWILg0nOHIZ9l9rX0BIPgDyswjyuBLA88msyGblTjYPkygdAD0g3FVclz2s"
const URL = "https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"

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