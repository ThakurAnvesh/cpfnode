const { GraphQLClient, gql } = require("graphql-request");
const {
  accountQuery,
  leadQuery,
  contactQuery,
  opportunityQuery,
  filteredOpportunityQuery,
  filteredLeadQuery,
  accountByNameQuery,
  leadByNameQuery,
  contactByNameQuery,
  opportunityByNameQuery

} = require("./query");
const axios = require('axios');

const makeGraphQLURL = (url) => {
  return `${url}/services/data/v57.0/graphql`
}

const makesObjectURL = (url, sobject) => {
  return `${url}/services/data/v57.0/sobjects/${sobject}/describe`
}

const readAccounts = async (token, url) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultArr = [];
  const results = await graphqlClient.request(accountQuery);
  results.uiapi.query.Account.edges.map((item) => {
    resultArr.push(item.node);
  });
  resultArr.push(results.uiapi.query.Account.totalCount);
  return resultArr;
};

const getSchemaForObj = async(token, url, sobject) => {
  const config = {
        headers: { Authorization: `Bearer ${token}`  } 
  };
  const response = await axios.get(makesObjectURL(url, sobject), config);
  let fields = response.data.fields
  let fieldArr = [];
  fields.map(field => {
    if(!field.nillable && !field.defaultedOnCreate && field.createable){
    fieldArr.push({
      "name": field.name
    })
    if(field.name  === "LastName") fieldArr.push({"name": "FirstName"});
  }  
  })
  return fieldArr;
}

const readLeads = async (token, url) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultArr = [];
  const results = await graphqlClient.request(leadQuery);
  results.uiapi.query.Lead.edges.map((item) => {
    resultArr.push(item.node);
  });
  return resultArr;
};

const readContacts = async (token, url) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultArr = [];
  const results = await graphqlClient.request(contactQuery);
  results.uiapi.query.Contact.edges.map((item) => {
    resultArr.push(item.node);
  });
  return resultArr;
};

const readOpportunity = async (token, url) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultArr = [];
  const results = await graphqlClient.request(opportunityQuery);
  results.uiapi.query.Opportunity.edges.map((item) => {
    resultArr.push(item.node);
  });
  return resultArr;
};

const readFilteredOpportunity = async (token, url, status, month, year, day) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let variables = { status, month, year, day };

  const resultArr = [];
  const results = await graphqlClient.request(
    filteredOpportunityQuery,
    variables
  );
  results.uiapi.query.Opportunity.edges.map((item) => {
    resultArr.push(item.node);
  });
  const totalCount = results.uiapi.query.Opportunity.totalCount;
  return { resultArr, totalCount };
};

const readFilteredLeads = async (token, url, status, month, year, day) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let variables = { status, month, year, day };
  const resultArr = [];
  const results = await graphqlClient.request(filteredLeadQuery, variables);
  results.uiapi.query.Lead.edges.map((item) => {
    resultArr.push(item.node);
  });
  const totalCount = results.uiapi.query.Lead.totalCount;
  return { resultArr, totalCount };
};

const readAccountByName = async (token, url, name) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultArr = [];
  const results = await graphqlClient.request(accountByNameQuery, { name });
  results.uiapi.query.Account.edges.map((item) => {
    resultArr.push(item.node);
  });
  resultArr.push(results.uiapi.query.Account.totalCount);
  return resultArr;
};

const readLeadByName = async (token, url, name) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resultArr = [];
  const results = await graphqlClient.request(leadByNameQuery, { name });
  results.uiapi.query.Lead.edges.map((item) => {
    resultArr.push(item.node);
  });
  resultArr.push(results.uiapi.query.Lead.totalCount);
  return resultArr;
};
const readContactByName = async (token , url , name) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resultArr = [];
  const results = await graphqlClient.request(contactByNameQuery , { name });
  results.uiapi.query.Contact.edges.map((item) => {
    resultArr.push(item.node);
  });
  return resultArr;
};
const readOpportunityByName = async (token, url , name) => {
  const graphqlClient = new GraphQLClient(makeGraphQLURL(url), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resultArr = [];
  const results = await graphqlClient.request(opportunityByNameQuery,{ name });
  results.uiapi.query.Opportunity.edges.map((item) => {
    resultArr.push(item.node);
  });
  const totalCount = results.uiapi.query.Opportunity.totalCount;
  return { resultArr , totalCount };
};



module.exports = {
  readAccounts,
  readLeads,
  readContacts,
  readOpportunity,
  readFilteredOpportunity,
  readFilteredLeads,
  readAccountByName,
  readLeadByName,
  readContactByName,
  readOpportunityByName,
  getSchemaForObj
};
