import * as React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation login($input: LoginInput!){
        login(input:$input) {
            user {
                jwt
            }
        }
    }
`

export default class LogInPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
    }

    async submitForm(event:any, mutate: any) {
        event.preventDefault();
        try {
            const res = await mutate({
                variables: {input: {
                    email: event.target['email'].value,
                    password: event.target['password'].value
                }}
            })
            const data = res.data.login;
            localStorage['HITCH_JWT'] = data.user.jwt;
            this.props.history.push('/list');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Mutation mutation={mutation}>{
                (mutate) => {
                    return (
                        <form onSubmit={(event) => this.submitForm(event, mutate)}>
                            <label>
                                Email
                                <input type="text" name="email"/>
                            </label><br/>
                            <label>
                                Password
                                <input type="text" name="password"/>
                            </label><br/>
                            <button type="submit">Submit</button>
                        </form>
                    )
                }
            }
            </Mutation>
        )
    }
}