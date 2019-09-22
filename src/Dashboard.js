import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

import { UserTable } from "./components/User";


const style = {
    h1: {
        marginTop: "2em",
    },
};

class Dashboard extends Component {

    render () {
        return (
            <div>
                <Header as="h1" content="Users Dashboard" style={ style.h1 } textAlign="center" />
                <Container>
                    <UserTable/>
                </Container>
            </div>
        );
    }

}

export default Dashboard;