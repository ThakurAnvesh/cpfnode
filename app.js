const express = require('express');
const { readAccounts, readLeads, readContacts, readOpportunity, readFilteredOpportunity, readFilteredLeads } = require('./readCalls');
const { createAccount, createLead , createOpportunity} = require('./writeCalls');
const {updateAccount, updateLead, updateContact, updateOpportunity} = require('./updateCalls');
const app = express();

app.get('/', (req, res) => {
    res.send("Hey! Welcome to Copilot force");
})

app.get('/account', async(req, res) => {
    res.send(await readAccounts());
});

app.get('/lead', async(req, res) => {
    res.send(await readLeads());
});

app.get('/contact', async(req, res) => {
    res.send(await readContacts());
});

app.get('/opportunity', async(req, res) => {
    res.send(await readOpportunity());
});

app.get("/filterOpportunity", async(req,res)=>{
    res.send(await readFilteredOpportunity(req.query.status, req.query.month, req.query.year, req.query) );
})
app.get("/filterLeads", async(req,res)=>{
    res.send(await readFilteredLeads(req.query.status, req.query.month, req.query.year, req.query) );
})
app.post('/newAccount', async(req, res) => {
    await createAccount(req.query.name, req.query.shippingCity);
    return res.status(201).send("Account created!")
});

app.post('/newLead', async(req, res) => {
    await createLead(req.query.firstName, req.query.lastName, req.query.company);
    return res.status(201).send("Lead created!")
});

app.post('/newContact', async(req, res) => {
    await createContact(req.query.firstName, req.query.lastName, req.query.accountId);
    return res.status(201).send("Contact created!")
});

app.post('/newOpportunity', async(req, res) => {
    await createOpportunity(req.query.name, req.query.stageName, req.query.closeDate);
    return res.status(201).send("Opportunity created!")
})
app.patch('/updateAccount',async(req,res)=>{

    const response = await updateAccount(req.query.id, req.query.Name, req.query.shippingCity);
    response === '' ? res.send({status:"Success"}) : res.send({status:"response"})
})
app.patch('/updateLead',async(req,res)=>{

    const response = await updateLead(req.query.id, req.query.firstName, req.query.lastName, req.query.company);
    response === '' ? res.send({status:"Success"}) : res.send({status:"response"})
})
app.patch('/updateContact',async(req,res)=>{

    const response = await updateContact(req.query.id, req.query.firstName, req.query.lastName, req.query.accountId);
    response === '' ? res.send({status:"Success"}) : res.send({status:"response"})
})
app.patch('/updateOpportunity',async(req,res)=>{

    const response = await updateOpportunity(req.query.id, req.query.name, req.query.stageName, req.query.closeDate);
    response === '' ? res.send({status:"Success"}) : res.send({status:"response"})
})

app.listen(3001, () => {
    console.log('Server started on port 3001')
})