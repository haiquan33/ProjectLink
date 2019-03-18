import React, { Component } from 'react'

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate, Checkbox,
    Row, Col,
} from 'antd';


class ModalForm extends React.Component {


    render() {
        const { getFieldDecorator } = this.props.form;
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
        const { info } = this.props
        return (
            <Form {...formItemLayout} >
                <Form.Item {...formItemLayout}
                    label="Tên công ty"
                >
                    <span className="ant-form-text">{info.companyName}</span>
                </Form.Item>
                <Form.Item {...formItemLayout}
                    label="email"
                >
                    <span className="ant-form-text">{info.email}</span>
                </Form.Item>
                <Form.Item {...formItemLayout}
                    label="phone"
                >
                    <span className="ant-form-text">{info.phone}</span>
                </Form.Item>
                <Form.Item {...formItemLayout}
                    label="Website"
                >
                    <span className="ant-form-text">{info.website}</span>
                </Form.Item>
                <Form.Item {...formItemLayout}
                    label="Địa chỉ"
                >
                    <span className="ant-form-text">{info.address}</span>
                </Form.Item>
            </Form>
        );
    }
}

export const UserInfoViewModal = Form.create({ name: 'validate_other' })(ModalForm);

