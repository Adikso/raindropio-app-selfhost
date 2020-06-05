import React from 'react'
import t from '~t'
import { connect } from 'react-redux'
import { getSearchEmpty } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import { Link } from 'react-router-dom'

class BookmarksHeaderTitle extends React.Component {
    static defaultProps = {
        spaceId: 0,
        compact: false
    }

    render() {
        let {
            collection: { _id, title },
            isSearching,
            compact
        } = this.props

        if (_id == 0 && isSearching)
            title = t.s('defaultCollection-0')

        return (
            <div className='title'>
                {compact ? <Link to={'/space/'+_id+'full'}>{title}</Link> : title}
            </div>
        )
    }
}

export default connect(
	() => {
        const getCollection = makeCollection()
    
        return (state, { spaceId })=>({
            collection: getCollection(state, spaceId),
            isSearching: !getSearchEmpty(state, spaceId)
        })
    }
)(BookmarksHeaderTitle)