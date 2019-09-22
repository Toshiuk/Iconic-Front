import React, { Component } from "react";
import { Button, Icon, Table, Modal, Header } from "semantic-ui-react";
import { UserForm } from "./";
import moment from "moment";

import { api } from "../../services";

const initialStateInfo = {
    username: null,
    firstname: null,
    lastname: null,
    birthday: null,
    email: null,
    phone: null,
    address: null,
    document: null
};

const userFormViewInit = {
    title: "View",
    icon: "search",
    button: "",
    change: false
};

const userFormEditInit = {
    title: "Edit",
    icon: "edit",
    button: "Edit",
    submit: "edit",
    change: true
};

const userFormAddInit = {
    title: "Add",
    icon: "user",
    button: "Add",
    submit: "add",
    change: true
};

class UserTable extends Component {

    constructor ( props ) {
        super( props );

        this.state = {
            users: [],
            userForm: false,
            userEditId: "",
            modalError: "",
            modalDelete: false,
            info: { ...initialStateInfo }
        };
    }

    handleChange = ( event, { name, value } ) => {
        const info = this.state.info;
        info[ name ] = value;
        this.setState({ [ name ]: value });
    }

    componentWillMount () {
        api.get( "/api/v1/users" )
            .then( response => {
                this.setState({ users: response.data.data });
            })
            .catch( err => console.log( err.msg ) );
    }

    submitAddForm = () => {
        const { info, users } = this.state;
        api.post( "/api/v1/users", { info } )
            .then( response => {
                users.push( response.data.data );
                this.setState({
                    users,
                    info: { ...initialStateInfo },
                    userForm: false,
                });
                this.toggleAddUserForm();
            })
            .catch( error => {
                const errorMessage = error.response.data ? error.response.data.description : "";
                this.setState({ modalError: errorMessage });
            } );
    }

    submitEditForm = () => {
        const { info, userEditId } = this.state;
        let { users } = this.state;
        api.put( `/api/v1/users/${ userEditId }`, { info } )
            .then( () => {
                users = users.map( user => {
                    if ( user._id === userEditId ) {
                        user.info = info;
                        return user;
                    }
                    return user;

                } );
                this.setState({
                    users,
                    info: { ...initialStateInfo },
                    userForm: false,
                    userEditId: ""
                });
            })
            .catch( error => {
                const errorMessage = error.response.data ? error.response.data.description : "";
                this.setState({ modalError: errorMessage });
            } );
    }

    deleteUser = () => {
        const { modalDelete, users } = this.state;
        api.delete( `/api/v1/users/${ modalDelete._id }` )
            .then( () => {
                this.setState({
                    modalDelete: false,
                    users: users.filter( user => user._id !== modalDelete._id )
                });
            })
            .catch( error => console.log( error ) );
    }

    toggleAddUserForm = () => this.setState({ addUserForm: !this.state.addUserForm });

    submitForm = submitType => {
        if ( submitType === "edit" ) {
            this.submitEditForm();
        } else if ( submitType === "add" ) {
            this.submitAddForm();
        }
    }

    renderUsers = users => {
        return users.map( ( user, index ) =>
            <Table.Row key={ `user_row_${index}` } >
                <Table.Cell>{ user._id }</Table.Cell>
                <Table.Cell>{ `${ user.info.firstname } ${ user.info.lastname }` }</Table.Cell>
                <Table.Cell>{ user.info.phone }</Table.Cell>
                <Table.Cell>{ moment( user.createdAt ).format( "MM/DD/YYYY h:mm a" ) }</Table.Cell>
                <Table.Cell textAlign="center" singleLine>
                    <Button.Group>
                        <Button
                            onClick={ () => this.setState({
                                userForm: userFormViewInit,
                                info: { ...user.info }
                            }) }
                            size="small"
                            animated="fade"
                            info
                        >
                            <Button.Content visible>
                                <Icon name="search" />
                            </Button.Content>
                            <Button.Content hidden>
                              View
                            </Button.Content>
                        </Button>
                        <Button
                            onClick={ () => this.setState({
                                userForm: userFormEditInit,
                                info: { ...user.info },
                                userEditId: user._id
                            }) }
                            size="small"
                            animated="fade"
                            positive
                        >
                            <Button.Content visible>
                                <Icon name="edit" />
                            </Button.Content>
                            <Button.Content hidden>
                              Edit
                            </Button.Content>
                        </Button>
                        <Button
                            onClick={ () => this.setState({ modalDelete: user }) }
                            size="small"
                            animated="fade"
                            negative
                        >
                            <Button.Content visible>
                                <Icon name="delete" />
                            </Button.Content>
                            <Button.Content hidden>
                              Delete
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    }

    render () {
        const { users, userForm, info, modalError, modalDelete } = this.state;

        return (
            <div>
                <Table celled compact definition selectable>
                    { userForm &&
                      <Modal open={ !!userForm }>
                          <Header icon={ userForm.icon } content={`User ${ userForm.title }`} />
                          <Modal.Content>
                              <Modal.Description>
                                  <UserForm
                                      handleChange={ userForm.change ? this.handleChange : () => {} }
                                      info={ info }
                                  />
                              </Modal.Description>
                          </Modal.Content>

                          <Modal.Actions>
                              { ( userForm.button && userForm.submit ) &&
                                <Button
                                    primary
                                    content={ userForm.button }
                                    onClick={ () => this.submitForm( userForm.submit ) }
                                />
                              }
                              <Button
                                  content="Close"
                                  onClick={ () =>
                                      this.setState({
                                          userForm: false,
                                          info: { ...initialStateInfo }
                                      })
                                  }
                              />
                          </Modal.Actions>
                      </Modal>
                    }

                    <Modal
                        open={ !!modalError }
                        size="small"
                    >
                        <Modal.Header>Error</Modal.Header>
                        <Modal.Content>
                            <p>{ modalError }</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                warning
                                content="Close"
                                onClick={ () => this.setState({ modalError: "" })}
                            />
                        </Modal.Actions>
                    </Modal>

                    { modalDelete &&
                      <Modal
                          open={ !!modalDelete }
                          size="small"
                      >
                          <Modal.Header>Delete User</Modal.Header>
                          <Modal.Content>
                              <p>
                                  { `Are you sure to delete 
                                  ${ modalDelete.info.firstname } ${ modalDelete.info.lastname } ?`}
                              </p>
                          </Modal.Content>
                          <Modal.Actions>
                              <Button negative content="Delete" onClick={ this.deleteUser } />
                              <Button
                                  content="Close"
                                  onClick={ () => this.setState({ modalDelete: false }) }
                              />
                          </Modal.Actions>
                      </Modal>
                    }

                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Phone Number</Table.HeaderCell>
                            <Table.HeaderCell>Registration Date</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">Show/Edit/Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.renderUsers( users ) }
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan="4">
                                <Button
                                    floated="right"
                                    icon
                                    labelPosition="left"
                                    primary
                                    size="small"
                                    onClick={ () => this.setState({ userForm: userFormAddInit }) }
                                >
                                    <Icon name="user" /> Add User
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }

}

export default UserTable;