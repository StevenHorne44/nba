import './App.css'
import nbaLogo from './nba.png'

export default function Title({}) {


    return (                
        <div className='top'>            
            <img src={nbaLogo} className='nba-logo'/>
            <h1> NBA TEAM PICKER</h1>
        </div>                
    ) 
    
}