import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'list',
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts: contacts })
    });
  }

  createContact(contact) {
    console.log("!");
    ContactsAPI.create(contact).then((contact) => {
      this.setState((oldState) => {
        return {
          contacts: oldState.contacts.concat([ contact ])
        };
      });
    });

  };

  deleteContact = (contact) => {
    this.setState((oldState) => {
      return {
        contacts: oldState.contacts.filter((i) => { return (i.id !== contact.id) })
      };
    });

    ContactsAPI.remove(contact);
  };

  render() {
    return (
        <div>
          <Route exact path="/" render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.deleteContact}
              onNavigate={() => { this.setState({ screen: 'create' }) }}
            />
          )} />
          <Route path="/create" render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )} />
        </div>
    );
  }
}

export default App;
