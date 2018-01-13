import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

function renderSettlement(settlement) {
  return (
    <li>
      {settlement.name}
    </li>
  );
}

const Dashboard = ({ secretData, settlementList }) => (

  <Card className="container">
    <CardTitle
      title="My Dashboard"
      subtitle="Welcome to your Settlement Dashboard."
    />
    {/* {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>} */}

    <ul>
      {settlementList && settlementList.map(renderSettlement)}
    </ul>
  </Card>

);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
  settlementList: PropTypes.array.isRequired
};

export default Dashboard;
