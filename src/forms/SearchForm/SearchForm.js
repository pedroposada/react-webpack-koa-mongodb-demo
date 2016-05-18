import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { actions as searchActions } from 'redux/modules/Search'

export const fields = ['title', 'director', 'year', 'actor']

const validate = (values) => {
  const errors = {}
  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  sendSearch: Function,
  search: Object
};
export class Search extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  }

  render () {
    const {
      fields: { title, director, year, actor },
      handleSubmit,
      sendSearch,
      search: { response, submitting, submitted, message }
    } = this.props

    return (
      <form onSubmit={handleSubmit((data) => {
        const query = {}
        Object.keys(data).map((key) => {
          if (data[key]) {
            query[key] = data[key]
          }
        })
        sendSearch(query)
      })}>
        <h1>Search Netflix</h1>
        <input type='text' {...title} placeholder='search by title' />
        <input type='text' {...director} placeholder='search by director' />
        <input type='text' {...year} placeholder='search by year' />
        <input type='text' {...actor} placeholder='search by actor' />
        <button type='submit'>Search</button>
        {submitting ? (<div>Searching, please wait...</div>) : null}
        {submitted && message ? (<div>{message}</div>) : null}
        {response.length ? (<div>{`Number of results: ${response.length}`}</div>) : null}
        <ol>
          {response.map((movie, idx) => (<li key={idx}><Movie movie={movie} /></li>))}
        </ol>
      </form>
    )
  }
}

function Movie ({movie}) {
  return <ul>{Object.keys(movie).map((key, index) => (<li key={index}>{`${key}: ${movie[key]}`}</li>))}</ul>
}

Movie.propTypes = {
  movie: PropTypes.object
}

export default reduxForm({
  form: 'GoogleSearch',
  fields,
  validate
}, (state) => ({
  search: state.Search
})
, {
  sendSearch: searchActions.sendSearch
})(Search)
