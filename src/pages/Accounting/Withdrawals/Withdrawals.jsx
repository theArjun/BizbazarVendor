import React from 'react'
import { WithdrawalSearch, WithdrawalTable } from '../..'

const Withdrawals = ({data, status, loading, getWithdrawInformation}) => {
  return (
    <div>
    <WithdrawalSearch getWithdrawInformation={getWithdrawInformation} />
    <WithdrawalTable data={data?data:''} status={status}  loading={loading} / >
    </div>
  )
}

export default Withdrawals