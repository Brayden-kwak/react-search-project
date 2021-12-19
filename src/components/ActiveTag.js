import React from 'react';
import '../styles/tag.css';

export default function ActiveTag({tagName}) {
    return (
        <div className="tags">
           {tagName}
        </div>
    );
}
