import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
    query trip($id: ID!){
        trip(id: $id) {
            id
            legs {
                id
                origin { id, city }
                destination { id, city }
                arrival
                departure
                transport {
                    id
                    type
                    reservations {
                        id
                        type
                    }
                }
            }
        }
    }
`

export default class TripPage extends React.Component<any, any> {
    constructor(props: any){
        super(props)
    }

    render(){
        const { match, location, staticContext } = this.props;
        return (
            <>
                <div>{match.params.id}</div>
                {location.state || staticContext
                ? <div>{JSON.stringify(location.state)}</div>
                :   <Query query={query} variables={{id: match.params.id}}>
                            {({loading, data, error, fetchMore }) => {
                                return (
                                <>
                                    <div>{JSON.stringify(data)}</div>
                                    <div>{JSON.stringify(error)}</div>
                                </>
                                )
                            }}
                    </Query>
                }
            </>
        )
    }
}