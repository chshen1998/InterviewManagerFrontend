import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import ApplicationCard from './ApplicationCard';
import '../components.css';


class ApplicationListSection extends Component {
    state = {
        applicationList: [],
        isLoading: true,
    }

    async componentDidMount() {
        //const url = 'https://cors-anywhere.herokuapp.com/https://interviewmanagerapi.herokuapp.com/api/get-applications'
        //await fetch(url)
        await fetch('http://127.0.0.1:8000/api/get-applications')
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((result) => this.setState({
                        applicationList: result,
                        isLoading: false,
                    }))
                } else {
                    console.log('API call failed')
                    this.setState({isLoading: false})
                }
            })
    }

    render() {
        console.log(this.state.applicationList)
        if (this.state.isLoading) {
            return (
                <div className='listSection'>
                    <div  className='loadingList'>
                        <p>Loading...</p>
                    </div>
                </div>
            )   
        } else {
            const listToDisplay = this.state.applicationList.map(application => 
                <ApplicationCard id={application.id} title={application.title} company={application.company} resume={application.resume} 
                interview={application.interview} date={application.date} result={application.result}/>
            )
            return (
                <div className='listSection'>
                    <Grid container direction="column" justify="center" alignItems='center'>
                        <Grid container direction="row" justify="space-around" alignItems='center'>
                            <div className='titleTile'><p className='columnHeader'>Title</p></div>
                            <div className='companyTile'><p className='columnHeader'>Company</p></div>
                            <div className='statusTile'><p className='columnHeader'>Resume</p></div>
                            <div className='statusTile'><p className='columnHeader'>Interview</p></div>
                            <div className='statusTile'><p className='columnHeader'>Result</p></div>                          
                            <div className='statusTile'></div>
                        </Grid>
                        <div className='appliedList'>
                            {listToDisplay}
                        </div>
                    </Grid>
                </div>
            )
        }
    }
}

export default ApplicationListSection