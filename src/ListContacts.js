import React from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends React.Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  state = {
    query: ""
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  };

  render() {
    let showingContacts
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      showingContacts = this.props.contacts.filter((i) => { return match.test(i.name) });
    }
    else {
      showingContacts = this.props.contacts;
    }
    showingContacts.sort(sortBy('name'));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input type="text"
                 className="search-contacts"
                 placeholder="Search contacts"
                 value={this.state.query}
                 onChange={(e) => { this.updateQuery(e.target.value); }} />
          <a href="#create"
             onClick={this.props.onNavigate}
             className="add-contact"
          >Add Contact</a>
        </div>

        {(this.props.contacts.length !== showingContacts.length) && (
          <div className='showing-contacts'>
            <span>Now Showing {showingContacts.length} of {this.props.contacts.length}</span>
            <button onClick={() => { this.updateQuery('') }}>Show All</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}>
              </div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className='contact-remove'
                      onClick={() => { this.props.onDeleteContact(contact) }}>Remove</button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;
