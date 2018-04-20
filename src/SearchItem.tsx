import * as React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Card, CardContent, Typography, CardActions, Button } from 'material-ui';

export const fragment = gql`
fragment SearchTrip on Trip {
    id
    createdBy {
        userName
    }
    legs {
        origin { city }
        destination { city }
        arrival
        departure
    }
}
`

class SearchItem extends React.Component<any, any> {
    constructor(props:any){
        super(props);
    }

    handleClick(event:any, tripId: any) {
        this.props.history.push(`/trip/${tripId}`)
    }

    render() {
        return (
            <>
                <Card>
                    <CardContent>
                        <Typography>
                            Username: {this.props.trip.createdBy.userName}
                        </Typography>
                        <Typography>
                            Origin: {this.props.trip.legs[0].origin.city}
                        </Typography>
                        <Typography>
                            Destination: {this.props.trip.legs[0].destination.city}
                        </Typography>                        
                        <Typography>
                            Arrival: {this.props.trip.legs[0].arrival}
                        </Typography>                                                
                    </CardContent>
                    <CardActions>
                        <Button 
                            onClick={(event) => 
                                this.handleClick(event, this.props.trip.id)} 
                            variant="raised"
                        >
                            View
                        </Button>
                    </CardActions>
                </Card>
            </>
        ) 
    }
}

const WithRouter = withRouter(SearchItem);

export default class SearchItemWithRouter extends React.Component<any, any> {
    render() {
        return <WithRouter {...this.props}/>
    }
}