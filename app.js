const express = require('express');
const { readAccounts, readLeads, readContacts } = require('./readCalls');
const { createAccount } = require('./writeCalls');
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

app.post('/newAccount', async(req, res) => {
    await createAccount(req.query.name, req.query.shippingCity);
    return res.status(201).send("Account created!")
});

app.listen(3001, () => {
    console.log('Server started on port 3001')
})