import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import '../components.css';
import DateTile from './DateTile';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from '@material-ui/icons/Edit';

class ApplicationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            company: this.props.company,
            resume: this.props.resume,
            interview: this.props.interview,
            result: this.props.result,
            date: this.props.date,

            open: false,
            newTitle: this.props.title,
            newCompany: this.props.company,
            newResume: this.props.resume,
            newInterview: this.props.interview,
            newResult: this.props.result,
            newDate: this.props.date == null ? new Date() : this.props.date,
        }
        this.deleteApplication = this.deleteApplication.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResumeChange = this.handleResumeChange.bind(this);
        this.handleInterviewChange = this.handleInterviewChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleResultChange = this.handleResultChange.bind(this);
        this.getReadableDate = this.getReadableDate.bind(this);
    }

    async deleteApplication() {
        const request = {
            method : "DELETE"
        };
        //await fetch('https://cors-anywhere.herokuapp.com/https://interviewmanagerapi.herokuapp.com/api/delete-application?code=' + this.state.id, request)
        await fetch('http://127.0.0.1:8000/api/delete-application?id=' + this.state.id, request)
        .then((response) => response.json())
        .then((data) => console.log(data))
    }

    async handleSubmit() {
        const request = {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: this.state.newTitle,
              company: this.state.newCompany,
              resume: this.state.newResume,
              interview: this.state.newInterview,
              date: this.state.newDate,
              result: this.state.newResult
            })
          };
          //await fetch('https://cors-anywhere.herokuapp.com/https://interviewmanagerapi.herokuapp.com/api/update-application?id=' + this.state.id, request)
          await fetch('http://127.0.0.1:8000/api/update-application?id=' + this.state.id, request)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => this.setState({
                        open: false,
                        title: data.title,
                        company: data.company,
                        resume: data.resume,
                        interview: data.interview,
                        date: data.date,
                        result: data.result,
                    }))
                } else {
                    response.json().then((data) => console.log(data))
                    console.log('API call failed')
                    this.setState({open: false})
                }
            })
    }
    handleOpen() {
        this.setState({open: true})
    }
    handleClose() {
        this.setState({
            open: false,
            newTitle: this.state.title,
            newCompany: this.state.company,
            newResume: this.state.resume,
            newInterview: this.state.interview,
            newResult: this.state.result,
            newDate: this.state.date,
        })
    }
    handleTitleChange(e) {
        this.setState({newTitle: e.target.value})
    }
    handleCompanyChange(e) {
        this.setState({newCompany: e.target.value})
    }
    handleResumeChange(e) {
        this.setState({newResume: e.target.value == 'true' ? true : false})
    }
    handleInterviewChange(e) {
        this.setState({newInterview: e.target.value == 'true' ? true : false})
    }
    handleDateChange(e) {
        this.setState({newDate: e.target.value})
    }
    handleResultChange(e) {
        this.setState({newResult: e.target.value})
    }

    getReadableDate() {
        if (this.state.date != null) {
            const split = this.state.date.split('T')
            const date = split[0].split('-')
            const time = split[1].split(':')
            const datetime = date[2] + '/' + date[1] + '/' + date[0] + ' ' + time[0] + ':' + time[1]
            console.log(datetime)
            return datetime
        }
    }

    render() {
        //this.getReadableDate();
        const EditApplicationDialog =
        <div>
            <IconButton aria-label="Edit" onClick={this.handleOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Application</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center" alignItems='center'>
                        <br></br>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <FormControl>
                                <TextField label="Job Title" variant="outlined" defaultValue={this.state.newTitle} onChange={this.handleTitleChange}/>
                            </FormControl>
                            <div className='emptyTile'></div>
                            <FormControl>
                                <TextField label="Company" variant="outlined" defaultValue={this.state.newCompany} onChange={this.handleCompanyChange}/>
                            </FormControl>
                        </Grid>
                        <br></br>
                        <FormControl componment='fieldset'>
                        <FormHelperText><div align='center'>Resume</div></FormHelperText>
                            <RadioGroup row defaultValue={this.state.newResume.toString()} onChange={this.handleResumeChange}>
                                <FormControlLabel value='true' control={<Radio color='primary'/>} label='Sent' labelPlacement='bottom'/>
                                <FormControlLabel value='false' control={<Radio color='secondary'/>} label='Not Sent' labelPlacement='bottom'/>
                            </RadioGroup>
                        </FormControl>
                        <br></br>
                        <FormControl componment='fieldset'>
                            <FormHelperText><div align='center'>Interview</div></FormHelperText>
                            <RadioGroup row defaultValue={this.state.newInterview.toString()} onChange={this.handleInterviewChange}>
                                <FormControlLabel value='true' control={<Radio color='primary'/>} label='Done' labelPlacement='bottom'/>
                                <FormControlLabel value='false' control={<Radio color='secondary'/>} label='Not Done' labelPlacement='bottom'/>
                            </RadioGroup>
                        </FormControl>
                        <br></br>
                        <form noValidate>
                            <TextField
                                id="datetime-local"
                                label="Interview time"
                                type="datetime-local"
                                defaultValue={this.state.newDate}
                                onChange={this.handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        <br></br>
                        <FormControl componment='fieldset'>
                            <FormHelperText><div align='center'>Result</div></FormHelperText>
                            <RadioGroup row defaultValue={this.state.newResult} onChange={this.handleResultChange}>
                                <FormControlLabel value='NO' control={<Radio color='default'/>} label='None' labelPlacement='bottom'/>
                                <FormControlLabel value='AC' control={<Radio color='primary'/>} label='Accepted' labelPlacement='bottom'/>
                                <FormControlLabel value='RE' control={<Radio color='secondary'/>} label='Rejected' labelPlacement='bottom'/>
                            </RadioGroup>
                        </FormControl>
                        <br></br>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

        const resumeStatus = this.state.resume ? <p className='positiveText'>Sent</p> : <p className='negativeText'>Not Sent</p>
        const interviewStatus = this.state.interview ? <p className='positiveText'>Done</p> : (this.state.date == null ? <p>-</p> : <DateTile date={this.state.date}/>)
        const resultStatus = this.state.result=='NO' ? <p>-</p> : (this.state.result=='AC' ? <p className='positiveText'>Accepted</p> : <p className='negativeText'>Rejected</p>)
        
        return (
            <div className='appliedCard'>
                <Grid container direction="row" justify="space-around" alignItems='center'>
                    <div className='titleTile'><p>{this.state.title}</p></div>
                    <div className='companyTile'><p>{this.state.company}</p></div>
                    <div className='statusTile'>{resumeStatus}</div>
                    <div className='statusTile'>{interviewStatus}</div>
                    <div className='statusTile'>{resultStatus}</div>
                    <div className='statusTile'>
                        {EditApplicationDialog}
                        <IconButton aria-label="Move" onClick={this.deleteApplication}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Grid>
            </div>
        )
    }
}

export default ApplicationCard