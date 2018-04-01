import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { DateTime } from 'luxon';

const mutation = gql`
    mutation createTrip($input: CreateTripInput!) {
        createTrip(input: $input) {
            trip {
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
    }
`

export default class ListPage extends React.Component {
    constructor(props:any){
        super(props)
    }

    async handleSubmit(event:any, mutate:any) {
        event.preventDefault();
        try {
            const res = await mutate({
                context: { headers : { authorization: `Bearer ${localStorage['HITCH_JWT']}`}},
                variables: {input: {
                    origin: event.target['originCity'].value,
                    destination: event.target['destinationCity'].value,
                    arrival: event.target['arrival'].value,
                    departure: event.target['departure'].value,
                    transportType: event.target['transportType'].value,
                    reservationType: event.target['reservationType'].value,
                }}
            })
            const data = res.data.createTrip;

        } catch (error) {
            console.log(error, error.graphQLErrors, error.networkError);
        }
    }

    render() {
        return (
            <Mutation mutation={mutation}>{
                (mutate) => {
                    return (
                        <form onSubmit={(event) => this.handleSubmit(event, mutate)}>
                            <label> Origin City <input type="text" name="originCity"/> </label>
                            <label> Destination City <input type="text" name="destinationCity"/> </label><br/>
                            <label> Departure <input type="text" name="departure" defaultValue={DateTime.utc(undefined).toString()}/> </label>
                            <label> Est. Arrival <input type="text" name="arrival" defaultValue={DateTime.utc(undefined).plus({days: 3}).toString()}/> </label>

                            <p>Transport Type</p>
                            <div>
                                <input type="radio" name="transportType" value="CAR"/>
                                <label>Car</label>
                                <input type="radio" name="transportType" value="BUS"/>
                                <label>Bus</label>
                                <input type="radio" name="transportType" value="RV"/>
                                <label>RV</label>                                
                            </div>

                            <p>Reservation Type</p>
                            <div>
                                <input type="radio" name="reservationType" value="SEAT"/>
                                <label>Seat</label>
                                <input type="radio" name="reservationType" value="BED"/>
                                <label>Bed</label>
                                <input type="radio" name="reservationType" value="RECLINER"/>
                                <label>Recliner</label>                                
                            </div>

                            <button type="submit">List</button>
                        </form>
                    )
                }
            }
            </Mutation>
        )
    }
}