import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Trip from './Trip';
import { Button } from 'material-ui';

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
                {location.state
                ?   <Trip {...location.state}/>
                :   <Query query={query} variables={{id: match.params.id}}>
                            {({loading, data, error, fetchMore }) => {
                                if(loading) return <p>Loading</p>
                                else if(data.trip.legs[0].transport.reservations) {
                                    return (
                                        <>
                                            <Trip {...data} />
                                            <Button>Add Leg</Button>
                                        </>
                                    )
                                }
                                return <Trip {...data}/>
                            }}
                    </Query>
                }
            </>
        )
    }
}