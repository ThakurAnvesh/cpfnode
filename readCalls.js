const { GraphQLClient, gql } = require("graphql-request")

const Token  = "00D2w00000RsbQL!ARIAQJ90WwnmLu..mbmt4JVVDslDdY_sebec4uWILg0nOHIZ9l9rX0BIPgDyswjyuBLA88msyGblTjYPkygdAD0g3FVclz2s"
const URL = "https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"

const graphqlClient = new GraphQLClient(URL, {
    headers: { 
            Authorization: `Bearer ${Token}`
    },
});
    
const readAccounts = async(token) => {  
  const query = gql`
        query accounts {
    uiapi {
         query {
             Account(orderBy : {Name: {order: ASC}}) {
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
    `
    const resultArr = []
    const results = await graphqlClient.request(query); 
    results.uiapi.query.Account.edges.map(item => {
        resultArr.push(item.node);
    });
    return resultArr;
}


const readLeads = async() => {    
    const query = gql`
    query leads{
        uiapi{
            query{
                Lead{
                    edges{
                        node{
                            Id
                            Name{
                                value
                            }
                            Company{
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


const readContacts = async() => {    
    const query = gql`
        query contacts{
  uiapi{
    query{
      Contact{
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

const readOpportunity = async()=>{
  const query = gql`
  query Opportunity {
    uiapi {
      query {
        Opportunity {
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
  let variables = {};

  variables = status && {...variables, status};
  variables = month && {...variables, month};
  variables = year && {...variables, year};
  variables = day && {...variables, day};

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
  let variables = {};

  variables = status && {...variables, status};
  variables = month && {...variables, month};
  variables = year && {...variables, year};
  variables = day && {...variables, day}

  const resultArr = [];
   const results = await graphqlClient.request(query , variables);
   results.uiapi.query.Lead.edges.map(item =>{
    resultArr.push(item.node);
   });
   const totalCount = results.uiapi.query.Lead.totalCount;
   return {resultArr, totalCount};
}

module.exports = {readAccounts, readLeads, readContacts, readOpportunity,readFilteredOpportunity, readFilteredLeads}


//consumer key
// 3MVG9n_HvETGhr3DS80tHTuDlemT7Sd2kecbZbGIe7FtvkjhgTsFQN9h_ptUAgG6sOuYogIq0gEBDYquEQ_OH

//Secret
// 36F8B2711A59FD03A884B3F960DC31EB9E969628A0291D2CF18E584A7CA6403E