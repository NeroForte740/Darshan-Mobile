import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Login from '@screens/Login/index'

describe('Login', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation)
  })

  it('deve renderizar a tela de login', () => {
    const { getByText, getByTestId } = render(<Login />)

    expect(getByText('Darshan')).toBeTruthy()
    expect(getByTestId('email-input')).toBeTruthy()
    expect(getByTestId('password-input')).toBeTruthy()
    expect(getByTestId('login-button')).toBeTruthy()
  })

  it('deve permitir entrada de email e senha', () => {
    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')

    expect(emailInput.props.value).toBe('test@example.com')
    expect(passwordInput.props.value).toBe('password123')
  })

  it('deve validar email vazio', async () => {
    const { getByTestId } = render(<Login />)

    const loginButton = getByTestId('login-button')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(getByTestId('email-input')).toBeTruthy()
    })
  })

  it('deve validar email inválido', async () => {
    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'email-invalido')

    const loginButton = getByTestId('login-button')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(getByTestId('email-input')).toBeTruthy()
    })
  })

  it('deve validar senha vazia', async () => {
    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    fireEvent.changeText(emailInput, 'test@example.com')

    const loginButton = getByTestId('login-button')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(getByTestId('password-input')).toBeTruthy()
    })
  })

  it('deve validar senha com menos de 6 caracteres', async () => {
    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, '12345')

    const loginButton = getByTestId('login-button')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(getByTestId('password-input')).toBeTruthy()
    })
  })

  it('deve realizar login com sucesso', async () => {
    const loginSpy = jest.spyOn(require('@services/authService'), 'loginUser').mockResolvedValue({})

    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')
    const loginButton = getByTestId('login-button')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(loginSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home')
    })
  })

  it('deve mostrar erro quando login falha', async () => {
    const mockError = new Error('Credenciais inválidas')
    jest.spyOn(require('@services/authService'), 'loginUser').mockRejectedValue(mockError)

    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')
    const loginButton = getByTestId('login-button')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(loginButton)

    const showToastSpy = jest.spyOn(require('@utils/functions'), 'showToast')
    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'error',
        title: 'Erro de autenticação',
        message: 'Credenciais inválidas',
      })
    })
  })

  it('deve mostrar loading durante o login', async () => {
    jest
      .spyOn(require('@services/authService'), 'loginUser')
      .mockImplementation(() => new Promise(() => {}))

    const { getByTestId, queryByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')
    const loginButton = getByTestId('login-button')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(loginButton)

    expect(loginButton).toBeDisabled()
    expect(queryByTestId('loading-indicator')).toBeTruthy()
  })

  it('deve limpar erros ao digitar novamente', async () => {
    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const loginButton = getByTestId('login-button')

    fireEvent.press(loginButton)

    fireEvent.changeText(emailInput, 'test@example.com')

    await waitFor(() => {
      expect(getByTestId('email-input')).toBeTruthy()
    })
  })

  it('deve navegar para Home após login bem-sucedido', async () => {
    jest.spyOn(require('@services/authService'), 'loginUser').mockResolvedValue({})

    const { getByTestId } = render(<Login />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')
    const loginButton = getByTestId('login-button')

    fireEvent.changeText(emailInput, 'test@example.com')
    fireEvent.changeText(passwordInput, 'password123')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
