import * as React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const sub:any = gql`
  subscription tripCreated {
    tripCreated {
      id
      legs {
        origin { city }
      }
    }
  }
`

export default class Messages extends React.Component<any,any> {
  render() {
    return (  
      <Subscription subscription={sub}>
      {({loading, data, error}) => {
        return (
          <>
            {loading 
              ? <p>Loading</p>
              : JSON.stringify(data.tripCreated)
            }
          </>
        )
      }}
      </Subscription>
    )
  }
}