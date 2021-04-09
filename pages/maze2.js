import {
  Box,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Heading,
  Image,
  Text
} from '@chakra-ui/core'

import Layout from 'components/layout'
import BlocklyComponent, { Block, Field } from 'components/blockly2'
import { useRef } from 'react'

const Home = () => {
  const blockly = useRef(null)

  return (
    <Layout>
      <Box d='flex' pt={16} h='100%' pos='absolute' top='0' left='0' w='100%'>
        <Box w='400px'>
          <div id='visualization'>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' id='svgMaze' width='400px' height='400px'>
              <g id='look'>
                <path d='M 0,-15 a 15 15 0 0 1 15 15' />
                <path d='M 0,-35 a 35 35 0 0 1 35 35' />
                <path d='M 0,-55 a 55 55 0 0 1 55 55' />
              </g>
            </svg>
            <div id='capacityBubble'>
              <div id='capacity' />
            </div>
          </div>
        </Box>
        <Box flexGrow='1' pos='relative'>
          <BlocklyComponent
            ref={blockly}
            readOnly={false}
            trashcan
            media='media/'
            move={{
              scrollbars: false,
              drag: true,
              wheel: false
            }}
          >
            <Block type='maze_moveForward' />
            <Block type='maze_turn'><Field name='DIR'>turnLeft</Field></Block>
            <Block type='maze_turn'><Field name='DIR'>turnRight</Field></Block>
          </BlocklyComponent>
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
