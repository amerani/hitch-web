import * as React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { Card, CardContent, Typography, CardActions, Button, withStyles } from 'material-ui';
import DateTime from './DateTime';

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

const styles: any = {
    card: {
        marginTop: '5px',
        marginBottom: '5px'
    }
}

class SearchItem extends React.Component<any, any> {
    constructor(props:any){
        super(props);
    }

    handleClick(event:any, tripId: any) {
        this.props.history.push(`/trip/${tripId}`)
    }

    render() {
        const { classes } = this.props;
        //TODO: delete all records with no creator
        const creator = this.props.trip.createdBy;
        return (
            <>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography>
                            Username: {creator ? creator.userName : "Ghost"}
                        </Typography>
                        <Typography>
                            Origin: {this.props.trip.legs[0].origin.city},{" "}
                            Destination: {this.props.trip.legs[0].destination.city}
                        </Typography>                        
                        <Typography>
                            Departure: <DateTime rawDate={this.props.trip.legs[0].departure}/>
                        </Typography>      
                        <Typography>
                            Arrival: <DateTime rawDate={this.props.trip.legs[0].arrival}/>
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

const WithRouter = withRouter(withStyles(styles)(SearchItem));

export default class SearchItemWithRouter extends React.Component<any, any> {
    render() {
        return <WithRouter {...this.props}/>
    }
}