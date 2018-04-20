import * as React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Button } from 'material-ui';

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

    state: any = {
        email: '',
        password: '',
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
            const data = res.data.login;
            localStorage['HITCH_JWT'] = data.user.jwt;
            this.props.history.push('/list');
        } catch (error) {
            this.setState({
                error: true,
                errorText: 'Incorrect Email or Password'
            });
        }
    }

    render() {
        return (
            <Mutation mutation={mutation}>{
                (mutate) => {
                    return (
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
                            <br/>
                            <Button variant="raised" onClick={() => this.submitForm(mutate)}>Submit</Button>
                        </form>
                    )
                }
            }
            </Mutation>
        )
    }
}