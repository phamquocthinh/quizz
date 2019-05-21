import React from 'react';
import Form from './Form'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: this.props.title,
            text: 'Chọn 1 trong 2 câu mà bạn nghĩ đó là những điều mà người khác cảm nhận về bạn. Cố gắng trả lời khách quan và chân thật. Kể cả hai ý bạn thấy không phù hợp cũng chọn một ý gần đúng nhất với bạn',
            buttonText: 'Bắt đầu',
            showButton: false,
            showForm: true,
            showResult: false,
            exit: false
        };
        
        this.popupHandle = this.popupHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    popupHandle() {
        let { time, exit } = this.state

        if (exit) location.reload()
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Chúc mừng!',
                text: 'Bạn đã hoàn thành bài kiểm tra',
                showResult: true,
                buttonText: 'Xem kết quả',
            });
            
            this.props.startQuiz();
        } else {            
            this.setState({
                text: `Kiểu người của bạn là:<br> <strong>${this.props.type.toUpperCase()}</strong><br>
                <img src="/images/result.jpg" />`,
                buttonText: 'Thoát',
                exit: true
            })
        }
    }
    
    createMarkup(text) {
        return {__html: text};
    }

    handleSubmit() {
        let { time, exit } = this.state

        if (exit) location.reload()
    
        this.setState({
            time: 'end',
            title: 'Chúc mừng!',
            text: 'Bạn đã hoàn thành bài kiểm tra',
            buttonText: 'Xem kết quả',
            showButton: true,
            showForm: false
        });
        
        this.props.startQuiz();
    }
    
    render() {
       
        let { title, text, buttonText, showButton, showForm} = this.state;
        
        let { style, btnStyle } = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="popup col-md-8 col-md-offset-2">
                        <h1>{title}</h1>
                        <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                        {showForm ? <Form handleSubmit={this.handleSubmit} /> : null}
                        {showButton ? <button style={btnStyle} className="btn btn-info btn-lg" onClick={this.popupHandle}>{buttonText}</button> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
