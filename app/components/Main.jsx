import React from 'react'
import data from '../data/data'
import Answers from 'Answers'
import Popup from 'Popup'
import Footer from 'Footer'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questNum: 0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            result: {}
        }
        this.nextQuestion = this.nextQuestion.bind(this)
        this.handleShowButton = this.handleShowButton.bind(this)
        this.handleStartQuiz = this.handleStartQuiz.bind(this)
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this)
    }

    pushData(questNum) {
        this.setState({
            question: data[questNum].question,
            answers: data[questNum].answers,
            questNum: this.state.questNum + 1
        })
    }

    componentWillMount() {
        let { questNum } = this.state
        this.pushData(questNum)
    }

    nextQuestion() {
        let { questNum, total, score } = this.state

        if(questNum === total){
            this.setState({
                displayPopup: 'flex'
            })
        } else {
            this.pushData(questNum)
            this.setState({
                showButton: false,
                questionAnswered: false
            })
        }

    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            questNum: 1
        })
    }

    handleIncreaseScore(ques, ans) {
        let {result} = this.state
        result[ques] = ans
        console.log(result)
        this.setState({
            result
        })
    }

    render() {
        let { questNum, total, answers, showButton, questionAnswered, displayPopup, result} = this.state

        return (
            <div className="container">

                <Popup style={{display: displayPopup}} result={result} title={'Bạn là  người thế nào?'} startQuiz={this.handleStartQuiz}/>

                <div className="row">
                    <div className="col">
                        <div id="question" className="col-6 align-self-center">
                            <p>Question {questNum}/{total}</p>
                        </div>
                        <Answers questNum={questNum} answers={answers} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>
                        <div id="submit">
                            {showButton ? <button className="btn btn-success btn-lg" onClick={this.nextQuestion} >{questNum===total ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}

export default Main
