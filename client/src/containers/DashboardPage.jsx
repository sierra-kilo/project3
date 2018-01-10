import React from 'react';
import Auth from '../modules/Auth';
import Ajax from '../modules/Ajax';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      projectList: [],
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
   componentDidMount() {
    Ajax({
      url: '/api/projects',
    }).then((projectList) => {
      this.setState({
        projectList
      })
    })

    Ajax({
      url: '/api/dashboard',
    }).then((data) => {
      this.setState({
        secretData: data.message
      });
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData} projectList={this.state.projectList} />);
  }

}

export default DashboardPage;
