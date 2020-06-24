import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import {useSelector} from 'react-redux';


function PrintContent() {
    const user = useSelector(state => state.user.user.user);
    const questions = useSelector(state => state.form.questions);

    let sumEmtiazKarbar = 0;
    let sumEmtiazKarshenas = null;

    questions
        .forEach(q => {
            sumEmtiazKarbar += q.emtiaz_karbar;
            if (q.taeed_karshenas)
                sumEmtiazKarshenas += q.emtiaz_karshenas;
        });


    return (
        <>
            <form style={{display: 'flex', justifyContent: 'space-around'}}
                  noValidate autoComplete="off">
                <TextField
                    style={{margin: 8, width: '35ch'}}
                    label="کد پرسنلی"
                    defaultValue={user.profile.personnel_code}
                    variant='outlined'
                    InputProps={{readOnly: true}}
                    inputProps={{style: {textAlign: 'center', direction: 'ltr', letterSpacing: 7}}}/>
                <TextField
                    style={{margin: 8, width: '35ch'}}
                    label="نام و نام خانوادگی"
                    defaultValue={`${user.first_name} ${user.last_name}`}
                    variant='outlined'
                    InputProps={{readOnly: true}}
                    inputProps={{style: {textAlign: 'center'}}}/>
                <TextField
                    style={{margin: 8, width: '35ch'}}
                    label="کد ملی"
                    defaultValue={user.national_id}
                    variant='outlined'
                    InputProps={{readOnly: true}}
                    inputProps={{style: {textAlign: 'center', direction: 'ltr', letterSpacing: 7}}}/>
            </form>
            <TableContainer component={Paper} style={{marginTop: 24}}>
                <Table size='small' style={{minWidth: 650}}>
                    <TableBody>
                        <TableRow style={{backgroundColor: '#eee'}}>
                            <TableCell align='left'>#</TableCell>
                            <TableCell align="center">عنوان</TableCell>
                            <TableCell align="center">امتیاز حساب شده توسط کاربر</TableCell>
                            <TableCell align="center">امتیاز تایید شده توسط کارشناس</TableCell>
                        </TableRow>
                        {
                            questions
                                .map((q, index) => (
                                    <TableRow key={q.id}>
                                        <TableCell align='left'>{index + 1}</TableCell>
                                        <TableCell align='center'>{q.onvan}</TableCell>
                                        <TableCell align='center'>{q.emtiaz_karbar}</TableCell>
                                        <TableCell align='center'>
                                            {q.taeed_karshenas ? q.emtiaz_karshenas : 'نامشخص'}
                                        </TableCell>

                                    </TableRow>
                                ))
                        }
                        <TableRow style={{backgroundColor: '#eee'}}>
                            <TableCell align='left'> </TableCell>
                            <TableCell align='center' style={{fontWeight: 'bold'}}>جمع</TableCell>
                            <TableCell align='center' style={{fontWeight: 'bold'}}>{sumEmtiazKarbar}</TableCell>
                            <TableCell align='center' style={{fontWeight: 'bold'}}>
                                {sumEmtiazKarshenas ? sumEmtiazKarshenas : 'نامشخص'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default PrintContent;
