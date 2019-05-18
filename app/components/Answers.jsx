import React from 'react'

class Answers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classNames: ['row', 'row']
        }
        
        this.getAnswer = this.getAnswer.bind(this)
    }
    
    getAnswer(e) {
        let elem = e.currentTarget
        let { increaseScore, questNum } = this.props
        let pos = Number(elem.dataset.id)
        let {classNames} = this.state
        let ans = elem.dataset.value

        classNames = ['row', 'row']
        classNames[pos-1] += ' right'
        increaseScore(questNum, ans)
        
        this.setState({
            classNames
        })

        this.props.showButton()
    }
    
    shouldComponentUpdate() {
        this.setState({
            classNames: ['row', 'row']
        })
        return true
    }
    
    render() {
        let { answers } = this.props
        let { classNames } = this.state
        const items = []

        return (
            <div id="answers">
                <ul>
                    <li onClick={this.getAnswer} className={classNames[0]} data-id="1" data-value={answers[0].ans}> <p>{answers[0].data}</p></li>
                    <li onClick={this.getAnswer} className={classNames[1]} data-id="2" data-value={answers[1].ans}> <p>{answers[1].data}</p></li>
                </ul>
            </div>
        )
    }
}

export default Answers