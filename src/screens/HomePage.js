import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import ApplicationListSection from '../components/homepage/ApplicationListSection';
import AddAppplicationDialog from '../components/homepage/AddApplicationDialog';
import './screens.css';
import logo from '../assets/logo3.png'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
        }
        this.refreshOnAdd = this.refreshOnAdd.bind(this);
    }

    refreshOnAdd() {
        this.setState({
            counter: this.state.counter + 1,
        })
        console.log(this.state.counter)
    }

    render() {
        return (
            <div className='background'>
                <div className='homepage'>
                    <div >
                        <img className='logo' src={logo} alt='Interview Manager Logo'/>
                        </div>
                            <br></br>
                            <AddAppplicationDialog onSubmit={this.refreshOnAdd}/>
                        <div className='columnSection'>
                        <Grid container direction="column" justify="space-around" alignItems="center">
                            <br></br>
                            <ApplicationListSection/>
                        </Grid>
                    </div>
                </div> 
            </div>
        )
    }
}



export default HomePage