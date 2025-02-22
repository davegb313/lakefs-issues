import { useState } from 'react';
import { Issue } from '../functions';
import './styles/IssueItem.css'

interface IssueItemProps {
    issue: Issue;
}

const IssueItem = ({ issue }: IssueItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='issue-item'>
            <button className='expand-button' onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            <strong className='issue-title'> #{issue.number} - {issue.title} </strong>
            {isExpanded && (
                <p className='issue-body'>{issue.body}</p>
            )}
        </div>
    );
};

export default IssueItem;
