import React from 'react';
import Auth from '../modules/Auth';
import Ajax from '../modules/Ajax';
import Dashboard from '../components/Dashboard.jsx';

console.log(Auth.user);


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      settlementList: [],
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
   componentDidMount() {
    Ajax({
      url: '/api/settlements',
    }).then((settlementList) => {
      this.setState({
        settlementList
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
    return (<Dashboard secretData={this.state.secretData} settlementList={this.state.settlementList} />);
  }

}

export default DashboardPage;
