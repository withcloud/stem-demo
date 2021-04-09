import { theme as chakraTheme } from '@chakra-ui/core'

const fonts = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Tahoma, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif',
  heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Tahoma, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif',
  mono: 'Tahoma, Helvetica, Arial, "Microsoft Yahei","微软雅黑", STXihei, "华文细黑", sans-serif'
}

const theme = {
  ...chakraTheme,
  fonts
}

export default theme
