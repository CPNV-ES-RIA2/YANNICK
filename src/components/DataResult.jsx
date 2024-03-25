import React from 'react';
import { useLanguage } from '../providers/languages';

export default function DataResult({ dataResult }) {
    const { translations } = useLanguage();
    const labelsContent = dataResult.Labels?.length > 0 ? (
        <table id="labels">
            <thead>
                <tr>
                    <th>{translations.label}</th>
                    <th>{translations.confidence}</th>
                </tr>
            </thead>
            <tbody>
                {dataResult.Labels.map((label, index) => (
                    <tr key={index}>
                        <td>{label.Name}</td>
                        <td>{label.Confidence.toFixed(2)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : <p>{translations.noLabelsFound}</p>;

    return (
        <div className="data-result">
            <h2>{translations.result}</h2>
            <div className="data-result__content">
                {dataResult.numberOfLabel > 0 && <div>{translations.labels}: {dataResult.numberOfLabel}</div>}
                {dataResult.minConfidence > 0 && <div>{translations.confidence}: {dataResult.minConfidence.toFixed(2)}%</div>}
                {dataResult.averageConfidence > 0 && <div>{translations.averageConfidence}: {dataResult.averageConfidence.toFixed(2)}%</div>}
                <p>{translations.labels}:</p>
                {labelsContent}
            </div>
        </div>
    );
}
