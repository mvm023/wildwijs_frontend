import {React, useState, useEffect}  from 'react'
import AxiosInstance from '../../config/axios'
import { TextField, Button, Typography, Card, CardContent } from '@mui/material'

const Encyclopedia = () => {
  const [organisms, setOrganisms] = useState([])  // Store all organisms
  const [searchTerm, setSearchTerm] = useState('')  // Store search input
  const [filteredOrganism, setFilteredOrganism] = useState(null)  // Store filtered organism

  // Get the data from the backend
  const GetData = () => {
    AxiosInstance.get('organism/').then((res) => {
      setOrganisms(res.data)
      setFilteredOrganism(res.data[0])  // Set the first bird as the initial display
    })
  }

  // Filter organisms based on the search term
  const handleSearch = () => {
    const result = organisms.filter(org => 
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredOrganism(result.length > 0 ? result[0] : null) // Show first match or nothing if not found
  }

  // On initial render, get the data
  useEffect(() => {
    GetData()
  }, [])

  return (
    <div>
      <TextField 
        label="Search Bird" 
        variant="outlined" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      {filteredOrganism ? (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {filteredOrganism.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Scientific Name: {filteredOrganism.scientific_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Alternative Names: {filteredOrganism.alternative_names?.length > 0 ? filteredOrganism.alternative_names.join(', ') : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {filteredOrganism.description || 'No description available'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Occurrence Status: {filteredOrganism.occurrence_status_verbatim || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2 }}>
          No bird found with that name.
        </Typography>
      )}
    </div>
  )
}

export default Encyclopedia
