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
import BlocklyComponent from 'components/blockly'
import { useRef } from 'react'

let ansMsg = ''

const Home = () => {
  const blockly = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const checkAnswers = () => {
    const workspace = blockly.current.primaryWorkspace
    const blocks = workspace.getAllBlocks()
    let errors = 0
    const badBlocks = []
    for (let b = 0, block; (block = blocks[b]); b++) {
      if (!block.isCorrect()) {
        errors++
        // Bring the offending blocks to the front.
        block.select()
        badBlocks.push(block)
      }
    }

    console.log('errors', errors)
    console.log('badBlocks', badBlocks)

    if (errors) {
      ansMsg = badBlocks.length + ' blocks are incorrect.'
    } else {
      ansMsg = 'Perfect! All blocks are correct.'
    }

    onOpen()
  }
  return (
    <Layout>
      <Box d='flex' flexDirection='column' pt={16} h='100%' pos='absolute' top='0' left='0' w='100%'>
        <Box flexGrow='1' pos='relative'>
          <BlocklyComponent
            ref={blockly}
            readOnly={false}
            trashcan={false}
            media='media/'
            move={{
              scrollbars: false,
              drag: true,
              wheel: false
            }}
          />
        </Box>
        <Box marginBottom={3} py={3} borderTopWidth='1px' d='flex' justifyContent='center'>
          <Button variantColor='green' size='lg' onClick={checkAnswers}>提交答案</Button>
        </Box>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            提交答案
          </AlertDialogHeader>

          <AlertDialogBody>
            {ansMsg}
            {ansMsg === 'Perfect! All blocks are correct.' && (
              <>
                <Heading mt='8' mb='4'>You Got A Star!</Heading>
                <Image w='128px' h='128px' src='/star.png' />
                <Text mt='4' mb='4'>課程結束，休息一下，再繼續學習。</Text>
              </>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>
              關閉
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  )
}

export default Home
