import * as React from 'react';
import MainContainer from '../containers/MainContainer';
import fetch from 'cross-fetch';
import { ClipLoader } from 'react-spinners';
import { className } from '../App';

function fetchCached (url) {
  return fetch(url.replace('https://api.github.com', 'https://hackathonbrn.lunatic.cat'));
}

export class Fetcher extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrgUsers = this.fetchOrgUsers.bind(this);
    window.fetchOrgUsers = this.fetchOrgUsers;
  }

  componentDidMount() {
    this.fetchOrgUsers();
    this.timeouts = [];
  };

  componentWillUnmount() {
    (this.timeouts || []).map(t => window.clearTimeout(t));
  };

  fetchOrgUsers() {
    fetchCached(`https://api.github.com/orgs/${this.props.organization}/members`)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(body => this.parseUsers(body))
      .catch(err => {
        this.props.changeOrganization(null)
      });
  };

  fetchData(url, login) {
    const { dataCountForUser } = this.props;
    const query = `?per_page=${dataCountForUser}`
    fetchCached(url + query)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(data => {
        this.props.changeUsersData(data, login)
      })
      .catch(err => {
        console.error(err);
      });
  };

  parseUsers(body) {
    this.props.changeUsersCount(body.length)
    const t = window.setTimeout(this.fetchOrgUsers, 60 * 1000);
    this.timeouts.push(t);
    body.forEach(item => {
      this.fetchData(item.url + '/events', item.login);
    });
  };

  render() {
    const { loading } = this.props;
    return (
      <div className={className()}>
        {
          loading
            ? <div className={className('loader')}>
              <ClipLoader
                sizeUnit={"px"}
                size={150}
                loading={loading}
              />
            </div>
            : <MainContainer />
        }
      </div>
    );
  }
};

export default Fetcher;
