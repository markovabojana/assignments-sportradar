import React from "react";
import Card from "./Card";
import "./MatchCarousel.css"
import {getAllMatches} from "../services/services";
import LoadingSpinner from "./LoadingSpinner";

export default class MatchCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMatchIndex: 0,
            autoplayIntervalId: null,
            matches: [],
            isLoading: true
        }
    }

    static defaultProps = {
        sportId: null,
        max: 10
    }

    componentDidMount() {
        getAllMatches(this.props.sportId, this.props.max)
            .then((matches) => {
                console.log("We got the matches.")
                console.log(matches)
                this.setState({
                    matches: matches,
                    isLoading: false
                })
            })
        this.startAutoplay()
    }

    componentWillUnmount() {
        this.stopAutoplay();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.currentMatchIndex !== this.state.currentMatchIndex ||
            prevState.matches.length !== this.state.matches.length
        ) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }

    startAutoplay = () => {
        const autoplayIntervalId = setInterval(() => {
            const nextMatchIndex = (this.state.currentMatchIndex + 1) % this.state.matches.length;
            this.setState({ currentMatchIndex: nextMatchIndex });
        }, 3000);

        this.setState({ autoplayIntervalId });
    }

    stopAutoplay = () => {
        clearInterval(this.state.autoplayIntervalId);
    }

    onSlideClick(index) {
        this.setState({currentMatchIndex: index})
        console.log("Clicked " + index + " slide.");
        clearInterval(this.state.autoplayIntervalId);
        this.startAutoplay();
    }

    render() {
        let html
        if (this.state.isLoading) {
            html = <LoadingSpinner />
        } else {
            html = <div className="slideshow-container">
            <div className="slideshow"
                 style={{ transform: `translate3d(${-this.state.currentMatchIndex * 100}%, 0, 0)` }}>
                {this.state.matches.map((match, index) => {
                    return <div key={index} className="slide fade"><Card {...match} /></div>
                })}
            </div>

            <div className="dot-wrapper">
                {this.state.matches.map((match, index) => (
                    <span key={index}
                          className={`dot ${this.state.currentMatchIndex === index ? "dot-active" : ""}`}
                          onClick={() => this.onSlideClick(index)} />
                ))}
            </div>
        </div>}

        return html
    }
}