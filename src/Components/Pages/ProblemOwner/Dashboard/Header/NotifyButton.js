import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Tag } from "antd";
import React, { Component } from 'react';
import appConstant from '../../../../../Configs/constants.config';
import moment from 'moment'

export class NotifyButton extends Component {
  onItemClick=(item, tabProps)=> {
    console.log(item, tabProps);
  }

  onClear=(tabTitle)=> {
    console.log(tabTitle);
  }

  getNoticeData=(notices)=> {
    if (!notices) return {}
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { 
          id:notice.id,
          title:notice.notiData.content,
          datetime:moment(notice.timestamp).format('YYYY-MM-DD'),
          type:notice.type
        
      };

      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      switch (newNotice.type){
          case appConstant.RECEIVED_SOLUTION: 
                  newNotice.avatar='https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png';
                  break;
          default:
          newNotice.avatar='https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
      }
    
      return newNotice;
    });
   return newNotices
  }

  render() {
    const noticeData = this.getNoticeData(this.props.notifyList);
    console.log(noticeData)
    return (
      <NoticeIcon
        className="notice-icon"
        onItemClick={this.onItemClick}
       
      >
        <NoticeIcon.Tab
          list={noticeData}
          title="Thông báo"
          showClear={false}
          emptyText="Hiện không có thông báo"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
        
      </NoticeIcon>
    );
  }
}
