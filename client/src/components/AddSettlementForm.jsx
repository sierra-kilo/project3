import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const AddSettlementForm = ({
  onSubmit,
  onChange,
  errors,
  settlement,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">New Settlement</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstName"
          errorText={errors.firstName}
          onChange={onChange}
          value={settlement.firstName}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastName"
          errorText={errors.lastName}
          onChange={onChange}
          value={settlement.lastName}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Defendant"
          name="defendant"
          errorText={errors.defendant}
          onChange={onChange}
          value={settlement.defendant}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Settlement Amount"
          name="settlementAmount"
          errorText={errors.settlementAmount}
          onChange={onChange}
          value={settlement.settlementAmount}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Claim Category"
          name="claimCategory"
          errorText={errors.claimCategory}
          onChange={onChange}
          value={settlement.claimCategory}
        />
      </div>


      <div className="button-line">
        {/* <RaisedButton type="submit" label="Create New Settlement" primary /> */}
        {/* change to button later */}
        <Link to="/"><RaisedButton type="submit" label="Create New Settlement" primary /></Link>
      </div>

    </form>
  </Card>
);

AddSettlementForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  settlement: PropTypes.object.isRequired
};

export default AddSettlementForm;
