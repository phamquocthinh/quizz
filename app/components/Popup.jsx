import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: this.props.title,
            text: `
            <input class="form-control" type="text" placeholder="Name">
            <input class="form-control" type="text" placeholder="Phone number">
            <input class="form-control" type="text" placeholder="Email">`,
            buttonText: 'Start the quiz',
            exit: false
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
        let { time, exit } = this.state

        if (exit) location.reload()
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Congratulations!',
                text: 'You have completed the quiz',
                buttonText: 'Get Result'
            });
            
            this.props.startQuiz();
        } else {            
            this.setState({
                text: 'Kiểu người của bạn là: ' + this.props.type,
                buttonText: 'Exit',
                exit: true
            })
        }
    }
    
    createMarkup(text) {
        return {__html: text};
    }
    
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="popup col-md-8 col-md-offset-2">
                        <h1>{title}</h1>
                        <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                        <button className="btn btn-primary btn-lg" onClick={this.popupHandle}>{buttonText}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
