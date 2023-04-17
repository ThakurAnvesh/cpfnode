const express = require('express');
const { readAccounts, readLeads, readContacts, readOpportunity, readFilteredOpportunity, readFilteredLeads, readAccountByName, readLeadByName , readContactByName, readOpportunityByName } = require('./readCalls');
const { createAccount, createLead , createContact,createOpportunity} = require('./writeCalls');
const {updateAccount, updateContact, updateLead, updateOpportunity} = require('./updateCalls');
const { getToken } = require('sf-jwt-token'); 
const fs = require("fs");
require('dotenv').config();

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
    const url = req.query.url;
    res.send(await readAccounts(authHeader, url));
});

app.get('/account/name', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readAccountByName(authHeader, url, req.query.name));
});
app.get('/lead', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readLeads(authHeader, url));
});

app.get('/lead/name', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readLeadByName(authHeader, url, req.query.name));
});

app.get('/contact', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readContacts(authHeader, url));
});
app.get('/contact/name', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readContactByName(authHeader , url ,req.query.name));
});

app.get('/opportunity', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readOpportunity(authHeader, url));
});
app.get('/opportunity/name', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readOpportunityByName(authHeader, url , req.query.name));
});

app.get("/filterOpportunity", async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readFilteredOpportunity(authHeader, url,req?.query?.status, req?.query?.month, req?.query?.year, req?.query?.day) );
})
app.get("/filterLeads", async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    res.send(await readFilteredLeads(authHeader, url,req.query.status, req.query.month, req.query.year, req.query.day) );
})

app.post('/newAccount', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    const response = await createAccount(authHeader,url, req.body.name, req.body.shippingCity, req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newLead', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    req.query.url && delete req.query.url
    const response = await createLead(authHeader, url,req.body.firstName, req.body.lastName, req.body.company, req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newContact', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    req.query.url && delete req.query.url
    const response = await createContact(authHeader,url, req.body.firstName, req.body.lastName, req.body.accountId, req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newOpportunity', async(req, res) => {
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    req.query.url && delete req.query.url
    const response = await createOpportunity(authHeader,url, req.body.name, req.body.stageName, req.body.closeDate, req.body);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
})

app.patch('/updateAccount',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    const response = await updateAccount(authHeader,url,req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateLead',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    const response = await updateLead(authHeader,url,req.query.id,req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateContact',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    const response = await updateContact(authHeader,url,req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateOpportunity',async(req,res)=>{
    const authHeader = req.header('Authorization').split(" ")[1]
    const url = req.query.url;
    const response = await updateOpportunity(authHeader,url,req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})

app.get('/login', async(req, res) => {
    try {
    const jwtTokenResponse = await getToken({
        iss: process.env.CONNECTED_APP,
        sub: req.query.email,
        aud: "https://login.salesforce.com",
        privateKey: privateKey,
    })
        console.log("instanceUrl", jwtTokenResponse.instance_url)
        console.log("accessToken", jwtTokenResponse.access_token)
        if(jwtTokenResponse.access_token) res.send({
            access_token : jwtTokenResponse.access_token,
            instance_url : jwtTokenResponse.instance_url       
        })
    } catch (error) {
        console.log(error.statusCode);
        res.send(error.body)
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001')
})