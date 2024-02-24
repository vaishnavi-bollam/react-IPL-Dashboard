// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch/index'
import MatchCard from '../MatchCard/index'
import './index.css'

class TeamMatches extends Component {
  state = {eachTeam: {}, isLoader: true}

  componentDidMount() {
    this.getEachTeam()
  }

  getEachTeam = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const eachTeamObject = await response.json()
    // console.log(eachTeamObject)

    const updatedData = {
      teamBannerUrl: eachTeamObject.team_banner_url,
      recentMatches: eachTeamObject.recent_matches,
      latestMatchDetails: eachTeamObject.latest_match_details,
    }
    // console.log(updatedData.latestMatchDetails)
    this.setState({eachTeam: updatedData, isLoader: false})
  }

  render() {
    const {eachTeam, isLoader} = this.state
    const {teamBannerUrl, recentMatches, latestMatchDetails} = eachTeam
    console.log(recentMatches)

    return isLoader ? (
      <div>
        <Loader ype="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    ) : (
      <div className="teamMatchBg">
        <img src={teamBannerUrl} alt="team banner" />
        <LatestMatch latestMatchDetailsObj={latestMatchDetails} />
        <ul className="ulList">
          {recentMatches.map(eachRecent => (
            <MatchCard eachObject={eachRecent} key={eachRecent.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
