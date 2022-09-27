import React from 'react';
import { Carousel } from 'react-bootstrap';
import trophy from './trophy';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LeaderBoard = () => (
  <Carousel variant="dark" className="center-block">
    <Carousel.Item className="leader-body">
      <div>
        <div className="leaderboard">
          <h1>
            <svg className="ico-cup">
              <use xlinkHref="#cup" />
            </svg>
            Total Score
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
        <svg style={{ display: 'none' }}>
          <symbol
            id="cup"
            x="0px"
            y="0px"
            width="25px"
            height="26px"
            viewBox="0 0 25 26"
            enableBackground="new 0 0 25 26"
            xmlSpace="preserve"
          >
            <path
              fill="#F26856"
              d={trophy}
            />
          </symbol>
        </svg>
      </div>
    </Carousel.Item>
    <Carousel.Item className="leader-body">
      <div>
        <div className="leaderboard">
          <h1>
            <svg className="ico-cup">
              <use xlinkHref="#cup" />
            </svg>
            Food Score
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
        <svg style={{ display: 'none' }}>
          <symbol
            id="cup"
            x="0px"
            y="0px"
            width="25px"
            height="26px"
            viewBox="0 0 25 26"
            enableBackground="new 0 0 25 26"
            xmlSpace="preserve"
          >
            <path
              fill="#F26856"
              d={trophy}
            />
          </symbol>
        </svg>
      </div>
    </Carousel.Item>
    <Carousel.Item className="leader-body">
      <div>
        <div className="leaderboard">
          <h1>
            <svg className="ico-cup">
              <use xlinkHref="#cup" />
            </svg>
            Travel Score
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
        <svg style={{ display: 'none' }}>
          <symbol
            id="cup"
            x="0px"
            y="0px"
            width="25px"
            height="26px"
            viewBox="0 0 25 26"
            enableBackground="new 0 0 25 26"
            xmlSpace="preserve"
          >
            <path
              fill="#F26856"
              d={trophy}
            />
          </symbol>
        </svg>
      </div>
    </Carousel.Item>
  </Carousel>
);

export default LeaderBoard;
