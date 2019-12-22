import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom'
import './index.scss'
import Main from './Main'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Router><Switch><Route path="/build/:build"><Main /></Route><Route path="/"><Main /></Route></Switch></Router>, document.getElementById('root'))

serviceWorker.unregister()
