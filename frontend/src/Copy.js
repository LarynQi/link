// https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
import React, { useRef, useState} from 'react';

export default function Copy() {
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    };

    return (
        <div>
            {
                document.queryCommandSupported('copy') &&
                <div>
                    <button onClick={copyToClipboard}>Copy</button>
                    {copySuccess}
                </div>
            }
            <form>
                <textarea
                    ref={textAreaRef}
                    value='Some text to copy'
                />
            </form>
        </div>
    );
}