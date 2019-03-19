import React, { Component } from 'react'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, notification
} from 'antd';

import './ClientInfoPage.css'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class ClientInfoPage extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        for (let k in values) if (values[k] === undefined) delete values[k];
        let data;
        if (this.props.userCompanyInfo)
        data = Object.assign(this.props.userCompanyInfo, values)
        else data=values
        this.props.saveUserCompanyInfo(data, this.props.userInfo.uid)


        const openSubmittedNotification = () => {
          notification.open({
            message: 'Thay đổi thông tin',
            description: 'Thông tin của bạn đã được lưu',
            onClick: () => {
              console.log('Notification Clicked!');
            },
          });
        };
        openSubmittedNotification()
      }
    });
  }








  render() {
    const { getFieldDecorator } = this.props.form;
    const { userCompanyInfo } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };



    return (
      <div className="ClientInfoPageContainer">
        <div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item   {...formItemLayout}
              label={(
                <span>
                  Tên công ty&nbsp;
            <Tooltip title="Tên của công ty bạn là gì ?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('companyName', {
                rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
              })(
                <Input placeholder={userCompanyInfo && userCompanyInfo.companyName ? userCompanyInfo.companyName : ""} />
              )}
            </Form.Item>
            <Form.Item   {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: false,
                }],
              })(
                <Input placeholder={userCompanyInfo && userCompanyInfo.email ? userCompanyInfo.email : ""} />
              )}
            </Form.Item>


            <Form.Item   {...formItemLayout}
              label="Số điện thoại"
            >
              {getFieldDecorator('phone', {
                rules: [{ required: false, message: 'Please input your phone number!' }],
              })(
                <Input placeholder={userCompanyInfo && userCompanyInfo.phone ? userCompanyInfo.phone : ""} />
              )}
            </Form.Item>
            <Form.Item   {...formItemLayout}
              label="Website"
            >
              {getFieldDecorator('website', {
                rules: [{ required: false, message: 'Please input website!' }],
              })(

                <Input placeholder={userCompanyInfo && userCompanyInfo.website ? userCompanyInfo.website : ""} />

              )}
            </Form.Item>

            <Form.Item   {...formItemLayout}
              label="Địa chỉ"
            >
              {getFieldDecorator('address', {
                rules: [{ required: false, message: 'Please input website!' }],
              })(

                <Input placeholder={userCompanyInfo && userCompanyInfo.address ? userCompanyInfo.address : ""} />

              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Lưu</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export const WrappedClientInfoPageForm = Form.create({ name: 'register' })(ClientInfoPage);

