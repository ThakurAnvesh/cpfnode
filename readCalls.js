const { GraphQLClient, gql } = require("graphql-request")

const Token  = "00D2w00000RsbQL!ARIAQHt4sg55z.CzcjIIbY9tEORSuLaHk3ir0NNNBdisVrFeDyce8xR5BCggf0haZLJO7xKmmm3.7CSf9Tl3KgWBJIvuiS9H"
const URL = "https://nineleaps-dev-ed.develop.my.salesforce.com/services/data/v57.0/graphql"

const graphqlClient = new GraphQLClient(URL, {
    headers: { 
            Authorization: `Bearer ${Token}`
    },
});
    
const readAccounts = async() => {    
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

module.exports = {readAccounts, readLeads, readContacts}