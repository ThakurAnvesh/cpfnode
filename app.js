const express = require('express');
const { getSchemaForObj, readAccounts, readLeads, readContacts, readOpportunity, readFilteredOpportunity, readFilteredLeads, readAccountByName, readLeadByName } = require('./readCalls');
const { createAccount, createLead , createOpportunity, createContact} = require('./writeCalls');
const {updateAccount, updateContact, updateLead, updateOpportunity} = require('./updateCalls');
const { getToken } = require('sf-jwt-token'); 
const fs = require("fs");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const privateKey = fs.readFileSync("server.key").toString('utf-8');

app.get('/', (req, res) => {
    res.send("Hey! Welcome to Co-pilot force");
})

app.get('/account', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readAccounts());
});

app.get('/account/name', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readAccountByName(req.query.name));
});
app.get('/lead/name', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readLeadByName(req.query.name));
});
app.get('/lead', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readLeads());
});

app.get('/contact', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readContacts());
});

app.get('/opportunity', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readOpportunity());
});

app.get("/filterOpportunity", async(req,res)=>{
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readFilteredOpportunity(req?.query?.status, req?.query?.month, req?.query?.year, req?.query?.day) );
})
app.get("/filterLeads", async(req,res)=>{
    // const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readFilteredLeads(req.query.status, req.query.month, req.query.year, req.query.day) );
})
app.post('/newAccount', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createAccount( req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newLead', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createLead(req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newContact', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createContact(req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newOpportunity', async(req, res) => {
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createOpportunity(req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
})
app.patch('/updateAccount',async(req,res)=>{
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateAccount(req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateLead',async(req,res)=>{
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateLead(req.query.id,req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateContact',async(req,res)=>{
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateContact(req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateOpportunity',async(req,res)=>{
    // const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateOpportunity(req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})

app.get('/schema/requiredFields', async(req, res) => {
    const response = await getSchemaForObj(req.query.sobject);
    res.send(response);
})

app.get('/login', async(req, res) => {
    try {
    const jwtTokenResponse = await getToken({
        iss: "3MVG9n_HvETGhr3DS80tHTuDleiiWwAOTMV6i0YulG.VEtg2Dq50yk6MM.KVqP5s4CjjQvp3HfJ9WvM4M5YQO",
        sub: "anvesh.thakur@nineleaps.com",
        aud: "https://login.salesforce.com",
        privateKey: privateKey,
    })
        console.log("instanceUrl", jwtTokenResponse.instance_url)
        console.log("accessToken", jwtTokenResponse.access_token)
        if(jwtTokenResponse.access_token) res.send("Successfully Authenticated")
    } catch (error) {
        console.log(error.statusCode);
        res.send(error.body)
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001')
})