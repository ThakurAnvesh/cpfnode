const express = require('express');
const { readAccounts, readLeads, readContacts, readOpportunity, readFilteredOpportunity, readFilteredLeads, readAccountByName } = require('./readCalls');
const { createAccount, createLead , createOpportunity} = require('./writeCalls');
const {updateAccount, updateContact, updateLead, updateOpportunity} = require('./updateCalls');
const app = express();
const jsforce = require('jsforce');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

let Token = '';

app.get('/', (req, res) => {
    res.send("Hey! Welcome to Copilot force");
})

app.get('/account', async(req, res) => {
    res.send(await readAccounts(Token));
});
app.get('/account/name', async(req, res) => {
    res.send(await readAccountByName(req.query.name));
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
    res.send(await readFilteredOpportunity(req?.query?.status, req?.query?.month, req?.query?.year, req?.query?.day) );
})
app.get("/filterLeads", async(req,res)=>{
    res.send(await readFilteredLeads(req.query.status, req.query.month, req.query.year, req.query.day) );
})



app.post('/newAccount', async(req, res) => {
    const response = await createAccount(req.query.name, req.query.shippingCity, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newLead', async(req, res) => {
    const response = await createLead(req.query.firstName, req.query.lastName, req.query.company, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newContact', async(req, res) => {
    const response = await createContact(req.query.firstName, req.query.lastName, req.query.accountId, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
});

app.post('/newOpportunity', async(req, res) => {
    const response = await createOpportunity(req.query.name, req.query.stageName, req.query.closeDate, req.query);
    response === '' ? res.send({status:"success"}).status(201) : res.send({error : response})
})



app.patch('/updateAccount',async(req,res)=>{

    const response = await updateAccount(req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateLead',async(req,res)=>{
    const response = await updateLead(req.query.id,req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateContact',async(req,res)=>{

    const response = await updateContact(req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
})
app.patch('/updateOpportunity',async(req,res)=>{

    const response = await updateOpportunity(req.query.id, req.body);
    response === '' ? res.send({status:"Success"}).status(204) : res.send({status:response})
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