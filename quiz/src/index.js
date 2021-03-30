import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./assets/style.css"
import  quizService from './quizService';
import QuestionBox from './components/QuestionBox';

class Quiz extends Component {
    state = {
        questionBank: [],
        score: 0,
        attempted: 0
    };
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    componentDidMount() {
        this.getQuestions();
    };
    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }        
        this.setState({
            attempted : this.state.attempted < 5 ? this.state.attempted + 1 : 5
        });
    };
    render() {
        return (
            <div className="container">
                <div className="title">
                    Quiz
                </div>
                {this.state.questionBank.length > 0 && 
                    this.state.attempted < 5 &&
                    this.state.questionBank.map(
                        ({question, answers, correct, questionId}) => 
                            <QuestionBox
                                question={question}
                                options={answers}
                                key={questionId}
                                selected={answer => {this.computeAnswer(answer, correct)}}
                            />
                        
                    )}
                    {this.state.attempted === 5 ? <h2>{this.state.score}</h2> : null }
            </div>
        );
    }
};

ReactDOM.render(<Quiz />, document.getElementById('root'));