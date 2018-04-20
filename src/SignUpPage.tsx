import * as React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Button } from 'material-ui';

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
    }

    state: any = {
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        error: false,
        errorText: null
    };
    
    handleChange = (name:any) => (event:any) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitForm = async (mutate: any) => {
        try {
            const res = await mutate({
                variables: {input: {
                    email: this.state.email,
                    password: this.state.password
                }}
            })
            const data = res.data.signup;
            localStorage['HITCH_JWT'] = data.user.jwt;
            this.props.history.push('/list');
        } catch (error) {
            if(error.graphQLErrors != null && 
               error.graphQLErrors.some((e: any) => e.message === 'email already exists')){
                this.setState({
                    error: true,
                    errorText: 'Account alreay exists. Please login.'
                });
            }      
            else {
                this.setState({
                    error: true,
                    errorText: 'Something went wrong'
                });
            }      
        }
    }    

    render() {
        return(
            <Mutation mutation={mutation}>{(mutate) => {
                return(
                    <>
                        <form>
                            <TextField
                                error={this.state.error}                            
                                id="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                helperText={this.state.errorText}
                                fullWidth={true}
                                />
                            <br/>
                            <TextField
                                error={this.state.error}
                                id="password-input"
                                label="Password"
                                type="password"
                                margin="normal"
                                onChange={this.handleChange('password')}
                                helperText={this.state.errorText}
                                fullWidth={true}                                
                                />
                            <br/>
                            <TextField
                                error={this.state.error}
                                id="username"
                                label="Username"
                                margin="normal"
                                onChange={this.handleChange('username')}
                                helperText={this.state.errorText}
                                fullWidth={true}                                
                                />
                            <br/>
                            <TextField
                                error={this.state.error}
                                id="firstname"
                                label="First Name"
                                margin="normal"
                                onChange={this.handleChange('firstname')}
                                helperText={this.state.errorText}
                                fullWidth={true}                                
                                />
                            <br/>
                            <TextField
                                error={this.state.error}
                                id="lastname"
                                label="Last Name"
                                margin="normal"
                                onChange={this.handleChange('lastname')}
                                helperText={this.state.errorText}
                                fullWidth={true}                                
                                />                                                                                                
                            <br/>
                            <br/>
                            <Button variant="raised" onClick={() => this.submitForm(mutate)}>Submit</Button>
                        </form>
                    </>
                )
            }}
            </Mutation>
        )
    }
}