import {useEffect, useState} from 'react';
import './App.css';
import * as Go from "../wailsjs/go/main/App";
import * as runtime from "../wailsjs/runtime/runtime.js";

function App() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        Go.GetCounter().then((counter) => {
            setCount(counter.value)
        })
        runtime.EventsOn("counter", (counter) => {
            setCount(counter.value)
        })
        return () => {
            runtime.EventsOff("counter")
        }
    }, [])

    const increment = async () => {
        await Go.Increment()
    }

    return (
        <div id="App">
            <div className={"counter"}>{count}</div>
            <button onClick={async () => {
                await increment()
            }}>Increment
            </button>
        </div>
    )
}

export default App
