import { useState, useEffect } from 'react'
import './styles/App.css'
import FileUpload from './components/FileUpload';
import { useLanguage } from './providers/languages';
import Languages from './components/Languages';
import Error from './components/Error';
import DataResult from './components/DataResult';

const API_URL_BUCKET = 'http://localhost:28468';
const API_URL_ANALYZE = 'http://localhost:28469';

export default function App() {
  const [dataSource, setDataSource] = useState('');
  const [error, setError] = useState({
    message: '',
    success: false

  });
  const [returnData, setReturnData] = useState();
  const [maxLabel, setMaxLabel] = useState(10);
  const [minConfidence, setMinConfidence] = useState(70);
  const { translations } = useLanguage();

  const handleSubmitAnalyze = async (e) => {
    e.preventDefault();
    const file = dataSource[0];

    let returnUrl = '';

    if (!file) {
      setError({ message: 'errorFileUpload', success: false });

      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    try {
      await fetch(`${API_URL_BUCKET}/upload`, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          returnUrl = data.url;
          if (data.status === 500) {
            throw new Error('errorFileUpload');
          }
          setError({ message: 'successFileUpload', success: true });
          return data.url;
        })
        .finally(async () => {
          await fetch(`${API_URL_ANALYZE}/analyze`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: returnUrl,
              maxLabel: Number(maxLabel),
              minConfidence: Number(minConfidence)
            })
          })
            .then(res => res.json())
            .then(data => {
              setReturnData({ ...data.data, url: returnUrl });
              setMaxLabel(10);
              setMinConfidence(70);
              setDataSource('');
            })
            .catch(err => {
              setError({ message: 'errorAnalysis', success: false });
            });
        })
    }
    catch (err) {
      setError({ message: err.message, success: false });
    }

  }

  const handleDownloadSQL = async () => {
    try {
      const response = await fetch(`${API_URL_ANALYZE}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: returnData.url })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'insert.sql');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError({ message: err.message, success: false });
    }
  };

  const handleUploadedFiles = (files) => {
    setDataSource(files);
  };

  return (
    <div>
      <Error message={error.message} success={error.success} />

      <Languages />

      <form onSubmit={handleSubmitAnalyze} encType="multipart/form-data">
        <h1>{translations.title}</h1>
        <p>{translations.description}</p>
        <label htmlFor="dataSource">{translations.dataSource}</label>
        <br />
        <FileUpload handleUploadedFiles={handleUploadedFiles} />
        <label htmlFor="maxLabel">{translations.maxLabel}</label>
        <input type="number" name="maxLabel" id="maxLabel" value={maxLabel} onChange={(e) => setMaxLabel(e.target.value)} min={1} />
        <label htmlFor="minConfidence">{translations.minConfidence}</label>
        <input type="number" name="minConfidence" id="minConfidence" value={minConfidence} onChange={(e) => setMinConfidence(e.target.value)} min={1} max={100} />
        <br />
        <button id="analyzeButton">{translations.analyze}</button>
      </form>

      <div>
        {returnData && (
          <>
            <DataResult dataResult={returnData} />
            <button onClick={() => handleDownloadSQL()} id="downloadSQL">{translations.downloadSQL}</button>
          </>
        )}
      </div>
    </div >
  )
}
