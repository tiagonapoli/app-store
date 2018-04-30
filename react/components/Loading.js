import React, { PureComponent } from 'react'

class Loading extends PureComponent {
  render() {
    return (
      <svg
        width="42px"
        height="42px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 42 42"
        preserveAspectRatio="xMidYMid"
        className="bg-transparent"
      >
        <g strokeWidth="2">
          <rect
            x="1"
            y="1"
            width="16"
            height="16"
            stroke="#cacbcc"
            rx="2"
            fill="transparent"
          >
            <animate
              attributeName="stroke"
              values="#f71963;#cacbcc;#cacbcc"
              keyTimes="0;0.18;0.72"
              dur="0.72s"
              repeatCount="indefinite"
              begin="0s"
              calcMode="discrete"
            />
          </rect>
          <rect
            x="1"
            y="24"
            width="16"
            height="16"
            stroke="#cacbcc"
            rx="2"
            fill="transparent"
          >
            <animate
              attributeName="stroke"
              values="#f71963;#cacbcc;#cacbcc"
              keyTimes="0;0.18;0.72"
              dur="0.72s"
              repeatCount="indefinite"
              begin="0.54"
              calcMode="discrete"
            />
          </rect>
          <rect
            x="24"
            y="1"
            width="16"
            height="16"
            stroke="#cacbcc"
            rx="2"
            fill="transparent"
          >
            <animate
              attributeName="stroke"
              values="#f71963;#cacbcc;#cacbcc"
              keyTimes="0;0.18;0.72"
              dur="0.72s"
              repeatCount="indefinite"
              begin="0.18s"
              calcMode="discrete"
            />
          </rect>
          <rect
            x="24"
            y="24"
            width="16"
            height="16"
            stroke="#cacbcc"
            rx="2"
            fill="transparent"
          >
            <animate
              attributeName="stroke"
              values="#f71963;#cacbcc;#cacbcc"
              keyTimes="0;0.18;0.72"
              dur="0.72s"
              repeatCount="indefinite"
              begin="0.36s"
              calcMode="discrete"
            />
          </rect>
        </g>
      </svg>
    )
  }
}

export default Loading
