import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import Home from '@screens/Home/index'

describe('Home', () => {
  const mockOrders = [
    {
      ped_id: 1,
      ped_client: 'Cliente 1',
      ped_description: 'Pedido 1',
      ped_status_pag: 'Pago',
      ped_status_preparo: 'Finalizado',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      ped_id: 2,
      ped_client: 'Cliente 2',
      ped_description: 'Pedido 2',
      ped_status_pag: 'Pendente',
      ped_status_preparo: 'Em preparo',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar a tela de Home', async () => {
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockResolvedValue(mockOrders)

    const { getByText } = render(<Home />)

    await waitFor(() => {
      expect(getByText('Hoje')).toBeTruthy()
      expect(getByText('Outros')).toBeTruthy()
    })
  })

  it('deve mostrar indicador de carregamento enquanto carrega os pedidos', () => {
    jest
      .spyOn(require('@services/ordersService'), 'getAllOrders')
      .mockImplementation(() => new Promise(() => {}))

    const { getByTestId } = render(<Home />)

    expect(getByTestId('loading-indicator')).toBeTruthy()
  })

  it('deve mostrar mensagem de lista vazia quando não há pedidos', async () => {
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockResolvedValue([])

    const { getByTestId } = render(<Home />)

    await waitFor(() => {
      expect(getByTestId('empty-orders-message')).toBeTruthy()
      expect(getByTestId('empty-orders-message')).toHaveTextContent('Nenhum pedido listado!')
    })
  })

  it('deve carregar e exibir pedidos com sucesso', async () => {
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockResolvedValue(mockOrders)

    const { getByTestId } = render(<Home />)

    await waitFor(() => {
      expect(getByTestId('orders-list')).toBeTruthy()
      expect(getByTestId('order-card-1')).toBeTruthy()
    })
  })

  it('deve exibir informações corretas do pedido', async () => {
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockResolvedValue(mockOrders)

    const { getByTestId } = render(<Home />)

    await waitFor(() => {
      const firstOrder = getByTestId('order-card-1')
      expect(firstOrder).toBeTruthy()

      expect(getByTestId('order-id-1')).toHaveTextContent('Pedido #1')
      expect(getByTestId('customer-name-1')).toHaveTextContent('Cliente 1')
      expect(getByTestId('payment-status-1')).toHaveTextContent('Pago')
      expect(getByTestId('order-status-1')).toHaveTextContent('Finalizado')
      expect(getByTestId('order-description-1')).toHaveTextContent('Pedido 1')
    })
  })

  it('deve alternar entre abas Hoje e Outros', async () => {
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockResolvedValue(mockOrders)

    const { getByTestId, queryByTestId } = render(<Home />)

    await waitFor(() => {
      expect(getByTestId('orders-list')).toBeTruthy()
    })

    expect(getByTestId('order-card-1')).toBeTruthy()

    const othersTab = getByTestId('others-tab')
    fireEvent.press(othersTab)

    await waitFor(() => {
      expect(queryByTestId('order-card-1')).toBeFalsy()
      expect(getByTestId('order-card-2')).toBeTruthy()
    })
  })

  it('deve mostrar erro quando falha ao carregar pedidos', async () => {
    const mockError = new Error('Erro ao carregar pedidos')
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockRejectedValue(mockError)

    const showToastSpy = jest.spyOn(require('@utils/functions'), 'showToast')

    render(<Home />)

    await waitFor(() => {
      expect(showToastSpy).toHaveBeenCalledWith({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao carregar pedidos',
      })
    })
  })

  it('deve selecionar um pedido ao clicar', async () => {
    jest.spyOn(require('@services/ordersService'), 'getAllOrders').mockResolvedValue(mockOrders)

    const { getByTestId } = render(<Home />)

    await waitFor(() => {
      expect(getByTestId('orders-list')).toBeTruthy()
    })

    const firstOrderCard = getByTestId('order-card-1')
    fireEvent.press(firstOrderCard)

    expect(firstOrderCard).toBeTruthy()
  })
})
