import { CTable } from '@coreui/react'
import React from 'react'

function TaskTable() {
    const columns = [
        {
            key: 'id',
            label: 'Task ID',
            _props: { scope: 'col' },
        },
        {
            key: 'status',
            _props: { scope: 'col' },
        },
        {
            key: 'deadline',
            _props: { scope: 'col' },
        },
        
    ]
    const items = [
        {
            id: 1,
            status: 'Otto',
            deadline: '@mdo',
            _cellProps: { id: { scope: 'row' } },
        },
        {
            id: 2,
            status: 'Thornton',
            deadline: '@fat',
            _cellProps: { id: { scope: 'row' } },
        },
        {
            id: 3,
            status: 'the Bird',
            deadline: '@twitter',
            _cellProps: { id: { scope: 'row' }
        },
        },
    ]
    return <CTable columns={columns} items={items} />
}

export default TaskTable