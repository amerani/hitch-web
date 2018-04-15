import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const searchQuery = gql`
    query {
        trips(take:5) {
            createdBy {
                id
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
            <Query query={searchQuery} fetchPolicy="network-only">
                {({loading, data, error, fetchMore }) => {
                    return (
                    <>
                        {loading
                            ? <p>Loading</p> 
                            : data.trips.map((trip:any) => 
                                <div key={trip.createdBy.id}>
                                    {trip.createdBy.email}
                                </div>)
                        }
                    </>
                    )
                }}
            </Query>
        )
    }
}