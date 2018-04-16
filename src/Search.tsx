import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SearchItem, {fragment} from './SearchItem';

const searchQuery = gql`
    query {
        trips(take:5) {
            ...SearchTrip
        }
    }
    ${fragment}
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
                                <SearchItem key={trip.id} trip={trip} />
                            )
                        }
                    </>
                    )
                }}
            </Query>
        )
    }
}