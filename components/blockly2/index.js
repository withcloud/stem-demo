import React from 'react'
import BlocklyComponent from './blocklyComponent'

export default BlocklyComponent

export const Block = (p) => {
  const { children, ...props } = p
  props.is = 'blockly'
  return React.createElement('block', props, children)
}

export const Field = (p) => {
  const { children, ...props } = p
  props.is = 'blockly'
  return React.createElement('field', props, children)
}
