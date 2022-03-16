import React, { useState, useEffect } from "react";
import { Card, Table, Button, Modal } from "antd";
import { loadMicroApp } from "qiankun";
const List = () => {
  const columns = [{
    title: '序号',
    width: 80,
    dataIndex: 'key',
    align: 'center',
    render: (v,_, index) => <span>{index + 1}</span>,
  }, {
    title: '名称',
    width: 120,
    dataIndex: 'name',
    align: 'center',
    render: (v) => v || '--',
  }, {
    title: '年龄',
    width: 120,
    dataIndex: 'age',
    align: 'center',
    render: (v) => v || '--',
  }, {
    title: '备注',
    dataIndex: 'address',
    align: 'center',
    render: (v) => v || '--',
  },];


  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [microApp, setMicroApp] = useState(null);
  useEffect(() => {
    fetchVegetable(10);
  }, []);

  const fetchVegetable = (num) => {
    const originData = [];
    for (let i = 0; i < num; i++) {
      originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    setData(originData)
  };

  const handleSubmit = ({ name, age, address }) => {
    setData([...data, {
      key: parseInt(Math.random() * 1000 + 1),
      name: `Edrward ${name}`,
      age: age,
      address: `London Park no. ${address}`,
    }])
    onCancel();
  }

  const handleShowModuel = () => {
    setVisible(true);
    const app = loadMicroApp({
      name: "addModal",
      entry: "//localhost:4011",
      container: "#modal",
      props: {
        handleSubmit,
      },
    });
    setMicroApp(app);
  }

  const onCancel = () => {
    if (microApp) {
      microApp.unmount();
    }
    setVisible(false);
  }

  return (
    <>
      <Card title="React 子应用列表页" extra={<Button type="primary" onClick={handleShowModuel}>新增</Button>}>
        <Table
          rowKey="key"
          dataSource={data}
          columns={columns}
        />
      </Card>
      <Modal
        title="新增"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <div id="modal">

        </div>
      </Modal>
    </>

  );
};

export default List;
