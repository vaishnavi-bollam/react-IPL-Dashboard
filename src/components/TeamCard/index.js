// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {name, id, teamImageUrl} = eachTeam
  //   console.log(name)
  return (
    <Link to={`/team-matches/${id}`}>
      <li className="team-container">
        <img src={teamImageUrl} className="teamimage" alt={name} />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
