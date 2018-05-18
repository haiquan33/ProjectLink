import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox, Divider, Alert, Tooltip, Select, TimePicker, Row, Col } from 'antd';


//other libs

import moment from 'moment';
import { Image } from 'react-bootstrap';


//import NumericInput from '../../../../Components/Utils/InputNumber/NumericInput';



//css 
import './CreateJobForm.css'


const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;








var shortid = require('shortid');

//prefix to add to Fielđecorator
let prefixtimetable_day = "timetable-day-";
let prefixTimetable_start = "timetable-start-";
let prefixTimetable_end = "timetable-end-";



class CreateJobForm extends Component {

    constructor(props) {
        super(props);
        this.state = { salaryValue: 0, salaryUnit: "VND", showSalaryTooltip: false };
        this.getSalaryUnit = this.getSalaryUnit.bind(this);
        this.onSalaryValChange = this.onSalaryValChange.bind(this);
        this.onSalaryValBlur = this.onSalaryValBlur.bind(this);
        this.handleJobTagsChange = this.handleJobTagsChange.bind(this);
        this.getworkingTime = this.getworkingTime.bind(this);
        this.state = ({ timetableIDlist: [], jobTags: [] })
    }



    // handle job tags input change
    handleJobTagsChange(jobTags) {
        this.setState({ jobTags })
    }

    //add timetable in form
    addTimeTable = () => {
        const { form } = this.props;
        let id = shortid.generate();
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        let nextKeys = keys.concat(prefixTimetable_start + id);
        nextKeys = nextKeys.concat(prefixTimetable_end + id);
        nextKeys = nextKeys.concat(prefixtimetable_day + id);
        this.setState({ timetableIDlist: this.state.timetableIDlist.concat(id) });

        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    //remove timetable item
    removeTimeTable = (id) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }







        //gỡ bỏ ô thời gian 
        form.setFieldsValue({
            keys: keys.filter(key => key !== prefixTimetable_start + id),
        });
        form.setFieldsValue({
            keys: keys.filter(key => key !== prefixTimetable_end + id),
        });

        //gỡ bỏ ô ghi thứ
        form.setFieldsValue({
            keys: keys.filter(key => key !== prefixtimetable_day + id),
        });
        let idList = this.state.timetableIDlist.filter(item => item !== id);

        this.setState({ timetableIDlist: idList });
    }



    // tạo ra workingTime bằng cách xử lí 2 mảng timetablelist và timetable_day_list
    getworkingTime(timetablelist, timetable_day_list) {
        console.log(this.state.timetableIDlist);
        let workingTime = [];
        //get all the day and its working time
        for (var i in this.state.timetableIDlist) {
            //get day
            var id = this.state.timetableIDlist[i];
            var day = timetable_day_list[prefixtimetable_day + id];
            var startTime = moment(timetablelist[prefixTimetable_start + id]).format("HHmm");
            var endTime = moment(timetablelist[prefixTimetable_end + id]).format("HHmm");
            workingTime = workingTime.concat({ day, startTime, endTime });
            console.log(id, timetable_day_list[prefixtimetable_day + id]);
        }

        return workingTime;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let problems = { ...values, uid: this.props.userInfo.uid };
                this.props.add_new_problem(this.props.userInfo.uid, problems);
            }



        });
    }


    getSalaryUnit(e) {
        let unit = e.target.value;
        console.log(unit);
    }


    onSalaryValChange(e) {
        let { value } = e.target;
        value += '';
        const list = value.split(',');
        const prefix = list[0].charAt(0) === '-' ? '-' : '';
        let num = prefix ? list[0].slice(1) : list[0];
        let result = '';
        while (num.length > 3) {
            result = `,${num.slice(-3)}${result}`;
            num = num.slice(0, num.length - 3);
        }
        if (num) {
            result = num + result;
        }

        value = `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;

        this.setState({ salaryValue: value, showSalaryTooltip: true });

    }


    onSalaryValBlur() {
        this.setState({ showSalaryTooltip: false });
    }
    componentDidMount() {

    }


    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;


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

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 16, offset: 8 },
                sm: { span: 16, offset: 8 },
            },
        };





        //time table list
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const timetableItems = this.state.timetableIDlist.map((id, index) => {
            return (
                <FormItem



                    key={id}
                >
                    <Row>
                        <Col xs={{ span: 6, offset: 8 }}
                            sm={{ span: 6, offset: 8 }}>
                            {getFieldDecorator(`timetable_day_list[${prefixtimetable_day + id}]`, {
                                initialValue: '2',
                            })(
                                <Select >
                                    <Option value="2">Thứ 2</Option>
                                    <Option value="3">Thứ 3</Option>
                                    <Option value="4">Thứ 4</Option>
                                    <Option value="5">Thứ 5</Option>
                                    <Option value="6">Thứ 6</Option>
                                    <Option value="7">Thứ 7</Option>
                                    <Option value="8">CN</Option>
                                </Select>
                            )}

                        </Col>
                        <Col xs={{ span: 8, offset: 1 }}
                            sm={{ span: 8, offset: 1 }}>
                            <FormItem

                                hasFeedback

                                key={id}
                            >
                                {getFieldDecorator(`timetablelist[${prefixTimetable_start + id}]`, {

                                    rules: [{

                                        required: true,

                                        message: "Xin thêm thời gian",
                                    }],
                                })(
                                    <TimePicker placeholder="Băt đầu" format='HH:mm' style={{ width: '100%' }} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Col xs={{ span: 20, offset: 15 }}
                        sm={{ span: 20, offset: 15 }}>

                        <FormItem


                            key={id}
                        >
                            {

                                getFieldDecorator(`timetablelist[${prefixTimetable_end + id}]`, {

                                    rules: [{
                                        required: true,

                                        message: "Xin thêm thời gian",
                                    }],
                                })(
                                    <TimePicker placeholder="Kết thúc" format='HH:mm' />
                                )
                            }
                            {
                                keys.length > 1 ? (
                                    <Icon
                                        className="dynamic-delete-button"
                                        type="minus-circle-o"
                                        disabled={keys.length === 1}
                                        onClick={() => this.removeTimeTable(id)}
                                    />
                                ) : null
                            }
                        </FormItem>

                    </Col>

                </FormItem >
            );
        });



        //createjob form body
        let singupForm =
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            Tên vấn đề&nbsp;
<                 Tooltip title="Nhập tên vấn đề ngắn gọn dễ hiểu sẽ giúp người xem nhanh chóng nắm bắt được nội dung hơn">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('problemName', {
                        rules: [{ required: true, message: 'Bạn phải nhập tên vấn đề', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Chủ đề">
                    {getFieldDecorator('subject', {
                        initialValue: 'IT',
                        })(
                              <Select style={{ width: 200 }}>
                                     <Option value="IT">IT</Option>
                                     <Option value="PHYSICS">PHYSICS</Option>
                                     <Option value="MATH">MATH</Option>
                                     <Option value="BIOLOGY">BIOLOGY</Option>
                                     <Option value="ENVIROMENT">ENVIROMENT</Option>
                                     <Option value="OTHERS">OTHERS</Option>
                                </Select>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="Mô tả"
                >
                    {getFieldDecorator('problemDescription', {
                        rules: [{
                            required: true, message: 'Mô tả vấn đề sẽ giúp người xem nhanh chóng nắm rõ vấn đề của bạn ',
                        }],
                    })(
                        <TextArea placeholder="Mô tả ngắn về vấn đề. Nhiều nhất 250 kí tự" autosize={{ minRows: 3, maxRows: 5 }} maxLength="250" />
                    )}
                </FormItem>




                <FormItem
                    {...formItemLayout}
                    label="Yêu cầu"
                >
                    {getFieldDecorator('problemRequirement')(
                        <TextArea placeholder="Bạn cần gì ở ứng cử viên cho vị trí này" autosize={{ minRows: 3, maxRows: 5 }} />
                    )}
                </FormItem>




                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.props.handleCloseCreateProblemModal}>ĐĂNG VẤN ĐỀ</Button>
                </FormItem>
            </Form>;




        return (

            <div className="CreateJobContainer">
                <div>
                    {this.props.signupError ? <Alert message={this.props.signupError} type="error" showIcon /> : null}
                    {this.props.isCompleteSignUpSuccessfully ?
                        <Alert
                            message="Đăng kí thành công"
                            description="Chúc mừng bạn đã đăng kí thành công, xin mời bạn đăng nhập để tiếp tục sử dụng dịch vụ"
                            type="success"
                            showIcon
                        />
                        : singupForm
                    }

                </div>



            </div>
        )
    }
}





const WrappedCreateJobForm = Form.create()(CreateJobForm);

export default WrappedCreateJobForm;
