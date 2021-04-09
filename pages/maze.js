import {
  Box
} from '@chakra-ui/core'

import Layout from 'components/layout'
import BlocklyComponent, { Block, Field } from 'components/blockly2'
import { useRef } from 'react'
import Iframe from 'react-iframe'

const Home = () => {
  const blockly = useRef(null)

  return (
    <Layout>
      <Box d='flex' flexDirection='column' pt={16} h='100%' pos='absolute' top='0' left='0' w='100%'>
        <Box flexGrow='1' pos='relative'>
          <Iframe
            url='https://blockly.games/maze?lang=zh-hant&level=1&skin=0'
            position='absolute'
            width='100%'
            id='myId'
            className='myClassname'
            height='100%'
            styles={{ height: '25px' }}
          />
          <Box pos='absolute' top='1px' w='200px' h='60px' background='white' left={0} zIndex={2000} />
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
