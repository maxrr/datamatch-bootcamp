import React from 'react';
// import { withRouter } from './WithRouter';
import { compose } from "redux";
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from "react-redux-firebase";

function TestHOC(props) {
    if (!isLoaded(props.flashcards))
        return <div>Loading...</div>;
        
    return <div>Test {props.flashcards[0].name}</div>;
}

function mapStateToProps(state) {
    console.log(state);
    // const isEmpty = state.firebase.profile.isEmpty;
    const flashcards = state.firebase.data.flashcards;
    return { flashcards: flashcards };
}

export default compose(
    firebaseConnect(["/flashcards"]),
    connect(mapStateToProps)
)(TestHOC)

// export default connect(mapStateToProps)(TestHOC);
// export default withRouter(TestHOC);