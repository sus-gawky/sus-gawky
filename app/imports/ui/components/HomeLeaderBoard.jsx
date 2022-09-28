import React from 'react';
import { Carousel } from 'react-bootstrap';
import { EmojiAngry, EmojiNeutral, EmojiSmile, Trophy } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const HomeLeaderBoard = () => (
  <Carousel id="home-leader-carousel" className="ms-2" variant="dark" style={{ width: '45.5em' }}>
    <Carousel.Item className="leader-body">
      <div className="leaderboard">
        <h1>
          <Trophy fill="#B2D2A4" />
          <span> Total Score </span>
          <EmojiSmile className="float-end" />
        </h1>
        <ul>
          <li>
            <mark>You</mark>
            <small>100</small>
          </li>
        </ul>
        <ol>
          <li>
            <mark>Jerry Wood</mark>
            <small>315</small>
          </li>
          <li>
            <mark>Brandon Barnes</mark>
            <small>301</small>
          </li>
          <li>
            <mark>Raymond Knight</mark>
            <small>292</small>
          </li>
          <li>
            <mark>Trevor McCormick</mark>
            <small>245</small>
          </li>
          <li>
            <mark>Andrew Fox</mark>
            <small>203</small>
          </li>
        </ol>
      </div>
    </Carousel.Item>
    <Carousel.Item className="leader-body">
      <div className="leaderboard">
        <h1>
          <Trophy fill="#B2D2A4" />
          Food Score
          <EmojiAngry className="float-end" />
        </h1>
        <ul>
          <li>
            <mark>You</mark>
            <small>100</small>
          </li>
        </ul>
        <ol>
          <li>
            <mark>Jerry Wood</mark>
            <small>315</small>
          </li>
          <li>
            <mark>Brandon Barnes</mark>
            <small>301</small>
          </li>
          <li>
            <mark>Raymond Knight</mark>
            <small>292</small>
          </li>
          <li>
            <mark>Trevor McCormick</mark>
            <small>245</small>
          </li>
          <li>
            <mark>Andrew Fox</mark>
            <small>203</small>
          </li>
        </ol>
      </div>
    </Carousel.Item>
    <Carousel.Item className="leader-body">
      <div className="leaderboard">
        <h1>
          <Trophy fill="#B2D2A4" />
          Travel Score
          <EmojiNeutral className="float-end" />
        </h1>
        <ul>
          <li>
            <mark>You</mark>
            <small>100</small>
          </li>
        </ul>
        <ol>
          <li>
            <mark>Jerry Wood</mark>
            <small>315</small>
          </li>
          <li>
            <mark>Brandon Barnes</mark>
            <small>301</small>
          </li>
          <li>
            <mark>Raymond Knight</mark>
            <small>292</small>
          </li>
          <li>
            <mark>Trevor McCormick</mark>
            <small>245</small>
          </li>
          <li>
            <mark>Andrew Fox</mark>
            <small>203</small>
          </li>
        </ol>
      </div>
    </Carousel.Item>
  </Carousel>
);

export default HomeLeaderBoard;
