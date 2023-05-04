const { GraphQLClient, gql } = require("graphql-request")
const axios = require('axios');

const Token  = "00D2w00000Rsgrm!ARoAQPttXQ4xdmvYTDx1k9_u48Za_v3gaRwscwFViu3btO8G56NcgHDSujXAny4v4xvjZU_Ye3Sy3tIwh_cebMWQ7dG5Xp5E"
const URL = "https://nineleaps5-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"
const url = "https://nineleaps5-dev-ed.develop.my.salesforce.com"

const readAccounts = async() => {  
  
  const graphqlClient = new GraphQLClient(URL, {
      headers: { 
              Authorization: `Bearer ${Token}`
      },
  });

  const query = gql`
      query accounts {
        uiapi {
             query {
                 Account(first: 10,orderBy : {Name: {order: ASC}}) {
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
    let resultArr = ""
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Account.edges.map(item => {        
        resultArr = resultArr.concat(item.node.Name.value + ", ");
    });
    return resultArr;
}

const readLeads = async(token) => {    
  const graphqlClient = new GraphQLClient(URL, {
      headers: { 
              Authorization: `Bearer ${Token}`
      },
  });
    const query = gql`
    query leads{
      uiapi{
          query{
              Lead(first: 10){
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
    let resultArr = ""
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Lead.edges.map(item => {
      resultArr = resultArr.concat(item.node.Name.value + ", ");
    });
    return resultArr;
}

const readContacts = async(token) => {    
  const graphqlClient = new GraphQLClient(URL, {
        headers: { 
              Authorization: `Bearer ${Token}`
      },
  });

    const query = gql`
        query contacts{
  uiapi{
    query{
      Contact(first: 10){
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
    let resultArr = ""
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Contact.edges.map(item => {
      resultArr = resultArr.concat(item.node.Name.value + ", ");
    });
    return resultArr;
}

const readOpportunity = async(token)=>{
  const graphqlClient = new GraphQLClient(URL, {
      headers: { 
              Authorization: `Bearer ${Token}`
      },
  });
  const query = gql`
  query Opportunity {
    uiapi {
      query {
        Opportunity(first: 10) {
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
   let resultArr = ""
   const results = await graphqlClient.request(query);
   results.uiapi.query.Opportunity.edges.map(item =>{
    resultArr = resultArr.concat(item.node.Name.value + ", ");
   });
   return resultArr;

}

const readFilteredOpportunity = async(token , status, month, year,day) =>{
  const graphqlClient = new GraphQLClient(URL, {
    headers: { 
            Authorization: `Bearer ${Token}`
    },
});
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

const readFilteredLeads = async(token,status, month, year,day) =>{
  const graphqlClient = new GraphQLClient(URL, {
    headers: { 
            Authorization: `Bearer ${Token}`
    },
});
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
        ){Token
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

const readAccountByName = async(token ,name)=>{
  const graphqlClient = new GraphQLClient(URL, {
    headers: { 
            Authorization: `Bearer ${Token}`
    },
});
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

const readLeadByName = async(name)=>{
  const graphqlClient = new GraphQLClient(URL, {
    headers: { 
            Authorization: `Bearer ${Token}`
    },
});
  const query = gql` 
  query leads($name:String){
    uiapi{
        query{
            Lead(first: 50,
              where:{
                and:[
                  {Name:{eq: $name}}
                ]
              }){
                totalCount
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
  `;
  const resultArr = [];
   const results = await graphqlClient.request(query ,{name});
   results.uiapi.query.Lead.edges.map(item =>{
    resultArr.push(item.node);
   });
   resultArr.push(results.uiapi.query.Lead.totalCount);
   return resultArr;
}

const makesObjectURL = (url, sobject) => {
  return `${url}/services/data/v57.0/sobjects/${sobject}/describe`
}

const getSchemaForObj = async(sobject) => {
  const config = {
        headers: { Authorization: `Bearer ${Token}`  } 
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

module.exports = { getSchemaForObj, readAccounts, readLeads, readContacts, readOpportunity,readFilteredOpportunity, readFilteredLeads,readAccountByName, readLeadByName}
