import React from 'react'

import Blockly from 'blockly/core'
import locale from 'blockly/msg/en'
import 'blockly/blocks'

import { PuzzleAnimal } from './customblocks'

Blockly.setLocale(locale)

const shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Choose a random array index in [0, i] (inclusive with i).
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
}

class BlocklyComponent extends React.Component {
  constructor (props) {
    super(props)
    this.blocklyDiv = React.createRef()
  }

  componentDidMount () {
    const { initialXml, children, ...rest } = this.props
    this.primaryWorkspace = Blockly.inject(
      this.blocklyDiv.current,
      {
        ...rest
      }
    )

    if (initialXml) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace)
    }

    // --------------------------------------------------------------------

    const blocksAnimals = []
    const blocksPictures = []
    const blocksTraits = []
    let i = 1
    let block

    while (PuzzleAnimal[i]) {
      block = this.primaryWorkspace.newBlock('animal')
      block.populate(i)
      blocksAnimals.push(block)
      block = this.primaryWorkspace.newBlock('picture')
      block.populate(i)
      blocksPictures.push(block)
      let j = 1
      while (PuzzleAnimal[i]['trait' + j]) {
        block = this.primaryWorkspace.newBlock('trait')
        block.populate(i, j)
        blocksTraits.push(block)
        j++
      }
      i++
    }

    shuffle(blocksAnimals)
    shuffle(blocksPictures)
    shuffle(blocksTraits)

    const blocks = [].concat(blocksAnimals, blocksPictures, blocksTraits)

    // Initialize all the blocks.
    for (let i = 0, block; (block = blocks[i]); i++) {
      block.setDeletable(false)
      block.initSvg()
      block.render()
    }

    let totalArea = 0
    // Measure the surface area of each block.
    for (let i = 0, block; (block = blocks[i]); i++) {
      const blockBox = block.getSvgRoot().getBBox()
      block.cached_width_ = blockBox.width
      block.cached_height_ = blockBox.height
      block.cached_area_ = blockBox.width * blockBox.height
      totalArea += block.cached_area_
    }

    // Position the blocks randomly.
    const MARGIN = 50
    Blockly.svgResize(this.primaryWorkspace)
    const workspaceBox = Blockly.svgSize(this.primaryWorkspace.getParentSvg())
    workspaceBox.width -= MARGIN
    workspaceBox.height -= MARGIN
    let countedArea = 0
    for (let i = 0, block; (block = blocks[i]); i++) {
      const blockBox = block.getSvgRoot().getBBox()
      // Spread the blocks horizontally, grouped by type.
      // Spacing is proportional to block's area.
      let dx = (countedArea / totalArea) * (workspaceBox.width - blockBox.width)
      dx = Math.round(dx + Math.random() * MARGIN)
      const dy = Math.round(Math.random() * (workspaceBox.height - blockBox.height))
      block.moveBy(dx, dy)
      countedArea += block.cached_area_
    }

    this.primaryWorkspace.clearUndo()

    // Make connecting blocks easier for beginners.
    Blockly.SNAP_RADIUS *= 2
    Blockly.CONNECTING_SNAP_RADIUS = Blockly.SNAP_RADIUS
  }

  get workspace () {
    return this.primaryWorkspace
  }

  setXml (xml) {
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.primaryWorkspace)
  }

  render () {
    return (
      <>
        <div ref={this.blocklyDiv} id='blocklyDiv' />
        <style jsx>{`
          #blocklyDiv {
            height: 100%;
            width: 100%;
            position: absolute;
            bottom: 0;
          }
        `}
        </style>
      </>
    )
  }
}

export default BlocklyComponent
