const { GraphQLClient, gql } = require("graphql-request")

const URL = "https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"

// const graphqlClient = new GraphQLClient(URL, {
//     headers: { 
//             Authorization: `Bearer ${Token}`
//     },
// });
    
const readAccounts = async(token) => {  
  
  const graphqlClient = new GraphQLClient(URL, {
      headers: { 
              Authorization: `Bearer ${token}`
      },
  });

  const query = gql`
      query accounts {
        uiapi {
             query {
                 Account(first: 50,orderBy : {Name: {order: ASC}}) {
                     edges {
                         node {
                             Id
                              Name {
                                 value
                             }
                             AccountNumber{
                               value
                             }
                             Phone{
                                 value
                             }
                             Contacts{
                               edges{
                                 node{
                                   title: Name{
                                     value
                                   }
                                 }
                               }
                             }
                           Cases {
                             edges {
                               node {
                                 CaseNumber {
                                   value
                                 }
                               }
                             }
                           }
                         }
                     }
                 }
             }
        }
    }    
    `
    const resultArr = []
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Account.edges.map(item => {
        resultArr.push(item.node);
    });
    resultArr.push(results.uiapi.query.Account.totalCount);
    return resultArr;
}

const readLeads = async(token) => {    
  const graphqlClient = new GraphQLClient(URL, {
      headers: { 
              Authorization: `Bearer ${token}`
      },
  });
    const query = gql`
    query leads{
      uiapi{
          query{
              Lead(first: 50){
                  edges{
                      node{
                          Id
                          Name{
                              value
                          }
                          Company{
                              value
                          }
                          Status{
                              value
                          }
                          LeadSource{
                              value
                          }
                      
                      }
                  }
              }
          }
      }
  }

` 
    const resultArr = []
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Lead.edges.map(item => {
        resultArr.push(item.node);
    });
    return resultArr;
}

const readContacts = async(token) => {    
  const graphqlClient = new GraphQLClient(URL, {
        headers: { 
              Authorization: `Bearer ${token}`
      },
  });

    const query = gql`
        query contacts{
  uiapi{
    query{
      Contact(first: 50){
        edges{
          node{
            Id
            Name{
              value
            }
            Account{
              DisplayValue
            }
          }
        }
      }
    }
  } 
} 
    ` 
    const resultArr = []
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Contact.edges.map(item => {
        resultArr.push(item.node);
    });
    return resultArr;
}

const readOpportunity = async(token)=>{
  const graphqlClient = new GraphQLClient(URL, {
      headers: { 
              Authorization: `Bearer ${token}`
      },
  });
  const query = gql`
  query Opportunity {
    uiapi {
      query {
        Opportunity(first: 50) {
          edges {
            node {
              Id
              Name {
                value
              }
              CloseDate{
                value
              }
              CreatedDate{
                value
              }
              StageName{
                value
              }
              Description{
                value
              }
              Amount{
                  value
              }
              Account
              {
                  DisplayValue
              }
              StageName{
                  value
              }
              Probability{
                  value
              }
              LeadSource{
                  value
              }              
            }
          }
        }
      }
    }
  }
  `
   const resultArr = []
   const results = await graphqlClient.request(query);
   results.uiapi.query.Opportunity.edges.map(item =>{
    resultArr.push(item.node);
   });
   return resultArr;

}

const readFilteredOpportunity = async(status, month, year,day) =>{
  const query = gql`
  query opportunitiesClosingSoonExplicitAND($status : Picklist, $month : Long, $year : Long, $day :Long) {
  uiapi {
    query {
      Opportunity(
        where: {
          and: [
              {StageName:{eq : $status}}
            { CloseDate: { CALENDAR_YEAR: { value: { eq: $year } }, CALENDAR_MONTH:{ value: { eq: $month }},  DAY_IN_MONTH: {value: { eq: $day} }} }
          ]
        }
      ) { 
        edges {
          node {
            Id
            Name{
                value
            }
            NextStep {
              value
            }
            CloseDate {
              value
              displayValue
            }
            
            Description {
              value
            }
            StageName{
                value
            }
          }
        }
        totalCount
        }
      }
    }
  }
  `;
  let variables = {status,month,year,day};

  const resultArr = [];
   const results = await graphqlClient.request(query , variables);
   results.uiapi.query.Opportunity.edges.map(item =>{
    resultArr.push(item.node);
   });
   const totalCount = results.uiapi.query.Opportunity.totalCount;
   return {resultArr,totalCount};
}

const readFilteredLeads = async(status, month, year,day) =>{
  const query = gql`
  query Lead($status : Picklist, $month : Long, $year : Long, $day :Long) {
    uiapi {
      query {
        Lead (
          where: {
            and: [
                {Status:{eq : $status}}
              { CreatedDate: { CALENDAR_YEAR: { value: { eq: $year } }, CALENDAR_MONTH:{ value: { eq: $month }},  DAY_IN_MONTH: {value: { eq: $day} }} }
            ]
          }
        ){
          edges {
            node {
              Id
              Name {
                value
              }
              Email {
                value
              }
              Status{
                value
              }
              CreatedBy{
                DisplayValue
              }
              CreatedDate{
                value
              }
              
            }
          }
          totalCount
        }
      }
    }
  }
  `;
  let variables ={status,month,year,day};
  const resultArr = [];
   const results = await graphqlClient.request(query ,variables);
   results.uiapi.query.Lead.edges.map(item =>{
    resultArr.push(item.node);
   });
   const totalCount = results.uiapi.query.Lead.totalCount;
   return {resultArr, totalCount};
}

const readAccountByName = async(name)=>{
  const query = gql` 
    query accounts($name:String) {
        uiapi {
             query {
                 Account(first: 50, 
                 where:{
                     and:[
                          {Name:{eq : $name}}
                     ]
                 }) {
                  totalCount   
                  edges {
                         node {
                             Id
                              Name {
                                 value
                             }
                             AccountNumber{
                               value
                             }
                             Contacts{
                               edges{
                                 node{
                                   title: Name{
                                     value
                                   }
                                 }
                               }
                             }
                           Cases {
                             edges {
                               node {
                                 CaseNumber {
                                   value
                                 }
                               }
                             }
                           }
                         }
                     }
                 }
             }
        }
    }
  `;
  const resultArr = [];
   const results = await graphqlClient.request(query ,{name});
   results.uiapi.query.Account.edges.map(item =>{
    resultArr.push(item.node);
   });
   resultArr.push(results.uiapi.query.Account.totalCount);
   return resultArr;
}

module.exports = {readAccounts, readLeads, readContacts, readOpportunity,readFilteredOpportunity, readFilteredLeads,readAccountByName}
