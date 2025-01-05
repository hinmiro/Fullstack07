import React from 'react'
import LoggedUser from './LoggedUser.jsx'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import { TabList } from '@mui/lab'
import { Tab } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

const NavBar = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#282828',
          borderRadius: '2px',
          padding: 5,
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} textColor="primary">
              <Tab
                label="Blogs"
                value="1"
                component={Link}
                to="/"
                sx={{
                  color: 'gray',
                }}
              />
              <Tab
                label="Users"
                value="2"
                component={Link}
                to="/users"
                sx={{
                  color: 'gray',
                }}
              />
            </TabList>
          </Box>
        </TabContext>
        <LoggedUser />
      </div>
    </div>
  )
}

export default NavBar
