import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SearchItem, {fragment} from './SearchItem';

const searchQuery = gql`
    query {
        trips(skip: 0, take:5) {
            ...SearchTrip
        }
    }
    ${fragment}
`

const tripSubscription = gql`
    subscription {
        tripCreated {
            ...SearchTrip
        }
    }
    ${fragment}
`

const subscription = {
    document: tripSubscription,
    updateQuery: (prev, { subscriptionData }) => {    
        if(!subscriptionData.data) return prev;

        const newTrip = subscriptionData.data.tripCreated;
        return {trips: [newTrip, ...prev.trips]};
    }
}

class SearchPage extends React.Component<any,any> {
    componentDidMount() {
        this.props.subscribeToNewTrips();
    }
    render() {
        const { loading, data } = this.props;
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
    }
}

export default class Search extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <Query query={searchQuery} fetchPolicy="network-only">
                {({ subscribeToMore, ...result}) => 
                    <SearchPage
                        {...result}
                        subscribeToNewTrips={() => 
                            subscribeToMore(subscription)
                        }
                    />
                }
            </Query>
        )
    }
}