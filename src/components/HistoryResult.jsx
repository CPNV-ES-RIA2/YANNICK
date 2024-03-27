import React, { useEffect, useState } from 'react';
import db from '../database/db';
import {useLanguage} from "../providers/languages";

const HistoryResult = () => {
    const [analyses, setAnalyses] = useState([]);
    const { translations } = useLanguage();

    useEffect(() => {
        const fetchAnalyses = async () => {
            const data = await db.analyses.orderBy('date').reverse().toArray();
            setAnalyses(data);
        };

        fetchAnalyses();
    }, []);

    return (
        <div>
            <h3>{translations.historyAnalyzes}</h3>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>{translations.labelImage}</th>
                    <th>{translations.labels}</th>
                    <th>{translations.nbLabels}</th>
                    <th>{translations.labelConfMin}</th>
                    <th>{translations.labelConfAverage}</th>
                </tr>
                </thead>
                <tbody>
                {analyses.map((analysis, index) => (
                    <tr key={index}>
                        <td>{analysis.id}</td>
                        <td>{analysis.date.toLocaleString()}</td>
                        <td>{analysis.image}</td>
                        <td>{analysis.labels.map(label => label.Name).join(', ')}</td>
                        <td>{analysis.numberOfLabel}</td>
                        <td>{analysis.minConfidence}%</td>
                        <td>{analysis.averageConfidence}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HistoryResult;