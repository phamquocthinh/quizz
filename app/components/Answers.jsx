import React from 'react'

class Answers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classNames: ['row', 'row', 'row', 'row']
        }
        
        this.getAnswer = this.getAnswer.bind(this)
    }
    
    getAnswer(e) {
        let elem = e.currentTarget
        let { increaseScore, questNum } = this.props
        let answer = Number(elem.dataset.id)
        let {classNames} = this.state

        classNames = ['row', 'row', 'row', 'row']
        classNames[answer-1] += ' right'
        increaseScore(questNum, answer)
        
        this.setState({
            classNames
        })

        this.props.showButton()
    }
    
    shouldComponentUpdate() {
        this.setState({
            classNames: ['row', 'row', 'row', 'row']
        })
        return true
    }
    
    render() {
        let { answers } = this.props
        let { classNames } = this.state
        
        return (
            <div id="answers">
                <ul>
                    <li onClick={this.getAnswer} className={classNames[0]} data-id="1"> <p>{answers[0]}</p></li>
                    <li onClick={this.getAnswer} className={classNames[1]} data-id="2"> <p>{answers[1]}</p></li>
                    <li onClick={this.getAnswer} className={classNames[2]} data-id="3"> <p>{answers[2]}</p></li>
                    <li onClick={this.getAnswer} className={classNames[3]} data-id="4"> <p>{answers[3]}</p></li>
                </ul>
            </div>
        )
    }
}

export default Answers