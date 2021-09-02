/**
 * /* eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */
/* eslint-disable react-hooks/exhaustive-deps*/

import React from 'react';
import { connect } from 'react-redux';
import HeaderProfile from '../components/Profile/HeaderProfile';
import * as authAction from '../actions/AuthAction';
import * as homeAction from '../actions/HomeAction';
import NavBarComponent from '../components/common/NavBarComponent';
import Information from '../components/Profile/Information';
import Photo from '../components/Profile/Photo';
import Post from '../components/common/Post';
import PostForm from '../components/common/PostForm';

export const ProfileContainer = (props) => {
  const [openTab, setOpenTab] = React.useState(1);
  const param = window.location.pathname.split('/');
  const id = param[2];

  // React.useEffect(() => {
  //   props.getCsrfToken();
  // }, []);

  React.useEffect(() => {
    if (id !== props.userDetail._id) {
      props.getSingleUserRequest({ _id: id });
    }
  }, []);

  let _renderTab;

  switch (openTab) {
    case 1:
      _renderTab = (
        <div className={'mx-auto flex'} style={{ maxWidth: '60%' }}>
          <div className={'w-1/3'}>
            <Information userDetail={props.userDetail} />
            <Photo />
          </div>
          <div className={'w-2/3 ml-8'}>
            <PostForm
              avatar={props.userDetail.avatar}
              fullname={props.userDetail.fullname}
            />
            <Post />
          </div>
        </div>
      );
      break;
    case 2:
      _renderTab = <div>About</div>;
      break;
    case 3:
      _renderTab = <div>Friend</div>;
      break;
    case 4:
      _renderTab = <div>Photo</div>;
      break;

    default:
      break;
  }

  return (
    <div className={'bg-gray-100'}>
      <NavBarComponent
        logoutRequest={() => props.logoutRequest()}
        searchResult={props.searchResult}
        getSingleUserRequest={(data) => props.getSingleUserRequest(data)}
        searchRequest={(data) => props.searchRequest(data)}
        id={props.userDetail._id}
        userDetail={props.userDetail}
      />
      <HeaderProfile
        userDetail={props.userDetail}
        openTab={openTab}
        setOpenTab={(data) => setOpenTab(data)}
      />
      {_renderTab}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userDetail: state.home.userDetail,
  searchResult: state.home.searchResult,
});

const mapDispatchToProps = (dispatch) => ({
  getCsrfToken: () => dispatch(authAction.getCsrfToken()),
  getSingleUserRequest: (data) =>
    dispatch(homeAction.getSingleUserRequest(data)),
  logoutRequest: () => dispatch(authAction.logoutRequest()),
  searchRequest: (data) => dispatch(homeAction.searchRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);