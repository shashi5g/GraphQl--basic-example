import React, { Component } from 'react'
import Employee from './Employee'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
// import { empty } from 'apollo-boost'

export const EMPLOYEE_LIST = gql`
  query EmpQuery($first: Int, $skip: Int, $orderBy: EmployeeOrderByInput) {
    emp(first: $first, skip: $skip, orderBy: $orderBy) {
      employees {
        id
        email
        tech
      }
      count
    }
  }
`

class EmployeeList extends Component {
    
    render() {
        // const authToken = localStorage.getItem()
  
       
        return (
            <Query query={EMPLOYEE_LIST} variables={this._getQueryVariables()}>
             {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          const linksToRender = data.emp.employees
    
          return (
            <div>
              {linksToRender.map(item => <Employee key={item.id} email={item.email} />)}
            </div>
          )
        }}
            </Query>
          )
    }

    _getQueryVariables = () => {
        const isNewPage = this.props.location.pathname.includes('new')
        const page = parseInt(this.props.match.params.page, 10)
      
        const skip = isNewPage ? (page - 1) * 5 : 0
        const first = isNewPage ? 5 : 100
        const orderBy = isNewPage ? 'createdAt_DESC' : null
        return { first, skip, orderBy }
      }

   
  
  }

  

export default EmployeeList