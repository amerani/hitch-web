import * as React from 'react';
import gql from 'graphql-tag';
import { Card, CardContent, Typography } from 'material-ui';

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

export default class SearchItem extends React.Component<any, any> {
    constructor(props:any){
        super(props);
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
                </Card>
            </>
        ) 
    }
}