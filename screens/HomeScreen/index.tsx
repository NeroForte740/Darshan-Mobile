import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native'

import { getAllOrders } from '@services/ordersService'

import CustomButton from '@components/CustomButton'

import colors from '@styles/colors'

export default function HomeScreen() {
  const [posts, setPosts] = useState([])
  const [isLoading, setLoading] = useState(true)

  const mockPosts = [
    {
      id: 1,
      title: 'Primeiro Post',
      body: 'Este é um post de exemplo para testar a listagem de posts no app.',
      userId: 101,
    },
    {
      id: 2,
      title: 'Explorando o React Native',
      body: 'React Native permite criar apps nativos usando JavaScript e React.',
      userId: 102,
    },
    {
      id: 3,
      title: 'Axios na Prática',
      body: 'O Axios é uma biblioteca muito útil para requisições HTTP.',
      userId: 103,
    },
    {
      id: 4,
      title: 'CustomButton em Ação',
      body: 'Este botão personalizado suporta estilos dinâmicos e estado de loading.',
      userId: 104,
    },
    {
      id: 5,
      title: 'Darshan Mobile 🚀',
      body: 'Projeto de exemplo com estrutura organizada e boas práticas.',
      userId: 105,
    },
  ]

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      // const response = await getAllOrders()
      setPosts(mockPosts)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar posts')
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>
            🚀 Darshan Mobile
          </Text>
          <Text style={styles.subtitle}>
            Exemplo com Axios + Estrutura
          </Text>
        </View>

        <CustomButton 
          onPress={fetchPosts}
          text='Recarregar Posts' 
          backgroundColor={colors.PURPLE}
          paddingVertical={8}
          borderRadius={24}
          loading={isLoading}
          marginBottom={10}
        />

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando posts...</Text>
          </View>
        ) : (
          <View style={styles.postsContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <Text style={styles.postTitle}>
                  {post.title}
                </Text>
                <Text style={styles.postBody}>
                  {post.body}
                </Text>
                <View style={styles.postFooter}>
                  <Text style={styles.postMeta}>
                    Post #{post.id} • User ID: {post.userId}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4b5563',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    color: '#6b7280',
    fontSize: 18,
  },
  postsContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  postBody: {
    color: '#4b5563',
    lineHeight: 20,
  },
  postFooter: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  postMeta: {
    fontSize: 14,
    color: '#3b82f6',
  },
})
