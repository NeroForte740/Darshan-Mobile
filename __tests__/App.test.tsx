import React from 'react'

import { render } from '@testing-library/react-native'

import App from '@navigation/AppNavigator'

describe('App', () => {
  it('deve renderizar corretamente', () => {
    render(<App />)
  })
})
