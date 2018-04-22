import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Grid, Tabs, Tab, Button } from 'material-ui';
import { addDays, startOfDay } from 'date-fns';
import { DateTimePicker } from 'material-ui-pickers';

const mutation = gql`
    mutation createTrip($input: CreateTripInput!) {
        createTrip(input: $input) {
            trip {
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
    }
`

export default class ListPage extends React.Component<any, any> {
    constructor(props:any){
        super(props)
    }

    state: any = {
        origin: '',
        destination: '',
        departure: new Date(),
        arrival: addDays(new Date(), 1),
        transportType: 'CAR',
        reservationType: 'SEAT'
    }

    submitForm = async (mutate: any) => {
        const { origin, destination, arrival, departure, transportType, reservationType} = this.state;
        try {
            const res = await mutate({
                variables: {input: {
                    origin,
                    destination,
                    arrival: arrival.toString(),
                    departure: departure.toString(),
                    transportType,
                    reservationType
                }}
            })
            const data = res.data.createTrip;
            this.props.history.push({
                pathname: `/trip/${data.trip.id}`,
                state: {trip: data.trip}
            })

        } catch (error) {
            //error handling for unauthorized
            console.log(error, error.graphQLErrors, error.networkError);
        }        
    }

    handleDateChange = (name: any) => (date: any) => {
        this.setState({
            [name]: date
        })
    }

    handleChange = (name: any) => (event: any, value?: any) => {
        this.setState({
            [name]: event.target.value || value,
        });
    }

    render() {
        return (
            <Mutation mutation={mutation}>{
                (mutate) => {
                    return (
                        <>
                        <form>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <TextField
                                        id="origin"
                                        label="Origin"
                                        value={this.state.origin}
                                        onChange={this.handleChange('origin')}
                                        margin="normal"
                                        helperText="City or Postal Code"
                                        fullWidth={true}                   
                                    />                                
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="destination"
                                        label="Destination"
                                        value={this.state.destination}
                                        onChange={this.handleChange('destination')}
                                        margin="normal"
                                        helperText="City or Postal Code"
                                        fullWidth={true}                            
                                    />                                
                                </Grid>                 
                                <Grid item xs={6}>
                                    <DateTimePicker
                                        keyboard
                                        fullWidth={true}
                                        label="Departure"
                                        onError={console.log}
                                        minDate={startOfDay(new Date())}
                                        value={this.state.departure}
                                        onChange={this.handleDateChange('departure')}
                                        format="MM/DD/YYYY hh:mm A"
                                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                                    />                                        
                                </Grid>
                                <Grid item xs={6}>
                                    <DateTimePicker
                                        keyboard
                                        fullWidth={true}                                        
                                        label="Estimated Arrival"
                                        onError={console.log}
                                        minDate={startOfDay(new Date())}
                                        value={this.state.arrival}
                                        onChange={this.handleDateChange('arrival')}
                                        format="MM/DD/YYYY hh:mm A"
                                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                                    />                              
                                </Grid>
                                <Grid item xs={12}>
                                    <Tabs
                                        value={this.state.transportType}
                                        onChange={this.handleChange('transportType')}
                                        fullWidth
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        <Tab value="CAR" label="CAR" />
                                        <Tab value="RV" label="RV" />
                                        <Tab value="BUS" label="BUS" />
                                        <Tab value="OTHER" label="OTHER" />
                                    </Tabs>
                                </Grid>
                                <Grid item xs={12}>
                                    <Tabs
                                        value={this.state.reservationType}
                                        onChange={this.handleChange('reservationType')}
                                        fullWidth
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        <Tab value="SEAT" label="SEAT" />
                                        <Tab value="BED" label="BED" />
                                        <Tab value="OTHER" label="OTHER" />
                                    </Tabs>
                                </Grid>
                                <br/>
                                <br/>
                                <Grid item xs={12}>
                                    <Button variant="raised" onClick={() => this.submitForm(mutate)}>List</Button>                                
                                </Grid>                                                                     
                            </Grid>
                        </form>
                        </>
                    )
                }
            }
            </Mutation>
        )
    }
}