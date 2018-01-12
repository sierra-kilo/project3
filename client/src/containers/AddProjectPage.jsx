import React, { PropTypes } from 'react';
import AddProjectForm from '../components/AddProjectForm.jsx';


class AddProjectPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      project: {
        name: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeProject = this.changeProject.bind(this);
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
    const name = encodeURIComponent(this.state.project.name);
    const formData = `name=${name}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/addproject');
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
   * Change the project object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeProject(event) {
    const field = event.target.name;
    const project = this.state.project;
    project[field] = event.target.value;

    this.setState({
      project
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <AddProjectForm
        onSubmit={this.processForm}
        onChange={this.changeProject}
        errors={this.state.errors}
        project={this.state.project}
      />
    );
  }

}

AddProjectPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AddProjectPage;
