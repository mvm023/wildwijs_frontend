import {React, useState, useEffect}  from 'react'
import AxiosInstance from '../../config/axios'

const Encyclopedia = () => {
  const [organism, setOrganism] = useState([])

  console.log(organism)

  const GetData = () => {
    AxiosInstance.get('organism/').then((res) => {
      setOrganism(res.data)
    })
  }

  useEffect(() =>  {
      GetData()
  }, [])

  return (
    <div>
        Hier komt al die info
    </div>
  )
}

export default Encyclopedia