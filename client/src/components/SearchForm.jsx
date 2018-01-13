import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SearchForm = ({
  onSubmit,
  onChange,
  errors,
  search,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Search</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Search"
          name="search"
          errorText={errors.search}
          onChange={onChange}
          value={search.value}
        />
      </div>

      <div className="button-line">
        {/* <RaisedButton type="submit" label="Search" primary /> */}
        {/* change to button later */}
        <Link to="/"><RaisedButton type="submit" label="Search" primary /></Link>
      </div>

    </form>
  </Card>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
};

export default SearchForm;
