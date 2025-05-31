import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useContext, useEffect, useState } from 'react';
import CryptoContext from '../context/crypto-context';
import CoinInfoModal from './CoinInfoModal';
import AddAssetForm from './AddAssetForm';


const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: '60',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};


export default function AppHeader(){
    const [select, setSelect] = useState(false)
    const [coin, setCoin] = useState(null)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const { crypto } = useContext(CryptoContext)

    useEffect(() => {
      const keypress = event => {
        if (event.key === '/'){
          setSelect((prev) => !prev)
        }
      }
      document.addEventListener('keypress', keypress)
      return () => document.removeEventListener('keypress', keypress)
    }, [])

    function handleSelect(value){
      setCoin(crypto.find(c => c.id === value))
      setModal(true)
    }

    return(
        <Layout.Header style={headerStyle}>
          <Select
            open={select}
            style={{width: 250}}
            value='press / to open'
            onClick={() => setSelect((prev) => !prev)}
            onSelect={handleSelect}
            options={crypto.map((coin) => ({
              label: coin.name,
              value: coin.id,
              icon: coin.icon,
            }))}
            optionRender={option => (
              <Space>
                <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>{option.data.label}
              </Space>
            )}
          />
          <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

          <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
            <CoinInfoModal coin={coin}/>
          </Modal>

          <Drawer 
          title='Select asset'
          open={drawer} 
          onClose={() => setDrawer(false)} 
          width={600}
          destroyOnHidden
          >
            <AddAssetForm onClose={() => setDrawer(false)}/>
          </Drawer>
        </Layout.Header>
    )
}