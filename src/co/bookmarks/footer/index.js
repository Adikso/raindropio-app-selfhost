import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as bookmarksActions from '~data/actions/bookmarks'
import { makeStatus } from '~data/selectors/bookmarks'

import View from './view'

class BookmarksFooter extends React.Component {
    static defaultProps = {
        spaceId:        0,
        compact:    false,
        more:       false //useful when compact is true, means that full items count more that showed right now
    }
    
    render() {
        return (
            <View {...this.props} />
        )
    }
}

export default connect(
	() => {
        const getStatus = makeStatus()
    
        return (state, { spaceId })=>({
            status: getStatus(state, spaceId),
        })
    },
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
    })
)(BookmarksFooter)