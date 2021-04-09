import React, { memo } from 'react'
import {
  Box,
  Menu,
  Avatar,
  MenuList,
  Link,
  MenuItem,
  MenuDivider,
  Header as HeaderComponent,
  HeaderMenuButton,
  HeaderLogo,
  HeaderRight
} from 'viviui'

import { AiOutlineLogout } from 'react-icons/ai'
import { MdDashboard } from 'react-icons/md'

import NextLink from 'next/link'

import HomeLogo from './homeLogo'

const Header = props => {
  return (
    <HeaderComponent containerProps={{ h: '4rem', px: '2' }}>
      <HeaderLogo>
        <NextLink href='/' passHref>
          <Box
            as='a'
            d='block'
          >
            <HomeLogo />
          </Box>
        </NextLink>
      </HeaderLogo>
      <HeaderRight>
        <Menu placement='bottom-end'>
          <HeaderMenuButton as='div'>
            <Avatar size='sm' cursor='pointer' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          </HeaderMenuButton>
          <MenuList>
            <Link href='#'>
              <MenuItem as='a'>
                <Box as={MdDashboard} mr='4px' />
                <span data-cy='span-my-school'>
                  每日一篇
                </span>
              </MenuItem>
            </Link>

            <MenuDivider />

            <Link href='https://macau.school'>
              <MenuItem>
                <Box as={AiOutlineLogout} mr='4px' />
                <span data-cy='span-logout'>
                  Macau School
                </span>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>

      </HeaderRight>
    </HeaderComponent>
  )
}

export default memo(Header)
