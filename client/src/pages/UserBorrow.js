import { React, useState, useEffect } from 'react'
import Layout from './Layout'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import * as ConstanceStrings from '../ConstanceString';
import calendar from '../image/calendar.jpg';
import { useNavigate } from 'react-router-dom';

function UserBorrow() {
    axios.defaults.withCredentials = true;
    const [notReturn, setNotReturn] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}`)
            .then((res) => {
                if (res.data.loggedIn) {
                    setUserId(res.data.userId)
                }else {
                    navigate('/')
                  }
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    useEffect(() => {
        if (userId) {
            console.log(userId);
            axios.get(`${process.env.REACT_APP_API}/device/?userId=${userId}`)
                .then((res) => {
                    setNotReturn(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userId]);

    const changeDateFormat = (dateString) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const [year, month, day] = dateString.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        const formattedDate = `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
        return formattedDate;
    };

    const columns = [
        {
            name: 'รูปภาพ',
            selector: (row) => <img src={`${process.env.REACT_APP_API}/device/image/${row.image}`} alt="Image" style={{ width: 'auto', height: '30px' }} />,
        },
        {
            name: 'ชื่อ',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'วันที่คืน',
            selector: (row) => changeDateFormat(row.returnDate),
            sortable: true,
        },
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#F9FAFB',
                color: 'black',
            },
        },
        headCells: {
            style: {
                fontWeight: '600',
                fontSize: '0.8rem',
                paddingLeft: '8px',
            },
        },
        cells: {
            style: {
                fontSize: '0.8rem',
                paddingLeft: '8px',
            },
        },
        rows: {
            style: {
                minHeight: '35px', // override the row height
            },
        },
    };
    return (
        <Layout>
            <div style={{backgroundImage:`url(${calendar})`, backgroundSize:'cover', height:"10rem", display:'flex', flexDirection:'column', justifyContent:"center"}}>
                <h3 style={{marginLeft:"3rem", fontSize:"3rem"}}>รายการยืมอุปกรณ์ของคุณ</h3>
            </div>
            <DataTable
                columns={columns}
                data={notReturn}
                pagination
                striped
                customStyles={customStyles}
                paginationRowsPerPageOptions={[10, 20, 30]}
                defaultSortFieldId={3}
            />
        </Layout>
    )
}

export default UserBorrow
