import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
const { TextArea } = Input;
const HighlightedTextareaStyle = styled.div`
    position: relative;
    min-height: 32px;
    .in, .out {
        padding: 4px 11px;
        margin: 0;
        border: 1px solid #ccc;
        width: 900px;
        height: auto;
        line-height: 1.5;
        font-size: 14px;
        color: black;
    }
    .in {
        vertical-align: top;
        background-color: transparent;
        outline: none;
        z-index: 50;
        text-shadow: 0px 0px 0px #fff;
    }
    .out {
        position: absolute;
        min-height: 32px;
        background-color: #fff;
        -webkit-text-fill-color: transparent;
        border: 1px solid transparent;
        z-index: -1;
    }
    .highlights {
        white-space: pre-wrap;
        word-wrap: break-word;
        color: transparent;
    }

    mark {
        border-radius: 3px;
        color: transparent;
        background-color: #b1d5e5;
    }
`;
export default class HighlightedTextarea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'This demo shows how to highlight bits of text within a textarea. Alright, up inside a textarea. However, you can fake it by carefully positioning a div behind the textarea and adding your highlight markup there. JavaScript takes care of syncing the content and scroll position from the textarea to the div, so everything lines up nicely. Hit the toggle button to peek behind the curtain. And feel free to edit this text. All capitalized words will be highlighted.'
        };
    }
    
    inputFunc = (e, val) => {
        const value = e.target.value;
        this.setState({
            value
        });
    }

    getHtmlValue = (value) => {
        const newValue = value.replace(/\n$/g, '\n\n').replace(/[A-Z].*?\b/g, '<mark>$&</mark>');
        return newValue;
    }

    onTextAreaBlur = (e) => {
        const {setCursorPosition, index} = this.props;
        const position = e.target.selectionStart;
        if (setCursorPosition) {
            setCursorPosition(position, index);
        }
    }

    render() {
        const {value} = this.state;
        const htmlValue = this.getHtmlValue(value);
        return (
            <HighlightedTextareaStyle>
                <div className="out" >
                    <div className="highlights" dangerouslySetInnerHTML={{ __html: htmlValue }} />
                </div>
                <TextArea className="in" value={value} maxLength={500}
                  onChange={this.inputFunc} autosize={{ minRows: 1, maxRows: 100 }} 
                    onBlur={this.onTextAreaBlur}
                />
                
            </HighlightedTextareaStyle>

        );
    }
}
