import React from 'react';
import Typography from '@material-ui/core/Typography';
import HistoryList from './HistoryList';
import {useSelector} from 'react-redux';

const History = () => {
    const list = useSelector(state => state.history.history);
    return (
        <div>
            <Typography style={{textAlign: 'center'}} variant='h5'>
                سوابق تدریس آموزگار
            </Typography>
            <HistoryList list={list}/>
        </div>
    );
};

export default History;
