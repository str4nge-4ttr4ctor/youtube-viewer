import React, { Component } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

export const API_KEY = "AIzaSyCE3N1RHUKlK_xcxHA1Vt8Q-r244qGkGNY";

class App extends Component {
  /**
   * Lifecycle method that initializes the state of the component
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
  }

  /**
   * Lifecycle method that is being called just after the component did mount
   */
  componentDidMount() {
    this.videoSearch("liverpool");
  }

  /**
   * Function that gets the search-term and returns a list of videos
   * @param {*} term
   */
  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  /**
   * Lifecycle method that is responsible to make the component visible to the browser
   */
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
