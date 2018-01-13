import React, { PropTypes } from 'react';
import AddSettlementForm from '../components/AddSettlementForm.jsx';


class AddSettlementPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      settlement: {
        firstName: '',
        lastName: '',
        defendant: '',
        settlementAmount: '',
        claimCategory: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeSettlement = this.changeSettlement.bind(this);
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
    const firmName = encodeURIComponent(this.state.settlement.firstName);
    const lastName = encodeURIComponent(this.state.settlement.lastName);
    const defendant = encodeURIComponent(this.state.settlement.defendant);
    const settlementAmount = encodeURIComponent(this.state.settlement.settlementAmount);
    const claimCategory = encodeURIComponent(this.state.settlement.claimCategory);

    const formData = `firstName=${firstName}&lastName=${lastName}&defendant=${defendant}&settlementAmount=${settlementAmount}&claimCategory=${claimCategory}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/addsettlement');
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
   * Change the settlement object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeSettlement(event) {
    const field = event.target.name;
    const settlement = this.state.settlement;
    settlement[field] = event.target.value;

    this.setState({
      settlement
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <AddSettlementForm
        onSubmit={this.processForm}
        onChange={this.changeSettlement}
        errors={this.state.errors}
        settlement={this.state.settlement}
      />
    );
  }

}

AddSettlementPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AddSettlementPage;
