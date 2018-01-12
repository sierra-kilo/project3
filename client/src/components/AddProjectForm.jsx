import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const AddProjectForm = ({
  onSubmit,
  onChange,
  errors,
  project,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">New Project</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={project.name}
        />
      </div>


      <div className="button-line">
        <RaisedButton type="submit" label="Create New Project" primary />
      </div>

    </form>
  </Card>
);

AddProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

export default AddProjectForm;
