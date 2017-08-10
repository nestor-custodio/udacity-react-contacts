import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts: contacts })
    });
  }

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
        <ListContacts contacts={this.state.contacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;
