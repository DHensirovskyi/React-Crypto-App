import { Table } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../context/crypto-context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
    showSorterTooltip: { target: 'full-header' },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable(){
    const { assets, crypto } = useContext(CryptoContext)
     
    const data = assets.map(a => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount
    }))

    return(
        <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: 'sorter-icon' }}/>
    )
}