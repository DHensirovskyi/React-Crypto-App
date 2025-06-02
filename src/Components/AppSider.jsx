import { Layout, Card, Statistic, List, Typography, Tag, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../utils';
import { useContext } from 'react';
import CryptoContext from '../context/crypto-context';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
};

export default function AppSider(){
    const {assets, deleteAsset} = useContext(CryptoContext)

    return(
        <Layout.Sider width="25%" style={siderStyle}>
            {(assets.length === 0) ? 
                <Card style={{margin: '1rem', textAlign: 'center', padding: '20px'}}>
                    <Typography.Title level={3} style={{ color: '#888' }}>
                        Add your first asset
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        Your portfolio is empty. Use the form to add cryptocurrency.
                    </Typography.Text>
                </Card> : 
                assets.map(asset => (
                <Card key={asset.uuid} style={{margin: '1rem'}}>
                    <div style={{width: '100%', display: 'flex'}}><Button onClick={() => deleteAsset(asset.uuid)} style={{marginLeft: 'auto'}}><CloseOutlined style={{width: '100%'}}/></Button></div>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                    size='small'
                        dataSource={[
                            {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                            {title: 'Asset Amount', value: asset.amount, isPlain: true },
                        ]}
                        renderItem={item => (
                            <List.Item>
                            <span>{item.title}</span>
                            <span>
                            {item.withTag && (
                                <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>
                            )}
                            {item.isPlain && item.value}
                            {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                            </span>
                            </List.Item>
                        )}
                    />
                </Card>
                
            ))}
            
        </Layout.Sider>
    )
}