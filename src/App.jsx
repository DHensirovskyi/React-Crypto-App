import './index.css';
import { CryptoContextProvider } from './context/crypto-context';
import AppLayout from './Components/AppLayout';

export default function App() {
  return (
  <CryptoContextProvider>
    <AppLayout />
  </CryptoContextProvider>
  )
}
