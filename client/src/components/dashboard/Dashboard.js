import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile,deleteAccount} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';


const Dashboard = ({ getCurrentProfile,deleteAccount, auth: {user}, profile: {profile, loading} }) => {
    useEffect(()=> {
        getCurrentProfile();
    },[getCurrentProfile]);

    return loading && profile === null ? <Spinner/> : 
    <Fragment>
        <h1 className='large text-primary'>Профиль</h1>
        <p className="lead">
        <i className="fas fa-user"></i> Привет, { user && user.name}</p>
        {profile !== null ? 
        <Fragment>
            <DashboardActions/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={()=>deleteAccount()}>
                <i className="fas fa-user-minus"></i> Удалить аккаунт
                </button>
            </div>
        </Fragment> 
        : 
        <Fragment>
            <p>Вы еще не настроили профиль, пожалуйста, добавьте информацию</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>Настроить профиль</Link>
        </Fragment> }
    </Fragment>
};

Dashboard.propTypes = {
    getCurrentProfile : PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
