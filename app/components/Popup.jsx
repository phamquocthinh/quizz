import React from 'react';
import Form from './Form'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: this.props.title,
            text: '<p class="guideText">Chọn 1 trong 2 câu mà bạn nghĩ đó là những điều mà người khác cảm nhận về bạn. Cố gắng trả lời khách quan và chân thật. Kể cả hai ý bạn thấy không phù hợp cũng chọn một ý gần đúng nhất với bạn</p>',
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
                text: '<p>Bạn đã hoàn thành bài kiểm tra</p>',
                showResult: true,
                buttonText: 'Xem kết quả',
            });
            
            this.props.startQuiz();
        } else {            
            this.setState({
                title: 'Bạn là kiểu người',
                text: `<div><strong>${this.props.type.toUpperCase()}</strong><div>
                <div class="popupContent">
                    <div class="imgRes"><img src="/images/result.png" /></div>
                    <div class="defineRes"><p>${'Type define go here Type define go here Type define go here Type define go here Type define go here'}</p</div>
                </div>
                `,
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
            text: '<p>Bạn đã hoàn thành bài kiểm tra</p>',
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
                        <div dangerouslySetInnerHTML={this.createMarkup(text)} />
                        <div>
                            {showForm ? <Form handleSubmit={this.handleSubmit} /> : null}
                            {showButton ? <button style={btnStyle} className="btn btn-info btn-lg" onClick={this.popupHandle}>{buttonText}</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
