// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {isLoader: true, teamList: []}

  componentDidMount() {
    this.getteamDetails()
  }

  getteamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const getDetailsfromResponse = await response.json()
    // console.log(getDetailsfromResponse)
    const {teams} = getDetailsfromResponse
    const getteamList = teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))
    console.log(getteamList)

    this.setState({teamList: getteamList, isLoader: false})
  }

  render() {
    const {isLoader, teamList} = this.state
    return isLoader ? (
      <div>
        <Loader ype="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    ) : (
      <div className="main-bg">
        <div>
          <div className="ipl-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              className="image"
              alt="ipl logo"
            />
            <h1>IPL DASHBOARD</h1>
          </div>
          {isLoader ? (
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          ) : (
            <ul>
              {teamList.map(eachTeam => (
                <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
