import MatchCarousel from "./MatchCarousel";
import React from "react";
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        }
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(index) {
        this.setState({activeTab: index});
    }

    render() {
        const { activeTab } = this.state;

        return (
            <div>
                <ul className="tab-list">
                    <li className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => this.handleTabClick(0)}>Single MatchCarousel</li>
                    <li className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => this.handleTabClick(1)}>Multiple MatchCarousels</li>
                </ul>
                <div className="tab-content-container">
                    <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
                        <MatchCarousel max={10} />
                    </div>
                    <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                        <h1 className="title">Soccer</h1>
                        <MatchCarousel sportId={1} />
                        <h1 className="title">Basketball</h1>
                        <MatchCarousel sportId={2} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
