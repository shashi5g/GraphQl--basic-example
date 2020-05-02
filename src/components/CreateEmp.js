import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { EMPLOYEE_LIST } from './EmployeeList'
import { LINKS_PER_PAGE } from './constants'
class CreateEmp extends Component {
  state = {
    tech: '',
    email: '',
  }

  render() {
    const EMP_POST_MUTATION = gql`
    mutation emppostMutation($email: String!, $tech: String!) {
      emppost(email: $email, tech: $tech) {
        id
        email
        tech
        }
    }
  `
    const { email, tech } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="email"
            placeholder="email"
          />
          <input
            className="mb2"
            value={tech}
            onChange={e => this.setState({ tech: e.target.value })}
            type="text"
            placeholder="technology"
          />
        </div>
        <Mutation
          mutation={EMP_POST_MUTATION}
          variables={{ email, tech }}
          onCompleted={() => this.props.history.push('/emp')}
          update={(store, { data: { emppost } }) => {
            const first = LINKS_PER_PAGE
            const skip = 0
            const orderBy = 'createdAt_DESC'
            const data = store.readQuery({
              query: EMPLOYEE_LIST,
              variables: { first, skip, orderBy }
            })
            data.emp.employees.unshift(emppost)
            store.writeQuery({
              query: EMPLOYEE_LIST,
              data,
              variables: { first, skip, orderBy }
            })
          }}
        >
          {emppostMutation => <button onClick={emppostMutation}>Submit</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateEmp