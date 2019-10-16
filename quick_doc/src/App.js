import React, { useState, useEffect} from 'react';
import "rbx/index.css";
//import {Button,Container,Message, Title } from "rbx";
import firebase from 'firebase/app';
import 'firebase/database';
import {Container,Message, Title } from "rbx";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import {FormControl} from '@material-ui/core';
import {InputLabel} from '@material-ui/core'

const firebaseConfig = {
    apiKey: "AIzaSyCPlCnToFlfovuDUaAGesBUNLZw8DAxTnQ",
    authDomain: "quickdoc-8a808.firebaseapp.com",
    databaseURL: "https://quickdoc-8a808.firebaseio.com",
    projectId: "quickdoc-8a808",
    storageBucket: "quickdoc-8a808.appspot.com",
    messagingSenderId: "578559822014",
    appId: "1:578559822014:web:8e9fcfc524bea78ae4f6ef"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

// Won't be using this API for this slice, but for future reference if needed
// const docLocKey = 'e98def16c263c71592c3c2f74e24097a';
// const docLocUrl = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + docLocKey;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const QaWrapper = ({questions}) => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 400,
    },
  }));


  const [values, setValues] = React.useState({
    1: 'Cat in the Hat',
    2: '',
    3: 'Controlled',
    4: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return(
    <form className={classes.container} noValidate autoComplete="off">
      {
    //  <InputLabel htmlFor="select-multiple">question</InputLabel>
      questions.map(question =>
          <Select
            multiple
            value={[]}
            onChange={handleChange}
            
          >
          <MenuItem value="Select an Option">
          <em>Select Options</em>
          </MenuItem>
          
          <MenuItem value={question.answer[0]}>{question.answer[0]}</MenuItem>
          <MenuItem value={question.answer[1]}>{question.answer[1]}</MenuItem>
          <MenuItem value={question.answer[2]}>{question.answer[2]}</MenuItem>
      </Select>
      )
      }
    </form>
  )
}


const Questions =[
  {
    id: 1,
    question: 'What is your age?',
    answer :[
      '<10',
      '10-18',
      '18>30',
      '30-40',
      '40-60',
      '60-80',
      '80>'
    ],
    page: 1
  },
  {
    id: 2,
    question: 'Where do you feel uncomfortable on your body?',
    answer :[
      'head',
      'heart',
      'throat',
      'stomach',
      'legs',
      'arms'
    ],
    page: 2
  },
  {
    id: 3,
    question: 'What are your symptoms?',
    answer :[
      'fever',
      'sore throat',
      'sneezing',
      'inflammation',
    ],
    page: 3
  }
]


const Pagination = () =>{
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 255,
      maxWidth: 400,
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = Questions.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const questions = Questions.filter(question=>question.page === activeStep + 1)

  return (
    <div>
      {/* <Paper square elevation={0} className={classes.header}>
        <Typography>{Questions[activeStep].label}</Typography>
      </Paper>
      <div> */}
        {/* Q:{Questions[activeStep].question}
        <br></br>
        A:
        <input>
        </input>
      </div> */}
      <QaWrapper questions = {questions}/>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>

  )
}

const App =() => {

  const style ={
    marginTop: 40
  }
  return (
    <Container>
      <Title align="center" style = {style}>
        QuickDoc
      </Title>
      <Pagination/>
    </Container>
  );
}

export default App;