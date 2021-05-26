import React from 'react';
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import '../components.css';

export default function AddApplicationDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [sent, setSent] = React.useState(true);

  const handleSubmit = async () => {
    const request = {
      method : "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: 'Placeholder user',
        title: title,
        company: company,
        resume: sent,
      })
    };
    //await fetch('https://cors-anywhere.herokuapp.com/https://interviewmanagerapi.herokuapp.com/api/add-application', request)
    await fetch('http://127.0.0.1:8000/api/add-application', request)
      .then((response) => response.json())
      .then((data) => console.log(data))
    handleClose();
    props.onSubmit();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCompanyChange = (e) => {
    setCompany(e.target.value)
  }

  const handleSentChange = (e) => {
    setSent(e.target.value == 'true' ? true : false)
  }

  return (
    <div>
      <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
        Add Application
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Job Application</DialogTitle>
        <DialogContent>
            <Grid container direction="column" justify="center" alignItems='center'>
            <br></br>
            <FormControl>
                <TextField label="Job Title" variant="outlined" required={true} type={title} defaultValue='' onChange={handleTitleChange}/>
            </FormControl>
            <br></br>
            <FormControl>
                <TextField label="Company" variant="outlined" required={true} type={company} defaultValue='' onChange={handleCompanyChange}/>
            </FormControl>
            <br></br>
            <FormControl componment='fieldset'>
                <RadioGroup row defaultValue='true' onChange={handleSentChange}>
                    <FormControlLabel value='true' control={<Radio color='primary'/>} label='Resume Sent' labelPlacement='bottom'/>
                    <FormControlLabel value='false' control={<Radio color='secondary'/>} label='Resume Not Sent' labelPlacement='bottom'/>
                </RadioGroup>
            </FormControl>
            <br></br>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}