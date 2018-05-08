import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SearchItem, {fragment} from './SearchItem';

const searchQuery = gql`
    query {
        myTrips(skip: 0, take:5) {
            ...SearchTrip
        }
    }
    ${fragment}
`

class MyTrip extends React.Component<any,any> {
    render() {
        const { loading, data } = this.props;
        return (
            <>
                {loading
                    ? <p>Loading</p> 
                    : data.myTrips.map((trip:any) => 
                        <SearchItem key={trip.id} trip={trip} />
                    )
                }
            </>
            )
    }
}

export default class MyTripWithData extends React.Component<any, any> {
    render() {
        return (
            <Query query={searchQuery} fetchPolicy="network-only">
                {({ subscribeToMore, ...result}) => 
                    <MyTrip
                        {...result}
                    />
                }
            </Query>
        )
    }
}