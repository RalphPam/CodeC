import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const alert = ({ alert }) => {
   if (alert.length > 0)
      return alert.map((alert) => <div key={alert.id}>{alert.msg}</div>)
   else return null
}

alert.propTypes = {
   alert: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
   alert: state.alert,
})

export default connect(mapStateToProps)(alert)
