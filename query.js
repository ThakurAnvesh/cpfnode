const { gql } = require("graphql-request");
const accountQuery = gql`
  query accounts {
    uiapi {
      query {
        Account(first: 50, orderBy: { Name: { order: ASC } }) {
          edges {
            node {
              Id
              Name {
                value
              }
              AccountNumber {
                value
              }
              Phone {
                value
              }
              Contacts {
                edges {
                  node {
                    title: Name {
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

const leadQuery = gql`
  query leads {
    uiapi {
      query {
        Lead(first: 50) {
          edges {
            node {
              Id
              Name {
                value
              }
              Company {
                value
              }
              Status {
                value
              }
              LeadSource {
                value
              }
            }
          }
        }
      }
    }
  }
`;
const contactQuery = gql`
  query contacts {
    uiapi {
      query {
        Contact(first: 50) {
          edges {
            node {
              Id
              Name {
                value
              }
              Account {
                DisplayValue
              }
            }
          }
        }
      }
    }
  }
`;
const opportunityQuery = gql`
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
              CloseDate {
                value
              }
              CreatedDate {
                value
              }
              StageName {
                value
              }
              Description {
                value
              }
              Amount {
                value
              }
              Account {
                DisplayValue
              }
              StageName {
                value
              }
              Probability {
                value
              }
              LeadSource {
                value
              }
            }
          }
        }
      }
    }
  }
`;
const filteredOpportunityQuery = gql`
  query opportunitiesClosingSoonExplicitAND(
    $status: Picklist
    $month: Long
    $year: Long
    $day: Long
  ) {
    uiapi {
      query {
        Opportunity(
          where: {
            and: [
              { StageName: { eq: $status } }
              {
                CloseDate: {
                  CALENDAR_YEAR: { value: { eq: $year } }
                  CALENDAR_MONTH: { value: { eq: $month } }
                  DAY_IN_MONTH: { value: { eq: $day } }
                }
              }
            ]
          }
        ) {
          edges {
            node {
              Id
              Name {
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
              StageName {
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

const filteredLeadQuery = gql`
  query Lead($status: Picklist, $month: Long, $year: Long, $day: Long) {
    uiapi {
      query {
        Lead(
          where: {
            and: [
              { Status: { eq: $status } }
              {
                CreatedDate: {
                  CALENDAR_YEAR: { value: { eq: $year } }
                  CALENDAR_MONTH: { value: { eq: $month } }
                  DAY_IN_MONTH: { value: { eq: $day } }
                }
              }
            ]
          }
        ) {
          edges {
            node {
              Id
              Name {
                value
              }
              Email {
                value
              }
              Status {
                value
              }
              CreatedBy {
                DisplayValue
              }
              CreatedDate {
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

const accountByNameQuery = gql`
  query accounts($name: String) {
    uiapi {
      query {
        Account(first: 50, where: { and: [{ Name: { eq: $name } }] }) {
          totalCount
          edges {
            node {
              Id
              Name {
                value
              }
              AccountNumber {
                value
              }
              Contacts {
                edges {
                  node {
                    title: Name {
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

const leadByNameQuery = gql`
  query leads($name: String) {
    uiapi {
      query {
        Lead(first: 50, where: { and: [{ Name: { eq: $name } }] }) {
          totalCount
          edges {
            node {
              Id
              Name {
                value
              }
              Company {
                value
              }
              Status {
                value
              }
              LeadSource {
                value
              }
            }
          }
        }
      }
    }
  }
`;
const contactByNameQuery = gql`
  query contacts($name: String) {
    uiapi {
      query {
        Contact(first: 50, where: { and: [{ Name: { eq: $name } }] }) {
          edges {
            node {
              Id
              Name {
                value
              }
              Account {
                DisplayValue
              }
            }
          }
        }
      }
    }
  }
`;
const opportunityByNameQuery = gql`
  query Opportunity($name: String) {
    uiapi {
      query {
        Opportunity(first: 50, where: { and: [{ Name: { eq: $name } }] }) {
          totalCount
          edges {
            node {
              Id
              Name {
                value
              }
              CloseDate {
                value
              }
              CreatedDate {
                value
              }
              StageName {
                value
              }
              Description {
                value
              }
              Amount {
                value
              }
              Account {
                DisplayValue
              }
              StageName {
                value
              }
              Probability {
                value
              }
              LeadSource {
                value
              }
            }
          }
        }
      }
    }
  }
`;


module.exports = {
  accountQuery,
  leadQuery,
  contactQuery,
  opportunityQuery,
  filteredOpportunityQuery,
  filteredLeadQuery,
  accountByNameQuery,
  leadByNameQuery,
  opportunityByNameQuery,
  contactByNameQuery,
};
