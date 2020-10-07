import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const alert = ({ alert }) => {
   if (alert.length > 0)
      return alert.map((alert) => (
         <div className={`alert-${alert.alertType}`} key={alert.id}>
            <span>{alert.msg}</span>
         </div>
      ))
   else return null
}

alert.propTypes = {
   alert: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
   alert: state.alert,
})

export default connect(mapStateToProps)(alert)
