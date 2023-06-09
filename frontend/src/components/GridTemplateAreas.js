//import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './ResponsiveAppBar';
import PublicDestinationGrid from './PublicDestinationsGrid';
import background from '../view_background.jpeg'

export default function GridTemplateAreas() {
  const imageUrl = process.env.PUBLIC_URL + '/view_background.jpeg'; 
  
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '0.3fr 3fr 3fr 0.3fr',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `
            "header header header header"
            "hero hero hero hero"
            "aside main main sidebar"
            "footer footer footer footer"
          `,
        }}
      >
        <Box sx={{ gridArea: 'header'}}><ResponsiveAppBar /></Box>
        <Box sx={{ gridArea: 'hero', 
                    backgroundImage: `url(${background})` , 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center',
                    marginTop: { md: '-0.45em' },
                    height: '475px', 
                    justifyContent: 'center'}}>
          <Typography variant="h2" component="div" fontSize='70px' border='1px'
                      sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>
            Welcome to Time to Travel!
          </Typography>
        </Box>
        <Box sx={{ gridArea: 'aside'}}></Box>
        <Box sx={{ gridArea: 'main', marginTop: { md: '3em' }}}>
          <PublicDestinationGrid />
        </Box>
        <Box sx={{ gridArea: 'sidebar'}}></Box>
        <Box sx={{ gridArea: 'footer', bgcolor:'#3874cb', marginTop: { md: '1.5em' }, height: '70px'}}>
          <Typography variant="h6" component="div" align='center' color='white' marginTop='20px'>
            Time to Travel, toate drepturile rezervate @ ISS (kill me please)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
