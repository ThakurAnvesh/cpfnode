const express = require('express');
const { readAccounts, readLeads, readContacts, readOpportunity, readFilteredOpportunity, readFilteredLeads, readAccountByName, readLeadByName } = require('./readCalls');
const { createAccount, createLead , createOpportunity} = require('./writeCalls');
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
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readAccounts(authHeader));
});

app.get('/account/name', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readAccountByName(authHeader,req.query.name));
});
app.get('/lead', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readLeads(authHeader));
});

app.get('/lead/name', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readLeadByName(authHeader,req.query.name));
});

app.get('/contact', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readContacts(authHeader));
});

app.get('/opportunity', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readOpportunity(authHeader));
});

app.get("/filterOpportunity", async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readFilteredOpportunity(authHeader,req?.query?.status, req?.query?.month, req?.query?.year, req?.query?.day) );
})
app.get("/filterLeads", async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    res.send(await readFilteredLeads(authHeader,req.query.status, req.query.month, req.query.year, req.query.day) );
})



app.post('/newAccount', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createAccount(authHeader, req.query.name, req.query.shippingCity, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newLead', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createLead(authHeader, req.query.firstName, req.query.lastName, req.query.company, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newContact', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createContact(authHeader, req.query.firstName, req.query.lastName, req.query.accountId, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newOpportunity', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await createOpportunity(authHeader, req.query.name, req.query.stageName, req.query.closeDate, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
})



app.patch('/updateAccount',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateAccount(authHeader,req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateLead',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateLead(authHeader,req.query.id,req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateContact',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateContact(authHeader,req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateOpportunity',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const response = await updateOpportunity(authHeader,req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
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