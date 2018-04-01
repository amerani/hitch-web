import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation signup($input: SignUpInput!) {
        signup(input: $input) {
            user {
                jwt
            }
        }
    }
`

export default class SingUpPage extends React.Component<any, any> {
    constructor(props: any){
        super(props);
        this.state = { userExists: false }
    }

    async submitForm(event:any, mutate: any) {
        event.preventDefault();
        //TODO: validate before mutating
        try {
            const res = await mutate({variables: {
                input: {                
                    email: event.target['email'].value,
                    userName: event.target['userName'].value,
                    password: event.target['password'].value,
                    firstName: event.target['firstName'].value,
                    lastName: event.target['lastName'].value
                }
            }})
            const data = res.data.signup;
            localStorage["HITCH_JWT"] = data.user.jwt;
            this.props.history.push('/list');
        } catch (error) {
            if(error.graphQLErrors.some((e: any) => e.message === 'email already exists')){
                this.setState({ userExists: true });
            }
            console.log(error, error.graphQLErrors);            
        }
    }

    loginRedirect() {
        this.props.history.push('/login');
    }

    render() {
        return(
            <Mutation mutation={mutation}>{(mutate) => {
                return(
                    <>
                    <form onSubmit={(event) => this.submitForm(event, mutate)}>
                        <label>
                            Email
                            <input type="text" name="email"/>
                        </label><br/>
                        <label>
                            Password
                            <input type="text" name="password"/>
                        </label><br/>                     
                        <label>
                            UserName
                            <input type="text" name="userName"/>
                        </label><br/>                        
                        <label>
                            First Name
                            <input type="text" name="firstName"/>
                        </label><br/>                     
                        <label>
                            Last Name
                            <input type="text" name="lastName"/>
                        </label><br/>                                             
                        <button type="submit">SignUp</button>
                    </form>
                    {this.state.userExists 
                    ? <p> Account already exists <button onClick={() => this.loginRedirect()}>Login</button></p>
                    : null }
                    </>
                )
            }}
            </Mutation>
        )
    }
}