const { default: axios } = require("axios")

const Token  = "00D2w00000RsbQL!ARIAQHt4sg55z.CzcjIIbY9tEORSuLaHk3ir0NNNBdisVrFeDyce8xR5BCggf0haZLJO7xKmmm3.7CSf9Tl3KgWBJIvuiS9H"
const URL = "https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"

const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
    };

const createAccount = async(name, shippingCity) => {
    let requestBody = {
            "Name" : name,
            "ShippingCity" : shippingCity,
    }
        
    await axios.post("https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/sobjects/Account", requestBody, config)
        .then(res => console.log(res.status))
        .catch(err => console.log(err)) 
}

module.exports = {createAccount}