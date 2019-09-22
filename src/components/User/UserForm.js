import React, { Component } from "react";
import { Form, Container } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

class UserForm extends Component {

    render () {
        const { info, handleChange } = this.props;
        const {
            birthday,
            username,
            firstname,
            lastname,
            email,
            phone,
            address,
            document,
        } = info;
        return (
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Input
                            name="username"
                            label="Username"
                            placeholder="Username"
                            onChange={ handleChange }
                            width={6}
                            value={ username || "" }
                            required
                        />
                        <Form.Input
                            name="firstname"
                            label="First Name"
                            placeholder="First Name"
                            onChange={ handleChange }
                            value={ firstname || "" }
                            width={ 5 }
                            required
                        />
                        <Form.Input
                            name="lastname"
                            label="Last Name"
                            placeholder="Last Name"
                            onChange={ handleChange }
                            value={ lastname || "" }
                            width={ 5 }
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name="birthday"
                            control={ DateInput }
                            label="Birthday"
                            placeholder="Birthday"
                            onChange={ handleChange }
                            value={ birthday || "" }
                            width={ 5 }
                            closable
                            initialDate="01-01-2000"
                        />
                        <Form.Input
                            name="email"
                            label="Email"
                            placeholder="Email"
                            onChange={ handleChange }
                            value={ email || "" }
                            width={ 6 }
                            type="email"
                            required
                        />
                        <Form.Input
                            name="phone"
                            label="Phone"
                            placeholder="Phone"
                            onChange={ handleChange }
                            value={ phone || "" }
                            width={ 5 }
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            name="address"
                            label="Address"
                            placeholder="Address"
                            onChange={ handleChange }
                            value={ address || "" }
                            width={ 8 }
                        />
                        <Form.Input
                            name="document"
                            label="Document"
                            placeholder="Document"
                            onChange={ handleChange }
                            value={ document || "" }
                            width={ 8 }
                            required
                        />
                    </Form.Group>
                </Form>
            </Container>
        );
    }

}

export default UserForm;