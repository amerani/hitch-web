import * as React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const sub:any = gql`
  subscription {
    notification {
      ... on Trip { id }
      ... on Leg { id }
      ... on Reservation { id }
    }
  }
`

export default class Messages extends React.Component<any,any> {
  messages: any = []
  render() {
    return (  
      <Subscription subscription={sub}>
      {({loading, data, error}) => {
        if(!loading) {
          this.messages.push(data.notification)
        }
        return (
          <>
            {loading 
              ? <p>Loading</p>
              : this.messages.map((msg:any) =>
                  <React.Fragment key={msg.id}>
                    <h4>{msg.__typename} Created</h4><span>with ID {msg.id}</span>
                  </React.Fragment>
                )
            }
          </>
        )
      }}
      </Subscription>
    )
  }
}