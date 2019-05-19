import React from 'react';
import Form from './Form'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: this.props.title,
            text: '',
            buttonText: 'Bắt đầu',
            showButton: false,
            showForm: true,
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
                buttonText: 'Xem kết quả',
            });
            
            this.props.startQuiz();
        } else {            
            this.setState({
                text: 'Kiểu người của bạn là: ' + this.props.type,
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
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Chúc mừng!',
                text: 'Bạn đã hoàn thành bài kiểm tra',
                buttonText: 'Xem kết quả',
                showButton: true,
                showForm: false
            });
            
            this.props.startQuiz();
        } else {            
            this.setState({
                text: 'Kiểu người của bạn là: ' + this.props.type,
                buttonText: 'Thoát',
                showButton: true,
                showForm: false,
                exit: true
            })
        }
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
