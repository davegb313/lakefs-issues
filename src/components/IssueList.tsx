import React, { useEffect, useRef, useState } from 'react';
import { getIssues, Issue } from '../functions';
import IssueItem from './IssueItem';
import './styles/IssueList.css'

const IssueList = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isFirstRender = useRef(true);

    const loadIssues = async (pageNumber: number) => {
        setLoading(true);
        try {
            const data = await getIssues(pageNumber);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setIssues((prevIssues) => [...prevIssues, ...data]);
            }
        } catch (err) {
            setError("Failed to fetch issues");
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        loadIssues(page)
    }, [page]);
    console.log(issues);

    return (
        <div className="issue-container">
            <h2 className="issue-heading">LakeFS GitHub Issues</h2>
            <div className="issue-list">
                {issues.map((issue) => (
                    <IssueItem key={issue.id} issue={issue} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {hasMore && !loading && (
                <button className="load-more" onClick={loadMore}>Load More</button>
            )}
        </div>
    )
}

export default IssueList;