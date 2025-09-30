import React from 'react'
import Commnts from './component/Commnts'
import Dotgraph from '../admin/components/Dotgraph'
import CostGraph from '../admin/components/CostGraph'
import BarGraph from '../admin/components/BarGrapg'
import AdminComments from '../admin/components/AdminComments'

const Testing = () => {
  return (
    <div><Commnts/>
    <div className="mt-5">
      <Dotgraph/>
    </div>
    <div className='mt-5'>
<CostGraph/>
    </div>
    <div className='mt-5'>
<BarGraph/>
    </div>
    <div className='mt-5'>
<AdminComments/>
    </div>
    </div>
  )
}

export default Testing