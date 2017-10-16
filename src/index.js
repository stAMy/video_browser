import _ from 'lodash';
import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCCE3XfDiKOmuiX1KHuBzGKgxaTA9C1URg';



// Lag en ny component. Den skal produsere HTML

class App extends Component {

    constructor(props){
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term){
         YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
             });
            // this.setStateU ({ videos: videos}); er samme pga key og variabel er lik
        });

    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);


        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch} />
                <VideoDetail video = {this.state.selectedVideo} />
                <VideoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
                    videos = {this.state.videos} />
            </div>
        );
    }
}

// Ta denne komponentens genererte HTML og putt på siden (i DOM)

ReactDOM.render(<App />, document.querySelector('.container'));