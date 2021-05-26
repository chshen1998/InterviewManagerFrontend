import React from 'react';
import {Grid} from '@material-ui/core';
import '../components.css';

export default function DateTile(props) {
    const [datetime] = React.useState(props.date);

    const getMonth = (m) => {
        switch (m) {
            case '01':
                return 'Jan';
            case '02':
                return 'Feb';
            case '03':
                return 'Mar';
            case '04':
                return 'Apr';
            case '05':
                return 'May';
            case '06':
                return 'Jun';
            case '07':
                return 'Jul';
            case '08':
                return 'Aug';
            case '09':
                return 'Sep';
            case '10':
                return 'Oct';
            case '11':
                return 'Nov';
            default:
                return 'Dec';
        }
    }

    const getReadableDate = () => {
        const date = datetime.split('T')[0].split('-')
        const month = getMonth(date[1])
        return date[2] + ' ' + month + ' ' + date[0]
    }

    const getHour = (h) => {
        const hourInt = parseInt(h)
        const hour = hourInt > 12 ? hourInt - 12 : hourInt
        return hour.toString()  
    }
    
    const getReadableTime = () => {
        const time = datetime.split('T')[1].split(':')
        const symbol = parseInt(time[0]) > 12 ? 'PM' : 'AM'
        const hour = getHour(time[0])
        return hour + ":" + time[1] + ' ' + symbol
    }

    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <p className='date'>{getReadableDate()}</p>
                <p className='time'>{getReadableTime()}</p>
            </Grid>
        </div>
          
    );

}