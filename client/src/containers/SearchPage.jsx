import React, { PropTypes } from 'react';
import SearchForm from '../components/SearchForm.jsx';


class SearchPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      search: {
        value: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const value = encodeURIComponent(this.state.search.value);
    const formData = `value=${value}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/search');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // set a message
        localStorage.setItem('successMessage', xhr.response.message);

        // make a redirect
        this.context.router.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the search object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeSearch(event) {
    const field = event.target.name;
    const search = this.state.search;
    search[field] = event.target.value;

    this.setState({
      search
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SearchForm
        onSubmit={this.processForm}
        onChange={this.changeSearch}
        errors={this.state.errors}
        search={this.state.search}
      />
    );
  }

}

SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchPage;
