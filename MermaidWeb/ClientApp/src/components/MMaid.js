import React, {Component, createRef} from 'react';
import mermaid from 'mermaid';

export class MMAid extends Component {
    static displayName = MMAid.name;

    constructor(props) {
        super(props);
        this.state = { text: '', svg: null };
        this.r = createRef();
    }
    
    componentDidMount() {
        mermaid.initialize({startOnLoad: false});
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const node = this.r.current
        if (node)
        {
            node.removeAttribute('data-processed')
            mermaid.init(undefined, node);
        }        
    }

    fetchDiagram = async () => {
        const response = await fetch('mermaid')
        const text = await response.text()
        this.setState({text})
    }
    
    onLoadClick = async () => {
        await this.fetchDiagram()
    }

    render() {
        const { text } = this.state
        
        return (
            <>
                Here is a mermaid diagram:
                <button onClick={this.onLoadClick}>Load</button>
                <div ref={this.r} id="mermaid" className="mermaid">
                    {text}
                </div>
            </>
        );
    }
}
