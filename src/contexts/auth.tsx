import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loadingAuth: boolean;
  loading: boolean;
  signUp(email: string, password: string, nome: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@finToken');
      if (storageUser) {
        try {
          const response = await api.post('/auth/checkToken', { storageUser});
          api.defaults.headers['Authorization'] = `Bearer ${storageUser}`;
          const { id,name,email } = response.data.user;
          setUser({id,name,email});
        } catch {
          setUser(null);
        }
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function signUp(email: string, password: string, nome: string) {
    setLoadingAuth(true);
    try {
      await api.post('/users', { name: nome, password, email });
      setLoadingAuth(false);
    } catch (err) {
      console.log("Erro ao cadastrar", err);
      setLoadingAuth(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);
    try {
        const response = await api.post('/auth/login', { email, password });
        const { accessToken } = response.data;
   
        
        await AsyncStorage.setItem('@finToken', accessToken);
        api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

        const checkTokenResponse = await api.post('/auth/checkToken', { accessToken });
        const { id,name } = checkTokenResponse.data.user;

        console.log('ID do usuário:', id);
        console.log('Nome do usuário:', name);
        console.log('Email do usuário:', email);
        console.log('Token do usuário:', accessToken);
        await AsyncStorage.setItem('@userID',  String(id));
        await AsyncStorage.setItem('@userName', name);
        await AsyncStorage.setItem('@userEmail', email);

        setUser({ id, name, email });
        setLoadingAuth(false);
    } catch (err) {
      console.log("Erro ao logar", err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      signUp,
      signIn,
      signOut,  // Certifique-se de que signOut é passado aqui
      loadingAuth,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
