import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import UpdateOrder from '@screens/UpdateOrder/index'

const utils = require('@utils/functions')
let showToastSpy: jest.SpyInstance

beforeEach(() => {
  showToastSpy = jest.spyOn(utils, 'showToast')
})

describe('UpdateOrder', () => {
  const mockOrder = {
    ped_id: 1,
    ped_client: 'João Silva',
    ped_description: '2 - Água, 1 - Coca Cola',
    ped_status_pag: 'Pago',
    ped_status_preparo: 'Finalizado',
  }

  const mockNavigation = {
    navigate: jest.fn(),
  }

  const mockRoute = {
    params: {
      order: mockOrder,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation)
    jest.spyOn(require('@react-navigation/native'), 'useRoute').mockReturnValue(mockRoute)
  })

  it('deve renderizar a tela de atualização de pedido', () => {
    const { getByText, getByTestId } = render(<UpdateOrder route={mockRoute} />)

    expect(getByText('Pedido #1')).toBeTruthy()
    expect(getByTestId('payment-status-picker')).toBeTruthy()
    expect(getByTestId('order-status-picker')).toBeTruthy()
    expect(getByTestId('client-input')).toBeTruthy()
    expect(getByTestId('description-input')).toBeTruthy()
    expect(getByTestId('update-order-button')).toBeTruthy()
  })

  it('deve carregar dados do pedido corretamente', () => {
    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')

    expect(clientInput.props.value).toBe('João Silva')
    expect(descriptionInput.props.value).toBe('2 - Água, 1 - Coca Cola')
  })

  it('deve permitir alteração de status de pagamento', () => {
    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const paymentPickerInput = getByTestId('payment-status-picker-picker')

    fireEvent(paymentPickerInput, 'valueChange', 'Pendente')

    expect(paymentPickerInput).toBeTruthy()
  })

  it('deve permitir alteração de status de preparo', () => {
    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const orderPickerInput = getByTestId('order-status-picker-picker')

    fireEvent(orderPickerInput, 'valueChange', 'Em preparo')

    expect(orderPickerInput).toBeTruthy()
  })

  it('deve permitir alteração de cliente', () => {
    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const clientInput = getByTestId('client-input')
    fireEvent.changeText(clientInput, 'Maria Santos')

    expect(clientInput.props.value).toBe('Maria Santos')
  })

  it('deve permitir alteração de descrição', () => {
    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const descriptionInput = getByTestId('description-input')
    fireEvent.changeText(descriptionInput, '3 - Água, 2 - Coca Cola')

    expect(descriptionInput.props.value).toBe('3 - Água, 2 - Coca Cola')
  })

  it('deve validar campos vazios', async () => {
    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const clientInput = getByTestId('client-input')
    const descriptionInput = getByTestId('description-input')

    fireEvent.changeText(clientInput, '')
    fireEvent.changeText(descriptionInput, '')

    const updateButton = getByTestId('update-order-button')
    fireEvent.press(updateButton)

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: '',
        title: 'Atenção',
        message: 'Preencha a descrição do pedido',
      })
    })
  })

  it('deve atualizar pedido com sucesso', async () => {
    const updateSpy = jest
      .spyOn(require('@services/ordersService'), 'updateOrder')
      .mockResolvedValue({})
    const resetStackSpy = jest.spyOn(require('@utils/functions'), 'resetStack')

    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const updateButton = getByTestId('update-order-button')
    fireEvent.press(updateButton)

    await waitFor(() => {
      expect(updateSpy).toHaveBeenCalledWith(1, {
        ...mockOrder,
        ped_status_preparo: 'Finalizado',
        ped_status_pag: 'Pago',
        ped_client: 'João Silva',
        ped_description: '2 - Água, 1 - Coca Cola',
      })
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'success',
        title: 'Sucesso!',
        message: 'Pedido #1 editado com sucesso!',
      })
      expect(resetStackSpy).toHaveBeenCalledWith(mockNavigation, 'Home')
    })
  })

  it('deve mostrar erro quando atualização falha', async () => {
    const mockError = new Error('Erro ao atualizar pedido')
    jest.spyOn(require('@services/ordersService'), 'updateOrder').mockRejectedValue(mockError)

    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const updateButton = getByTestId('update-order-button')
    fireEvent.press(updateButton)

    const showToastSpy = jest.spyOn(require('@utils/functions'), 'showToast')
    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao atualizar pedido',
      })
    })
  })

  it('deve mostrar loading durante a atualização', async () => {
    jest
      .spyOn(require('@services/ordersService'), 'updateOrder')
      .mockImplementation(() => new Promise(() => {}))

    const { getByTestId, queryByTestId } = render(<UpdateOrder route={mockRoute} />)

    const updateButton = getByTestId('update-order-button')
    fireEvent.press(updateButton)

    expect(updateButton).toBeDisabled()
    expect(queryByTestId('loading-indicator')).toBeTruthy()
  })

  it('deve navegar para Home após atualização bem-sucedida', async () => {
    jest.spyOn(require('@services/ordersService'), 'updateOrder').mockResolvedValue({})

    const { getByTestId } = render(<UpdateOrder route={mockRoute} />)

    const updateButton = getByTestId('update-order-button')
    fireEvent.press(updateButton)

    const resetStackSpy = jest.spyOn(require('@utils/functions'), 'resetStack')
    await waitFor(() => {
      expect(resetStackSpy).toHaveBeenCalledWith(mockNavigation, 'Home')
    })
  })
})
