import * as Blockly from 'blockly/core'

const legs = function () {
  const list = [
    ['choose...', '-1'],
    ['0', '0'],
    ['2', '2'],
    ['4', '4'],
    ['6', '6']
  ]
  return list
}

export const PuzzleAnimal = []
PuzzleAnimal[1] = {
  name: 'Duck',
  pic: 'duck.jpg',
  picHeight: 70,
  picWidth: 100,
  legs: '2',
  trait1: '羽毛',
  trait2: '鳥嘴',
  helpUrl: 'https://en.wikipedia.org/wiki/Duck'
}
PuzzleAnimal[2] = {
  name: 'Cat',
  pic: 'cat.jpg',
  picHeight: 70,
  picWidth: 100,
  legs: '4',
  trait1: '鬍鬚',
  trait2: '毛皮',
  helpUrl: 'https://en.wikipedia.org/wiki/Cat'
}
PuzzleAnimal[3] = {
  name: 'Bee',
  pic: 'bee.jpg',
  picHeight: 70,
  picWidth: 100,
  legs: '6',
  trait1: '蜂蜜',
  trait2: '蜂刺',
  helpUrl: 'https://en.wikipedia.org/wiki/Bee'
}
PuzzleAnimal[4] = {
  name: 'Snail',
  pic: 'snail.jpg',
  picHeight: 70,
  picWidth: 100,
  legs: '0',
  trait1: '貝殼',
  trait2: '黏液',
  helpUrl: 'https://en.wikipedia.org/wiki/Snail'
}

const ANIMAL_HUE = 120
const PICTURE_HUE = 30
const TRAIT_HUE = 290

Blockly.Blocks.animal = {
  /**
   * Block to represent an animal.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setColour(ANIMAL_HUE)
    this.appendDummyInput()
      .appendField('', 'NAME')
    this.appendValueInput('PIC')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('picture:')
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField('legs:')
      .appendField(new Blockly.FieldDropdown(legs), 'LEGS')
    this.appendStatementInput('TRAITS')
      .appendField('traits:')
    this.setInputsInline(false)
  },
  /**
   * Save the animal number.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    const container = document.createElement('mutation')
    container.setAttribute('animal', this.animal)
    return container
  },
  /**
   * Restore the animal number.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.populate(parseInt(xmlElement.getAttribute('animal'), 10))
  },
  animal: 0,
  /**
   * Set the animal.
   * @this {Blockly.Block}
   */
  populate: function (n) {
    this.animal = n
    this.setFieldValue(PuzzleAnimal[n].name, 'NAME')
    this.helpUrl = PuzzleAnimal[n].helpUrl
    this.legs = PuzzleAnimal[n].legs
  },
  /**
   * Evaluate the correctness of this block.
   * @this {Blockly.Block}
   */
  isCorrect: function () {
    console.log("this.getFieldValue('LEGS')", this.getFieldValue('LEGS'))
    console.log('this.animal', this.animal)
    return this.getFieldValue('LEGS') === this.legs
  }
}

Blockly.Blocks.picture = {
  /**
   * Block to represent a picture.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setColour(PICTURE_HUE)
    this.appendDummyInput('PIC')
    this.setOutput(true)
    this.setTooltip('')
  },
  mutationToDom: Blockly.Blocks.animal.mutationToDom,
  domToMutation: Blockly.Blocks.animal.domToMutation,
  animal: 0,
  /**
   * Set the animal and picture.
   * @this {Blockly.Block}
   */
  populate: function (n) {
    this.animal = n
    const pic = 'puzzle/' + PuzzleAnimal[n].pic
    const picHeight = PuzzleAnimal[n].picHeight
    const picWidth = PuzzleAnimal[n].picWidth
    this.getInput('PIC')
      .appendField(new Blockly.FieldImage(pic, picWidth, picHeight))
  },
  /**
   * Evaluate the correctness of this block.
   * @this {Blockly.Block}
   */
  isCorrect: function () {
    const parent = this.getParent()
    return parent && (parent.animal === this.animal)
  }
}

Blockly.Blocks.trait = {
  /**
   * Block to represent a trait.
   * @this {Blockly.Block}
   */
  init: function () {
    this.setColour(TRAIT_HUE)
    this.appendDummyInput().appendField('', 'NAME')
    this.setPreviousStatement(true)
    this.setNextStatement(true)
  },
  /**
   * Save the animal and trait numbers.
   * @this {Blockly.Block}
   */
  mutationToDom: function () {
    const container = document.createElement('mutation')
    container.setAttribute('animal', this.animal)
    container.setAttribute('trait', this.trait)
    return container
  },
  /**
   * Restore the animal and trait numbers.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    this.populate(parseInt(xmlElement.getAttribute('animal'), 10),
      parseInt(xmlElement.getAttribute('trait'), 10))
  },
  animal: 0,
  trait: 0,
  /**
   * Set the animal and trait.
   * @this {Blockly.Block}
   */
  populate: function (n, m) {
    this.animal = n
    this.trait = m
    // Set the trait name.
    this.setFieldValue(PuzzleAnimal[n]['trait' + m], 'NAME')
  },
  /**
   * Evaluate the correctness of this block.
   * @this {Blockly.Block}
   */
  isCorrect: function () {
    const parent = this.getSurroundParent()
    return parent && (parent.animal === this.animal)
  }
}
