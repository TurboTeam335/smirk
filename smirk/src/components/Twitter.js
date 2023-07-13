import React from "react";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";

class TwitterCard extends React.Component {
  render() {
    return (
      <div className="col-md-8 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"></h5>
            <div id="tweet-container" className="twitter-timeline bg-dark bg-gradient">
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="capitol2iq"
                options={{height: 400, tweetLimit: 1}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TwitterCard;
