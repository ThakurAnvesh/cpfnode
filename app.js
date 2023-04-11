const express = require('express');
const { readAccounts, readLeads, readContacts, readOpportunity, readFilteredOpportunity, readFilteredLeads } = require('./readCalls');
const { createAccount, createLead , createOpportunity} = require('./writeCalls');
const { userLogin } = require('./login');
const app = express();
const jsforce = require('jsforce');

let Token = '';

app.get('/', (req, res) => {
    res.send("Hey! Welcome to Copilot force");
})

app.get('/account', async(req, res) => {
    res.send(await readAccounts(Token));
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
    res.send(await readFilteredOpportunity(req.query.status, req.query.month, req.query.year, req.query.day));
})
app.get("/filterLeads", async(req,res)=>{
    res.send(await readFilteredLeads(req.query.status, req.query.month, req.query.year, req.query.day));
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

app.get('/oauth2/auth', async(req, res) => {
    // userLogin();
    const outh2 = new jsforce.OAuth2({
        clientId: '3MVG9n_HvETGhr3DS80tHTuDlemT7Sd2kecbZbGIe7FtvkjhgTsFQN9h_ptUAgG6sOuYogIq0gEBDYquEQ_OH',
        clientSecret: '36F8B2711A59FD03A884B3F960DC31EB9E969628A0291D2CF18E584A7CA6403E',
        redirectUri: 'http://localhost:3001/getToken'
    });
    res.redirect(outh2.getAuthorizationUrl({}));
});

app.get('/getToken', function(req,res) {
  const conn = new jsforce.Connection(
    { oauth2: new jsforce.OAuth2({
        clientId: '3MVG9n_HvETGhr3DS80tHTuDlemT7Sd2kecbZbGIe7FtvkjhgTsFQN9h_ptUAgG6sOuYogIq0gEBDYquEQ_OH',
        clientSecret: '36F8B2711A59FD03A884B3F960DC31EB9E969628A0291D2CF18E584A7CA6403E',
        redirectUri: 'http://localhost:3001/getToken'
  })});
  
  conn.authorize(req.query.code, function(err, userInfo) {
    if (err) {
      return console.error(err);
    }
    Token = conn.accessToken;
    console.log(conn.accessToken, conn.instanceUrl); // access token via oauth2
  });
});

app.listen(3001, () => {
    console.log('Server started on port 3001')
})