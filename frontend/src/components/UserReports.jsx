import React from 'react'
import UserReportsHeader from './UserReportsHeader'
import UserReportsBody from './UserReportsBody'

const ReportList = () => {
  return (
    <div className='w-full h-full'>
      {/* -----------------------------------------------------------------------------------
      TOP SECTION - MODULE NAME, ASSIGNED DATE, COMPLETED DATE, ASSIGNED BY, MODULE AVG SCORE
      -------------------------------------*/}
      <UserReportsHeader />

      {/* --------------------------------------
      TOP SECTION - List of USER SESSION REPORTS
      ---------------------------------------*/}
      <UserReportsBody />
    </div>
  )
}

export default ReportList