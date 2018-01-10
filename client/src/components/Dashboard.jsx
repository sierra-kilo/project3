import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

function renderProject(project) {
  return (
    <li>
      {project.name}
    </li>
  );
}

const Dashboard = ({ secretData, projectList }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />
    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}

    <ul>
      {projectList && projectList.map(renderProject)}
    </ul>
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired,
  projectList: PropTypes.array.isRequired
};

export default Dashboard;
