import React, { Component, Fragment } from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import {
   getAllUsers,
   updateUser,
   deleteUser
} from './client';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import { errorNotification } from './Notification';
import {
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty,
  PageHeader,
  Button,
  notification, 
  Popconfirm
} from 'antd';

const getIndicatorIcon = () => <Icon type="loading" style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    users: [],
    isFetching: false,
    selectedUser: {},
    isAddUserModalVisible: false,
    isEditUserModalVisible: false,
  }

  componentDidMount () {
    this.fetchUsers();
  }

  openAddUserModal = () => this.setState({isAddUserModalVisible: true})

  closeAddUserModal = () => this.setState({isAddUserModalVisible: false})

  openEditUserModal = () => this.setState({ isEditUserModalVisible: true })
  
  closeEditUserModal = () => this.setState({ isEditUserModalVisible: false })

  openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

  fetchUsers = () => {
    this.setState({
      isFetching: true
    });
    getAllUsers()
      .then(res => res.json()
      .then(users => {
        console.log(users);
        this.setState({
          users,
          isFetching: false
        });
      }))
      .catch(error => {
        console.log(error.error);
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false
        });
      });
  }

  editUser = selectedUser => {
    this.setState({ selectedUser });
    this.openEditUserModal();
  }

  updateUserFormSubmitter = user => {
    updateUser(user.id, user).then(() => {
      this.openNotificationWithIcon('success', 'User updated', `User with ID ${user.id} was updated`);
      this.closeEditUserModal();
      this.fetchUsers();
    }).catch(err => {
      console.error(err.error);
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  deleteUser = id => {
    deleteUser(id).then(() => {
      this.openNotificationWithIcon('success', 'User deleted', `User with ID ${id} was deleted`);
      this.fetchUsers();
    }).catch(err => {
      this.openNotificationWithIcon('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  render() {

    const { users: users, isFetching, isAddUserModalVisible: isAddUserModalVisible } = this.state;

    const commonElements = () => (
      <div>
        <Modal
          title='Add new user'
          visible={isAddUserModalVisible}
          onOk={this.closeAddUserModal}
          onCancel={this.closeAddUserModal}
          width={1000}>
          <AddUserForm 
            onSuccess={() => {
              this.closeAddUserModal(); 
              this.fetchUsers();
            }}
            onFailure={(error) => {
              const message = error.error.message;
              const description = error.error.httpStatus;
              errorNotification(message, description);
            }}
          />
        </Modal>

        <Modal
          title='Edit'
          visible={this.state.isEditUserModalVisible}
          onOk={this.closeEditUserModal}
          onCancel={this.closeEditUserModal}
          width={1000}>
          
          <PageHeader title={`${this.state.selectedUser.id}`}/>
          
          <EditUserForm 
            initialValues={this.state.selectedUser} 
            submitter={this.updateUserFormSubmitter}/>
        </Modal>

        <Footer
          numberOfUsers={users.length}
          handleAddUserClickEvent={this.openAddUserModal}
        />  
      </div>
    )

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      );
    }

    if (users && users.length) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, user) => (
            <Avatar size='large'>
              {`${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Fragment>
              <Popconfirm
                placement='topRight'
                title={`Are you sure you want to delete the user with ID ${record.id}?`} 
                onConfirm={() => this.deleteUser(record.id)} okText='Yes' cancelText='No'
                onCancel={e => e.stopPropagation()}>
                <Button type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
              </Popconfirm>
              <Button style={{marginLeft: '5px'}} type='primary' onClick={() => this.editUser(record)}>Edit</Button>
            </Fragment>
          ),
        }
      ];

      return (
        <Container>
          <Table 
            style={{marginBottom: '100px'}}
            dataSource={users} 
            columns={columns} 
            pagination={false}
            rowKey='id'/>
          {commonElements()}
        </Container>
      );

    }

    return (
      <Container>
        <Empty description={
          <h1>No Users found</h1>
        }/>
        {commonElements()}
      </Container>
    )
  }
}

export default App;
