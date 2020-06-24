import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650
    }
}));


const HistoryList = ({list}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} style={{marginTop: 24}}>
            <Table size='small' className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>#</TableCell>
                        <TableCell width={'15%'} align="center">سال تحصیلی</TableCell>
                        <TableCell width={'20%'} align="center">نام آموزشگاه</TableCell>
                        <TableCell width={'15%'} align="center">سمت</TableCell>
                        <TableCell align="center">درجه روستا</TableCell>
                        <TableCell align="center">پایه اول</TableCell>
                        <TableCell align="center">پایه دوم</TableCell>
                        <TableCell align="center">پایه سوم</TableCell>
                        <TableCell align="center">پایه چهارم</TableCell>
                        <TableCell align="center">پایه پنجم</TableCell>
                        <TableCell align="center">پایه ششم</TableCell>
                        <TableCell align="center">بیتوته</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.sort((a, b) => a.sal_tahsili - b.sal_tahsili).map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell align='left'>{index + 1}</TableCell>
                            <TableCell align="center">{row.sal_tahsili}</TableCell>
                            <TableCell align='center'>{row.nam_madrese}</TableCell>
                            <TableCell align='center'>{row.semat || ''}</TableCell>
                            <TableCell align="center">{row.daraje_roosta}</TableCell>
                            <TableCell align="center">
                                {
                                    row.paye_aval &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>
                            <TableCell align="center">
                                {
                                    row.paye_dovom &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>
                            <TableCell align="center">
                                {
                                    row.paye_sevom &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>
                            <TableCell align="center">
                                {
                                    row.paye_chaharom &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>
                            <TableCell align="center">
                                {
                                    row.paye_panjom &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>
                            <TableCell align="center">
                                {
                                    row.paye_sheshom &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>


                            <TableCell align="center">
                                {
                                    row.beitote &&
                                    <CheckRoundedIcon color='primary'/>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default HistoryList;
