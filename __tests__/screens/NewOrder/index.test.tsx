import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import NewOrder from '@screens/NewOrder/index'

const utils = require('@utils/functions')
let showToastSpy: jest.SpyInstance

beforeEach(() => {
  showToastSpy = jest.spyOn(utils, 'showToast')
})

describe('NewOrder', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation)
  })

  it('deve renderizar a tela de novo pedido', () => {
    const { getByText, getByTestId } = render(<NewOrder />)

    expect(getByText('Novo Pedido')).toBeTruthy()
    expect(getByTestId('client-input')).toBeTruthy()
    expect(getByTestId('description-input')).toBeTruthy()
    expect(getByTestId('create-order-button')).toBeTruthy()
  })

  it('deve permitir entrada de cliente e descrição', () => {
    const { getByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')

    fireEvent.changeText(clientInput, 'João Silva')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')

    expect(clientInput.props.value).toBe('João Silva')
    expect(descriptionInput.props.value).toBe('2 - Água, 1 - Coca Cola')
  })

  it('deve validar campos vazios', async () => {
    const { getByTestId } = render(<NewOrder />)

    const createOrderButton = getByTestId('create-order-button')
    fireEvent.press(createOrderButton)

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'info',
        title: 'Atenção',
        message: 'Preencha os campos para criar pedido!',
      })
    })
  })

  it('deve validar campo cliente vazio', async () => {
    const { getByTestId } = render(<NewOrder />)

    const descriptionInput = getByTestId('description-input')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')

    const createOrderButton = getByTestId('create-order-button')
    fireEvent.press(createOrderButton)

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'info',
        title: 'Atenção',
        message: 'Preencha os campos para criar pedido!',
      })
    })
  })

  it('deve validar campo descrição vazio', async () => {
    const { getByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    fireEvent.changeText(clientInput, 'João Silva')

    const createOrderButton = getByTestId('create-order-button')
    fireEvent.press(createOrderButton)

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'info',
        title: 'Atenção',
        message: 'Preencha os campos para criar pedido!',
      })
    })
  })

  it('deve criar pedido com sucesso', async () => {
    const createSpy = jest
      .spyOn(require('@services/ordersService'), 'createOrder')
      .mockResolvedValue({})
    const resetStackSpy = jest.spyOn(require('@utils/functions'), 'resetStack')

    const { getByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')
    const createOrderButton = getByTestId('create-order-button')

    fireEvent.changeText(clientInput, 'João Silva')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')
    fireEvent.press(createOrderButton)

    await waitFor(() => {
      expect(createSpy).toHaveBeenCalledWith({
        client: 'João Silva',
        description: '2 - Água, 1 - Coca Cola',
      })
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'success',
        title: 'Sucesso',
        message: 'Pedido criado com sucesso!',
      })
      expect(resetStackSpy).toHaveBeenCalledWith(mockNavigation, 'Home')
    })
  })

  it('deve mostrar erro quando criação falha', async () => {
    const mockError = new Error('Erro ao criar pedido')
    jest.spyOn(require('@services/ordersService'), 'createOrder').mockRejectedValue(mockError)

    const { getByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')
    const createOrderButton = getByTestId('create-order-button')

    fireEvent.changeText(clientInput, 'João Silva')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')
    fireEvent.press(createOrderButton)

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao criar pedido',
      })
    })
  })

  it('deve mostrar loading durante a criação', async () => {
    jest
      .spyOn(require('@services/ordersService'), 'createOrder')
      .mockImplementation(() => new Promise(() => {}))

    const { getByTestId, queryByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')
    const createOrderButton = getByTestId('create-order-button')

    fireEvent.changeText(clientInput, 'João Silva')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')
    fireEvent.press(createOrderButton)

    expect(createOrderButton).toBeDisabled()
    expect(queryByTestId('loading-indicator')).toBeTruthy()
  })

  it('deve limpar campos após criação bem-sucedida', async () => {
    jest.spyOn(require('@services/ordersService'), 'createOrder').mockResolvedValue({})

    const { getByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')
    const createOrderButton = getByTestId('create-order-button')

    fireEvent.changeText(clientInput, 'João Silva')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')
    fireEvent.press(createOrderButton)

    await waitFor(() => {
      expect(clientInput.props.value).toBe('')
      expect(descriptionInput.props.value).toBe('')
    })
  })

  it('deve navegar para Home após criação bem-sucedida', async () => {
    jest.spyOn(require('@services/ordersService'), 'createOrder').mockResolvedValue({})

    const { getByTestId } = render(<NewOrder />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')
    const createOrderButton = getByTestId('create-order-button')

    fireEvent.changeText(clientInput, 'João Silva')
    fireEvent.changeText(descriptionInput, '2 - Água, 1 - Coca Cola')
    const resetStackSpy = jest.spyOn(require('@utils/functions'), 'resetStack')
    fireEvent.press(createOrderButton)
    await waitFor(() => {
      expect(resetStackSpy).toHaveBeenCalledWith(mockNavigation, 'Home')
    })
  })
})
