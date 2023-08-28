import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Outlet } from 'react-router'
import jwtDecode from 'jwt-decode';
import NavbarDiet from './NavbarDiet';
import SidebarDiet from './SidebarDiet';
import { getUserMeOrganization } from '../../features/auth/authSlice'
const LayoutDiet = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userOrganization = useSelector((state) => state.auths.userOrganization)
    const accountType = userOrganization.account_type;
    console.log("!@@@@@@Pacifique",accountType)
    useEffect(() => {
        dispatch(getUserMeOrganization());
        }, [dispatch]);
        if (accountType !== "n") {
           navigate("/")
        }
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <SidebarDiet />
                <div className='grow'>
                    <NavbarDiet />
                    <div className='m-5'><Outlet/></div>
                    <></>
                </div>
            </div>
        </>
    )
}

export default LayoutDiet