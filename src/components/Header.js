import React from 'react';
import getJWT from './authHelper';
import { Link } from 'react-router-dom';
import history from './../history';

class Header extends React.Component {
    state = {loggedin: ''}
    
    componentDidMount(){
        const jwt = getJWT();
       
        if(jwt){
            this.setState({loggedin: true});
        }
    }

    onLogOut = () => {
        localStorage.removeItem('jwtToken');
        this.setState({loggedin:''});
        history.push('/');
    }

    render(){
        return (
            <div className="ui secondary pointing menu" style={{margin: "0", borderBottom:"1px solid rgba(34,36,38,.15"}}>
                <div className="ui container">
                    <Link to='/' className="item">
                        All Tours
                    </Link>
                    <Link to='/topfivecheap' className="item">
                        Top Five Cheapest Tours
                    </Link>  
                    <div className="right menu">
                        <Link to='/userprofile' className="item" style={this.state.loggedin ? {display: "inline"}:{display: "none"}} >
                            Your Account
                        </Link>
                        <Link to='/signup' className="item" style={this.state.loggedin ? {display: "none"}:{display: "inline"}} >
                            Sign Up
                        </Link>
                        {this.state.loggedin ? <button onClick={this.onLogOut} className="ui button basic item">Logout</button> : <Link to='/login' className="item">Login</Link> }
                    </div>
                </div>
            </div>          
        )
    }
}

export default Header;