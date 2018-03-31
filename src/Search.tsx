import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const searchQuery = gql`
    query {
        trips {
            createdBy {
                email
            }
        }
    }
`

export default class Search extends React.Component {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <Query query={searchQuery}>
                {({loading, data, error, fetchMore }) => {
                    return (
                        <div>
                            {JSON.stringify(data)}
                            {loading ? <p>Loading</p> : null}
                        </div>
                    )
                }}
            </Query>
        )
    }
}