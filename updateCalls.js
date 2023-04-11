const { default: axios } = require("axios")

const Token  = "00D2w00000Rsgrm!ARoAQKCwVPOQea847RxAmzTTna4WFFnUT7k6xEMiwsdd9AF_tOcogY.ooW_yyehftOe8_H2lJ4YAcHn0.rrsFZs_TZmsY.Pg"
const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const updateAccount = async(id ,name, shippingCity) => {
    let requestBody = {
            "Name" : name,
            "ShippingCity" : shippingCity,
    }   
    let error = '';
    await axios.patch(`${URL}/Account/${id}`, requestBody, config)
    .then(res => console.log(res.status))
    .catch(err => {
        console.log(err);
        error = err.code
    });
    return error;
}

const updateLead = async(id,firstName, lastName, company) => {
    let requestBody = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "Company": company
    }
    let error = '';
    await axios.post(`${URL}/Lead/${id}`, requestBody, config)
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
    await axios.post(`${URL}/Contact/${id}`, requestBody, config)
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
        await axios.post(`${URL}/Opportunity/${id}`, requestBody, config)
        .catch(err => error = err.code);
        return error;  
    }
    
module.exports = {updateAccount, updateContact, updateLead, updateOpportunity}