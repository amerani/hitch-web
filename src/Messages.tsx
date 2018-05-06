import * as React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import SearchItem, { fragment } from './SearchItem';

const sub:any = gql`
  subscription tripCreated {
    tripCreated {
      ...SearchTrip
    }
  }
  ${fragment}
`

export default class Messages extends React.Component<any,any> {
  messages: any = []
  render() {
    return (  
      <Subscription subscription={sub}>
      {({loading, data, error}) => {
        if(!loading) {
          this.messages.push(data.tripCreated)
        }
        return (
          <>
            {loading 
              ? <p>Loading</p>
              : this.messages.map((msg:any) =>
                  <React.Fragment key={msg.id}>
                    <h4>{msg.__typename} Created</h4>
                    <SearchItem trip={msg} />
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